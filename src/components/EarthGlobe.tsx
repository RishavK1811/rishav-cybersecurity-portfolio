import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface EarthGlobeProps {
  reducedMotion?: boolean
}

// Geographical hubs for global cybersecurity telemetry & attack vectors
const HUBS = [
  { name: 'Silicon Valley', lat: 37.77, lon: -122.42 }, // 0
  { name: 'Washington DC', lat: 38.90, lon: -77.03 },  // 1
  { name: 'London', lat: 51.50, lon: -0.12 },          // 2
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },        // 3
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },          // 4
  { name: 'Singapore', lat: 1.35, lon: 103.82 },        // 5
  { name: 'Sydney', lat: -33.86, lon: 151.20 },        // 6
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },      // 7
]

// 7 strategic trajectories: mix of lavender defensive telemetry & muted crimson cyberattack vectors
interface RouteDef {
  from: number
  to: number
  isAttack: boolean
  duration: number  // seconds for single transit
  pause: number     // seconds of cooldown between pulses
  phase: number     // initial start offset in seconds
}

const ROUTES: RouteDef[] = [
  { from: 4, to: 0, isAttack: true,  duration: 3.0, pause: 1.2, phase: 0.0 }, // Tokyo -> Silicon Valley (Trans-Pacific Attack)
  { from: 2, to: 3, isAttack: false, duration: 2.2, pause: 0.8, phase: 0.9 }, // London -> Frankfurt (European Defense)
  { from: 3, to: 1, isAttack: false, duration: 3.4, pause: 1.4, phase: 1.8 }, // Frankfurt -> Washington DC (Trans-Atlantic Backbone)
  { from: 5, to: 2, isAttack: true,  duration: 3.6, pause: 1.5, phase: 2.6 }, // Singapore -> London (Eurasian Attack Vector)
  { from: 7, to: 1, isAttack: false, duration: 2.9, pause: 1.1, phase: 1.3 }, // São Paulo -> Washington DC (Pan-American Route)
  { from: 0, to: 6, isAttack: false, duration: 3.8, pause: 1.6, phase: 3.2 }, // Silicon Valley -> Sydney (Trans-Oceanic Route)
  { from: 4, to: 5, isAttack: false, duration: 2.4, pause: 0.9, phase: 2.1 }, // Tokyo -> Singapore (Asia-Pacific Route)
]

// Converts geographic (lat, lon) to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = lat * (Math.PI / 180)
  const theta = lon * (Math.PI / 180)
  const x = radius * Math.cos(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi)
  const z = -radius * Math.cos(phi) * Math.sin(theta)
  return new THREE.Vector3(x, y, z)
}

// Elevated 3D cubic Bezier curve following spherical curvature
function createSphericalBezier(v1: THREE.Vector3, v2: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
  const distance = v1.distanceTo(v2)
  const mid = v1.clone().add(v2).multiplyScalar(0.5)

  // Natural arc elevation proportional to distance
  const arcElevation = radius + Math.min(distance * 0.16, 0.28)
  const normalizedMid = mid.clone().normalize().multiplyScalar(arcElevation)

  // Control points elevate between surface normal and apex
  const p1 = v1.clone().lerp(normalizedMid, 0.48).normalize().multiplyScalar(radius + (arcElevation - radius) * 0.74)
  const p2 = v2.clone().lerp(normalizedMid, 0.52).normalize().multiplyScalar(radius + (arcElevation - radius) * 0.74)

  return new THREE.CubicBezierCurve3(v1, p1, p2, v2)
}

