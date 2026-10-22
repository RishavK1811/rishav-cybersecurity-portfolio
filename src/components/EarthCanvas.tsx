import { Canvas } from '@react-three/fiber'
import { Component, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { EarthGlobe } from './EarthGlobe'

// Error boundary to catch WebGL context creation or rendering errors
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

// Graceful static fallback displayed if WebGL is unsupported or textures fail to load
function EarthFallback() {
  return (
    <div className="earth-fallback" aria-label="Earth visualization placeholder">
      <div className="earth-fallback-sphere">
        <div className="earth-fallback-glow" />
        <div className="earth-fallback-surface" />
      </div>
      <div className="earth-fallback-label">
        <span>Hardware 3D Accelerated Preview</span>
      </div>
    </div>
  )
}

// Minimal loading placeholder while textures stream
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
  const [reducedMotion, setReducedMotion] = useState(false)
  const [supportsWebGL, setSupportsWebGL] = useState(true)

  // 1. Detect WebGL support
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
  }, [])

  // 2. Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // 3. Pause rendering loop when visual container is outside the viewport to conserve mobile battery
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(containerRef.current)
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
            camera={{ position: [0, 0, 4.5], fov: 40 }}
            dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.5 : 2]}
            frameloop={isVisible ? 'always' : 'never'}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            {/* Natural Sunlight & Ambient Lighting: balanced to show vibrant oceans and recognizable continents */}
            <ambientLight intensity={0.62} color="#2b2d3a" />
            <directionalLight position={[3.6, 1.8, 4.2]} intensity={2.45} color="#ffffff" />
            <pointLight position={[-4.2, -1.8, -2.5]} intensity={0.22} color="#b5a0f2" />

            <EarthGlobe reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  )
}
