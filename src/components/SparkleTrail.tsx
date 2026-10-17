import React, { useEffect, useState, useRef } from 'react'
import './SparkleTrail.css'

interface SparkleParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

const PALETTE_SPARKLES = ['#F5A9C5', '#FFF5E8', '#F7E7A6', '#A34068']
const MAX_PARTICLES = 16
const MIN_DISTANCE_PX = 18

export const SparkleTrail: React.FC = () => {
  const [particles, setParticles] = useState<SparkleParticle[]>([])
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const idCounter = useRef(0)
  const isEnabledRef = useRef(false)

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not touch) and reduced motion is not requested
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) {
      isEnabledRef.current = false
      return
    }

    isEnabledRef.current = true

    const handlePointerMove = (e: PointerEvent) => {
      if (!isEnabledRef.current) return

      const { clientX: x, clientY: y } = e

      if (lastPos.current) {
        const dx = x - lastPos.current.x
        const dy = y - lastPos.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < MIN_DISTANCE_PX) return
      }

      lastPos.current = { x, y }

      const id = ++idCounter.current
      const size = Math.floor(Math.random() * 8) + 8 // 8px to 16px
      const color = PALETTE_SPARKLES[Math.floor(Math.random() * PALETTE_SPARKLES.length)]

      setParticles((prev) => {
        const next = [...prev, { id, x, y, size, color }]
        if (next.length > MAX_PARTICLES) {
          return next.slice(next.length - MAX_PARTICLES)
        }
        return next
      })

      // Clean up particle after animation finishes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 700)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="sparkle-trail-container" aria-hidden="true">
      {particles.map((p) => (
        <svg
          key={p.id}
          className="sparkle-trail-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 4-point Diamond Stardust Star */}
          <path
            d="M12 0 C12 6, 6 12, 0 12 C6 12, 12 18, 12 24 C12 18, 18 12, 24 12 C18 12, 12 6, 12 0 Z"
            fill={p.color}
          />
        </svg>
      ))}
    </div>
  )
}
