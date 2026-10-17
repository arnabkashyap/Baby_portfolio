import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Moon, Radio } from 'lucide-react'
import './PipCharacter.css'

interface PipCharacterProps {
  className?: string
}

export const PipCharacter: React.FC<PipCharacterProps> = ({ className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // Only enable pointer tracking on fine pointer devices and when reduced motion is not requested
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) return

    const handlePointerMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance relative to screen window to keep motion restrained & gentle
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2)
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2)

      // Clamp to max ±6 degrees tilt
      const tiltY = Math.max(-1, Math.min(1, deltaX)) * 6
      const tiltX = Math.max(-1, Math.min(1, -deltaY)) * 5

      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`pip-character-wrapper ${className}`}
      role="img"
      aria-label="Pip, Junior Dream Engineer at Midnight Nursery"
    >
      {/* Dream Glow Aura */}
      <div className="pip-dream-aura" aria-hidden="true" />

      {/* Main Avatar & Floating Tilt Orbit */}
      <div
        className="pip-ambient-orbit"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Floating Telemetry Badges */}
        <div className="pip-float-badge pip-badge-top-left" aria-hidden="true">
          <Moon size={11} color="#F7E7A6" />
          <span>LULLABY: 98%</span>
        </div>

        <div className="pip-float-badge pip-badge-bottom-right" aria-hidden="true">
          <Sparkles size={11} color="#FFF5E8" />
          <span>STARDUST: OK</span>
        </div>

        {/* Character Visual: Official Asset with SVG/CSS Fallback */}
        <div className="pip-avatar-frame">
          {!imageFailed ? (
            <img
              src="/assets/pip_avatar_cloud.png"
              alt="Pip the Junior Dream Engineer — A sweet skull-faced baby with a starry nightcap and pink bow sitting on a sleepy cloud"
              className="pip-official-img"
              loading="eager"
              onError={() => setImageFailed(true)}
            />
          ) : (
            /* Fallback Sweet SVG Illustration */
            <svg
              className="pip-svg-illustration"
              viewBox="0 0 280 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="pipSkullGrad" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFF5E8" />
                  <stop offset="100%" stopColor="#EAD8CA" />
                </radialGradient>
                <linearGradient id="pipNightcapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#252747" />
                  <stop offset="50%" stopColor="#1B1A38" />
                  <stop offset="100%" stopColor="#A34068" />
                </linearGradient>
                <linearGradient id="pipBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5A9C5" />
                  <stop offset="100%" stopColor="#A34068" />
                </linearGradient>
                <filter id="cloudSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Dream Cloud Base */}
              <g filter="url(#cloudSoftBlur)">
                <ellipse cx="140" cy="245" rx="85" ry="32" fill="#252747" fillOpacity="0.8" />
                <ellipse cx="95" cy="235" rx="42" ry="26" fill="#FFF5E8" fillOpacity="0.85" />
                <ellipse cx="185" cy="235" rx="42" ry="26" fill="#FFF5E8" fillOpacity="0.85" />
                <ellipse cx="140" cy="230" rx="55" ry="30" fill="#FFF5E8" />
              </g>

              {/* Baby Body in Stardust Onesie */}
              <path
                d="M100 200 C95 240, 185 240, 180 200 C170 185, 110 185, 100 200 Z"
                fill="#252747"
                stroke="#F5A9C5"
                strokeWidth="2"
              />

              {/* Smooth Round Skull Head */}
              <ellipse cx="140" cy="140" rx="58" ry="52" fill="url(#pipSkullGrad)" />
              <path
                d="M110 165 C110 185, 170 185, 170 165 Z"
                fill="url(#pipSkullGrad)"
              />

              {/* Rosy Stardust Cheeks */}
              <ellipse cx="106" cy="155" rx="12" ry="7" fill="#F5A9C5" fillOpacity="0.55" />
              <ellipse cx="174" cy="155" rx="12" ry="7" fill="#F5A9C5" fillOpacity="0.55" />

              {/* Gentle Large Eyes */}
              <ellipse cx="118" cy="138" rx="14" ry="16" fill="#17152B" />
              <ellipse cx="162" cy="138" rx="14" ry="16" fill="#17152B" />
              <circle cx="114" cy="133" r="5" fill="#FFF5E8" />
              <circle cx="123" cy="142" r="2.5" fill="#F7E7A6" />
              <circle cx="158" cy="133" r="5" fill="#FFF5E8" />
              <circle cx="167" cy="142" r="2.5" fill="#F7E7A6" />

              {/* Cute Tiny Heart/Inverted Skull Nose */}
              <path d="M140 148 L137 154 Q140 156 143 154 Z" fill="#A34068" />

              {/* Tiny Crooked Baby Smile */}
              <path
                d="M130 163 Q140 171 150 164"
                stroke="#17152B"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Starry Nightcap */}
              <path
                d="M84 125 C82 70, 160 55, 195 90 C225 118, 230 160, 240 175"
                fill="url(#pipNightcapGrad)"
                stroke="#252747"
                strokeWidth="2"
              />
              <polygon points="135,75 137,80 142,81 138,84 139,89 135,86 131,89 132,84 128,81 133,80" fill="#F7E7A6" />
              <polygon points="175,95 176,99 180,100 177,102 178,106 175,103 172,106 173,102 170,100 174,99" fill="#FFF5E8" />
              <circle cx="240" cy="177" r="10" fill="#F7E7A6" stroke="#FFF5E8" strokeWidth="2" />

              {/* Pink Bow */}
              <g transform="translate(140, 96)">
                <path d="M-5 -2 C-22 -15, -24 15, -5 2 Z" fill="url(#pipBowGrad)" />
                <path d="M5 -2 C22 -15, 24 15, 5 2 Z" fill="url(#pipBowGrad)" />
                <circle cx="0" cy="0" r="6" fill="#F5A9C5" stroke="#A34068" strokeWidth="1.5" />
                <path d="M-3 4 Q-8 16 -12 22" stroke="#F5A9C5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M3 4 Q8 16 12 22" stroke="#F5A9C5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          )}
        </div>
      </div>

      {/* Small Retro Status Card: DREAM ENGINE: ONLINE */}
      <div className="dream-engine-status-card">
        <span className="engine-pulse-light" aria-hidden="true" />
        <span className="engine-label">DREAM ENGINE: ONLINE</span>
        <span className="engine-subtext">
          <Radio size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
          432 Hz Bedtime Stream
        </span>
      </div>
    </div>
  )
}
