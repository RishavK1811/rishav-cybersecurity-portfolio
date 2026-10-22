import { Canvas } from '@react-three/fiber'
import { Component, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { EarthGlobe } from './EarthGlobe'

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / 3D Canvas error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function EarthFallback() {
  return (
    <div className="earth-fallback" role="img" aria-label="Fallback globe illustration">
      <div className="earth-fallback-sphere">
        <div className="earth-fallback-glow" />
        <div className="earth-fallback-surface" />
      </div>
      <div className="earth-fallback-label">
        <span>Static Globe View · WebGL Unavailable</span>
      </div>
    </div>
  )
}

function EarthLoader() {
  return (
    <div className="earth-loader" aria-hidden="true">
      <div className="earth-loader-spinner" />
    </div>
  )
}

export function EarthCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  const [supportsWebGL, setSupportsWebGL] = useState(true)
  const [maxDpr, setMaxDpr] = useState(1.75)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        setSupportsWebGL(false)
      }
    } catch {
      setSupportsWebGL(false)
    }

    const updateDpr = () => {
      setMaxDpr(window.innerWidth < 768 ? 1.35 : 1.85)
    }
    updateDpr()
    window.addEventListener('resize', updateDpr, { passive: true })
    return () => window.removeEventListener('resize', updateDpr)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!supportsWebGL) {
    return <EarthFallback />
  }

  return (
    <div ref={containerRef} className="earth-canvas-container">
      <WebGLErrorBoundary fallback={<EarthFallback />}>
        <Suspense fallback={<EarthLoader />}>
          <Canvas
            camera={{ position: [0, 0, 4.45], fov: 40 }}
            dpr={[1, maxDpr]}
            frameloop={isVisible ? (reducedMotion ? 'demand' : 'always') : 'never'}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <ambientLight intensity={0.64} color="#2b2d3a" />
            <directionalLight position={[3.6, 1.8, 4.2]} intensity={2.45} color="#ffffff" />
            <pointLight position={[-4.2, -1.8, -2.5]} intensity={0.22} color="#b5a0f2" />

            <EarthGlobe reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  )
}
