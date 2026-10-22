import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface EarthGlobeProps {
  reducedMotion?: boolean
}

const HUBS = [
  { name: 'Silicon Valley', lat: 37.77, lon: -122.42 },
  { name: 'Washington DC', lat: 38.90, lon: -77.03 },
  { name: 'London', lat: 51.50, lon: -0.12 },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Sydney', lat: -33.86, lon: 151.20 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },
]

interface RouteDef {
  from: number
  to: number
  isAttack: boolean
  duration: number
  pause: number
  phase: number
}

const ROUTES: RouteDef[] = [
  { from: 4, to: 0, isAttack: true,  duration: 3.0, pause: 1.2, phase: 0.0 },
  { from: 2, to: 3, isAttack: false, duration: 2.2, pause: 0.8, phase: 0.9 },
  { from: 3, to: 1, isAttack: false, duration: 3.4, pause: 1.4, phase: 1.8 },
  { from: 5, to: 2, isAttack: true,  duration: 3.6, pause: 1.5, phase: 2.6 },
  { from: 7, to: 1, isAttack: false, duration: 2.9, pause: 1.1, phase: 1.3 },
  { from: 0, to: 6, isAttack: false, duration: 3.8, pause: 1.6, phase: 3.2 },
  { from: 4, to: 5, isAttack: false, duration: 2.4, pause: 0.9, phase: 2.1 },
]

const TRAIL_OFFSETS = [0, 0.022, 0.044, 0.066] as const

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = lat * (Math.PI / 180)
  const theta = lon * (Math.PI / 180)
  const x = radius * Math.cos(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi)
  const z = -radius * Math.cos(phi) * Math.sin(theta)
  return new THREE.Vector3(x, y, z)
}

function createSphericalBezier(v1: THREE.Vector3, v2: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
  const distance = v1.distanceTo(v2)
  const mid = v1.clone().add(v2).multiplyScalar(0.5)
  const arcElevation = radius + Math.min(distance * 0.16, 0.28)
  const normalizedMid = mid.clone().normalize().multiplyScalar(arcElevation)

  const p1 = v1.clone().lerp(normalizedMid, 0.48).normalize().multiplyScalar(radius + (arcElevation - radius) * 0.74)
  const p2 = v2.clone().lerp(normalizedMid, 0.52).normalize().multiplyScalar(radius + (arcElevation - radius) * 0.74)

  return new THREE.CubicBezierCurve3(v1, p1, p2, v2)
}

