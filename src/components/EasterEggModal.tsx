import React, { useEffect, useRef } from 'react'
import { Sparkles, X, Heart, Moon } from 'lucide-react'
import { registerModal, restoreFocus, getTopModal } from '../utils/modalManager'
import './EasterEggModal.css'

interface EasterEggModalProps {
  isOpen: boolean
  onClose: () => void
}

const PARTICLES = [
  { id: 1, top: '20%', left: '15%', dx: '-30px', dy: '-40px', color: '#F7E7A6', size: 14, delay: '0s' },
  { id: 2, top: '25%', left: '80%', dx: '40px', dy: '-30px', color: '#F5A9C5', size: 16, delay: '0.2s' },
  { id: 3, top: '70%', left: '10%', dx: '-25px', dy: '35px', color: '#FFF5E8', size: 12, delay: '0.4s' },
  { id: 4, top: '75%', left: '85%', dx: '35px', dy: '30px', color: '#F7E7A6', size: 18, delay: '0.1s' },
  { id: 5, top: '15%', left: '50%', dx: '0px', dy: '-45px', color: '#F5A9C5', size: 15, delay: '0.3s' },
  { id: 6, top: '85%', left: '45%', dx: '15px', dy: '40px', color: '#FFF5E8', size: 13, delay: '0.5s' },
]

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    if (!triggerRef.current && typeof document !== 'undefined') {
      triggerRef.current = document.activeElement as HTMLElement | null
    }

    const unregister = registerModal({
      id: 'easter-egg',
      dismiss: onClose,
      getContainer: () => cardRef.current,
      triggerElement: triggerRef.current,
    })

    closeBtnRef.current?.focus()

    return () => {
      unregister()
      const trigger = triggerRef.current
      triggerRef.current = null
      restoreFocus(trigger, getTopModal(), '.hero-easter-egg-trigger')
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="easter-egg-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-heading"
    >
      <div
        ref={cardRef}
        className="easter-egg-card"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Decorative Floating Sparkle Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="stardust-particle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              ['--dx' as string]: p.dx,
              ['--dy' as string]: p.dy,
            }}
          >
            <Sparkles size={p.size} color={p.color} />
          </div>
        ))}

        <div className="easter-egg-top-bar">
          <span className="easter-egg-tag">
            <Moon size={13} color="#F7E7A6" />
            SECRET FREQUENCY UNLOCKED
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="easter-egg-close-btn"
            aria-label="Close secret message (or press Escape)"
          >
            <X size={18} />
          </button>
        </div>

        <h3 id="easter-egg-heading" className="easter-egg-title">
          You found Pip’s hidden stardust stash!
        </h3>

        <p className="easter-egg-body">
          <em>“Psst... hello! You discovered the sleeping moonbeam!”</em>
          <br /><br />
          Pip tucked away an extra pocket dream just for you. It’s filled with soft lavender skies,
          friendly stars that never wander away, and a lullaby that turns worries into warm stardust.
          Whenever the world gets too noisy, remember: <strong>dreams don’t build themselves</strong>,
          but we build them with all our heart.
        </p>

        <div className="easter-egg-signature">
          <span className="easter-egg-pip-sig">
            — PIP · JUNIOR DREAM ENGINEER
          </span>
          <button
            onClick={onClose}
            className="btn-primary-dream"
            style={{ padding: '0.45rem 1rem', fontSize: '0.65rem' }}
          >
            <Heart size={12} fill="#FFF5E8" />
            DREAM SWEETLY (ESC)
          </button>
        </div>
      </div>
    </div>
  )
}