export function EarthGlobe({ reducedMotion = false }: EarthGlobeProps) {
  // Enhanced Earth radius (+24% scale increase over original 1.05)
  const EARTH_RADIUS = 1.18
  const CLOUD_RADIUS = 1.189
  const ATMOSPHERE_RADIUS = 1.208

  // Local NASA Blue Marble & cloud coverage maps
  const [dayTexture, cloudsTexture, specularTexture] = useLoader(THREE.TextureLoader, [
    '/textures/earth/earth_day_2048.jpg',
    '/textures/earth/earth_clouds_1024.png',
    '/textures/earth/earth_specular_2048.jpg',
  ])

  // Configure high-fidelity texture filtering
  useEffect(() => {
    dayTexture.colorSpace = THREE.SRGBColorSpace
    dayTexture.generateMipmaps = true
    dayTexture.minFilter = THREE.LinearMipmapLinearFilter
  }, [dayTexture])

  const globeGroupRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  // Refs for animated pulse lead beads and comet trail segments (4 beads per route)
  const pulseBeadRefs = useRef<(THREE.Mesh | null)[][]>(ROUTES.map(() => [null, null, null, null]))

  // 3D Cartesian coordinates for each global hub
  const hubPositions = useMemo(() => {
    return HUBS.map((hub) => latLonToVector3(hub.lat, hub.lon, EARTH_RADIUS + 0.003))
  }, [EARTH_RADIUS])

  // Precompute 3D Bezier trajectories and curve point geometries
  const trajectories = useMemo(() => {
    return ROUTES.map((route) => {
      const v1 = hubPositions[route.from]
      const v2 = hubPositions[route.to]
      const curve = createSphericalBezier(v1, v2, EARTH_RADIUS)
      const points = curve.getPoints(54)
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

      return {
        curve,
        lineGeometry,
        ...route,
      }
    })
  }, [hubPositions, EARTH_RADIUS])

  // Continuous rotation & sequential attack pulse animation via delta time
  useFrame((_, delta) => {
    if (!reducedMotion && globeGroupRef.current) {
      // Steady rotation around Earth's vertical axis
      globeGroupRef.current.rotation.y += delta * 0.08

      // Subtle differential atmospheric cloud drift
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += delta * 0.014
      }

      const now = performance.now() * 0.001

      // Animate attack pulses and comet trails
      trajectories.forEach((traj, rIdx) => {
        const cycle = traj.duration + traj.pause
        const localTime = (now + traj.phase) % cycle

        const beads = pulseBeadRefs.current[rIdx]
        if (!beads) return

        if (localTime <= traj.duration) {
          // Pulse is currently traveling along route
          const progress = localTime / traj.duration

          // Head bead and 3 trailing comet tail beads
          const trailOffsets = [0, 0.022, 0.044, 0.066]

          beads.forEach((bead, bIdx) => {
            if (bead) {
              const bProg = Math.max(0, Math.min(1, progress - trailOffsets[bIdx]))
              const pos = traj.curve.getPointAt(bProg)
              bead.position.copy(pos)
              bead.visible = true
            }
          })
        } else {
          // Route is in cooldown between waves
          beads.forEach((bead) => {
            if (bead) bead.visible = false
          })
        }
      })
    }
  })

  return (
    // Gentle natural axial tilt (~15 degrees)
    <group rotation={[0.20, 0, 0.10]}>
      {/* Globe group contains Earth, clouds, cyber routes, nodes, and pulses synchronized */}
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

        {/* 4. Cyberattack Trajectories, Moving Pulses & Comet Trails */}
        {trajectories.map((traj, rIdx) => {
          const lineColor = traj.isAttack ? '#ff5c7a' : '#b5a0f2'
          const headColor = traj.isAttack ? '#ff8599' : '#ffffff'
          const tailColor = traj.isAttack ? '#ff3b5c' : '#c3b0ff'

          return (
            <group key={rIdx}>
              {/* Luminous trajectory wire */}
              <primitive
                object={
                  new THREE.Line(
                    traj.lineGeometry,
                    new THREE.LineBasicMaterial({
                      color: lineColor,
                      transparent: true,
                      opacity: traj.isAttack ? 0.38 : 0.28,
                      linewidth: 1,
                    })
                  )
                }
              />

              {/* Lead pulse bead */}
              <mesh
                ref={(el) => {
                  if (!pulseBeadRefs.current[rIdx]) pulseBeadRefs.current[rIdx] = []
                  pulseBeadRefs.current[rIdx][0] = el
                }}
              >
                <sphereGeometry args={[traj.isAttack ? 0.020 : 0.017, 12, 12]} />
                <meshBasicMaterial color={headColor} />
              </mesh>

              {/* Comet trail bead 1 */}
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

              {/* Comet trail bead 2 */}
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

              {/* Comet trail bead 3 */}
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
            {/* Core illuminated node */}
            <mesh>
              <sphereGeometry args={[0.016, 12, 12]} />
              <meshBasicMaterial color="#d4c7f8" />
            </mesh>
            {/* Soft outer halo */}
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