export function EarthGlobe({ reducedMotion = false }: EarthGlobeProps) {
  const EARTH_RADIUS = 1.18
  const CLOUD_RADIUS = 1.189
  const ATMOSPHERE_RADIUS = 1.208

  const [dayTexture, cloudsTexture, specularTexture] = useLoader(THREE.TextureLoader, [
    `${import.meta.env.BASE_URL}textures/earth/earth_day_2048.jpg`,
    `${import.meta.env.BASE_URL}textures/earth/earth_clouds_1024.png`,
    `${import.meta.env.BASE_URL}textures/earth/earth_specular_2048.jpg`,
  ])

  useEffect(() => {
    dayTexture.colorSpace = THREE.SRGBColorSpace
    dayTexture.generateMipmaps = true
    dayTexture.minFilter = THREE.LinearMipmapLinearFilter
    dayTexture.needsUpdate = true
  }, [dayTexture])

  const globeGroupRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const elapsedRef = useRef(0)

  const pulseBeadRefs = useRef<(THREE.Mesh | null)[][]>(ROUTES.map(() => [null, null, null, null]))

  const hubPositions = useMemo(() => {
    return HUBS.map((hub) => latLonToVector3(hub.lat, hub.lon, EARTH_RADIUS + 0.003))
  }, [EARTH_RADIUS])

  const trajectories = useMemo(() => {
    return ROUTES.map((route) => {
      const v1 = hubPositions[route.from]
      const v2 = hubPositions[route.to]
      const curve = createSphericalBezier(v1, v2, EARTH_RADIUS)
      const points = curve.getPoints(56)
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: route.isAttack ? '#ff5c7a' : '#b5a0f2',
        transparent: true,
        opacity: route.isAttack ? 0.42 : 0.3,
      })
      const lineObject = new THREE.Line(lineGeometry, lineMaterial)

      return {
        curve,
        lineGeometry,
        lineMaterial,
        lineObject,
        ...route,
      }
    })
  }, [hubPositions, EARTH_RADIUS])

  // Clean up Three.js geometries and materials on unmount
  useEffect(() => {
    return () => {
      trajectories.forEach((traj) => {
        traj.lineGeometry.dispose()
        traj.lineMaterial.dispose()
      })
    }
  }, [trajectories])

  // Position static mid-flight beads when reducedMotion is active
  useEffect(() => {
    if (!reducedMotion) return
    trajectories.forEach((traj, rIdx) => {
      const beads = pulseBeadRefs.current[rIdx]
      if (!beads) return
      const staticProgress = 0.55
      beads.forEach((bead, bIdx) => {
        if (bead) {
          const bProg = Math.max(0, Math.min(1, staticProgress - TRAIL_OFFSETS[bIdx]))
          bead.position.copy(traj.curve.getPointAt(bProg))
          bead.visible = true
        }
      })
    })
  }, [reducedMotion, trajectories])

  useFrame((_, delta) => {
    if (reducedMotion || !globeGroupRef.current) return

    const safeDelta = Math.min(delta, 0.1)
    elapsedRef.current += safeDelta

    globeGroupRef.current.rotation.y += safeDelta * 0.08

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += safeDelta * 0.014
    }

    const now = elapsedRef.current

    trajectories.forEach((traj, rIdx) => {
      const cycle = traj.duration + traj.pause
      const localTime = (now + traj.phase) % cycle
      const beads = pulseBeadRefs.current[rIdx]
      if (!beads) return

      if (localTime <= traj.duration) {
        const progress = localTime / traj.duration
        beads.forEach((bead, bIdx) => {
          if (bead) {
            const bProg = Math.max(0, Math.min(1, progress - TRAIL_OFFSETS[bIdx]))
            bead.position.copy(traj.curve.getPointAt(bProg))
            bead.visible = true
          }
        })
      } else {
        beads.forEach((bead) => {
          if (bead) bead.visible = false
        })
      }
    })
  })

  return (
    <group rotation={[0.20, -0.45, 0.08]}>
      <group ref={globeGroupRef}>
        {/* 1. Base Earth Surface */}
        <mesh>
          <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
          <meshPhongMaterial
            map={dayTexture}
            specularMap={specularTexture}
            specular={new THREE.Color(0x334866)}
            shininess={18}
          />
        </mesh>

        {/* 2. Natural Atmospheric Cloud Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[CLOUD_RADIUS, 64, 64]} />
          <meshStandardMaterial
            alphaMap={cloudsTexture}
            transparent
            opacity={0.34}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>

        {/* 3. Soft Atmospheric Lavender Rim */}
        <mesh>
          <sphereGeometry args={[ATMOSPHERE_RADIUS, 48, 48]} />
          <meshBasicMaterial
            color="#b5a0f2"
            transparent
            opacity={0.07}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 4. Synchronized Cyber Trajectories & Comet Pulses */}
        {trajectories.map((traj, rIdx) => {
          const headColor = traj.isAttack ? '#ff8599' : '#ffffff'
          const tailColor = traj.isAttack ? '#ff3b5c' : '#c3b0ff'

          return (
            <group key={rIdx}>
              <primitive object={traj.lineObject} />

              <mesh
                ref={(el) => {
                  if (!pulseBeadRefs.current[rIdx]) pulseBeadRefs.current[rIdx] = []
                  pulseBeadRefs.current[rIdx][0] = el
                }}
              >
                <sphereGeometry args={[traj.isAttack ? 0.020 : 0.017, 12, 12]} />
                <meshBasicMaterial color={headColor} />
              </mesh>

              <mesh
                ref={(el) => {
                  if (!pulseBeadRefs.current[rIdx]) pulseBeadRefs.current[rIdx] = []
                  pulseBeadRefs.current[rIdx][1] = el
                }}
              >
                <sphereGeometry args={[traj.isAttack ? 0.015 : 0.013, 10, 10]} />
                <meshBasicMaterial
                  color={tailColor}
                  transparent
                  opacity={0.75}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              <mesh
                ref={(el) => {
                  if (!pulseBeadRefs.current[rIdx]) pulseBeadRefs.current[rIdx] = []
                  pulseBeadRefs.current[rIdx][2] = el
                }}
              >
                <sphereGeometry args={[traj.isAttack ? 0.011 : 0.009, 8, 8]} />
                <meshBasicMaterial
                  color={tailColor}
                  transparent
                  opacity={0.45}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              <mesh
                ref={(el) => {
                  if (!pulseBeadRefs.current[rIdx]) pulseBeadRefs.current[rIdx] = []
                  pulseBeadRefs.current[rIdx][3] = el
                }}
              >
                <sphereGeometry args={[traj.isAttack ? 0.007 : 0.006, 8, 8]} />
                <meshBasicMaterial
                  color={tailColor}
                  transparent
                  opacity={0.20}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          )
        })}

        {/* 5. Illuminated Strategic Hub Nodes */}
        {hubPositions.map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh>
              <sphereGeometry args={[0.016, 12, 12]} />
              <meshBasicMaterial color="#d4c7f8" />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.032, 12, 12]} />
              <meshBasicMaterial
                color="#b5a0f2"
                transparent
                opacity={0.24}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
