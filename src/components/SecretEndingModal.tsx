import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  Sparkles,
  X,
  Star,
  Disc,
  Compass,
  Moon,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { type SoundEffectType } from '../utils/sound'
import { registerModal, restoreFocus, getTopModal } from '../utils/modalManager'
import './SecretEndingModal.css'

export interface SecretEndingModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenJournal: () => void
  onPlaySound?: (type: SoundEffectType) => void
}

const PARTICLES = [
  { id: 1, top: '12%', left: '10%', dx: '-25px', dy: '-30px', color: '#F7E7A6', size: 14, delay: '0s' },
  { id: 2, top: '18%', left: '88%', dx: '30px', dy: '-25px', color: '#F5A9C5', size: 16, delay: '0.3s' },
  { id: 3, top: '75%', left: '8%', dx: '-20px', dy: '25px', color: '#FFF5E8', size: 12, delay: '0.5s' },
  { id: 4, top: '82%', left: '90%', dx: '25px', dy: '20px', color: '#F7E7A6', size: 16, delay: '0.2s' },
  { id: 5, top: '8%', left: '50%', dx: '0px', dy: '-35px', color: '#F5A9C5', size: 15, delay: '0.4s' },
  { id: 6, top: '92%', left: '48%', dx: '15px', dy: '30px', color: '#FFF5E8', size: 13, delay: '0.6s' },
]

export const SecretEndingModal: React.FC<SecretEndingModalProps> = ({
  isOpen,
  onClose,
  onOpenJournal,
  onPlaySound,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const isTransitioningToJournalRef = useRef(false)
  const [imageFailed, setImageFailed] = useState(false)

  const handleCloseClick = useCallback(() => {
    onPlaySound?.('close')
    onClose()
  }, [onPlaySound, onClose])

  const handleJournalClick = () => {
    isTransitioningToJournalRef.current = true
    onPlaySound?.('open')
    onClose()
    onOpenJournal()
  }

  // Manage Escape key, scroll locking, and focus restoration via modalManager
  useEffect(() => {
    if (!isOpen) return

    if (!triggerRef.current && typeof document !== 'undefined') {
      triggerRef.current = document.activeElement as HTMLElement | null
    }

    const unregister = registerModal({
      id: 'secret-ending',
      dismiss: handleCloseClick,
      getContainer: () => cardRef.current,
      triggerElement: triggerRef.current,
    })

    closeBtnRef.current?.focus()

    return () => {
      unregister()
      const trigger = triggerRef.current
      triggerRef.current = null
      const isSwitching = isTransitioningToJournalRef.current
      isTransitioningToJournalRef.current = false

      if (!isSwitching) {
        // If an underlying modal (e.g. project detail) is still open, restore focus into it!
        restoreFocus(trigger, getTopModal(), '.dream-journal-fab')
      }
    }
  }, [isOpen, handleCloseClick])

  if (!isOpen) return null

  return (
    <div
      className="secret-ending-backdrop"
      onClick={handleCloseClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="secret-ending-title"
    >
      <div
        ref={cardRef}
        className="secret-ending-card"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Floating Twinkling Background Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="secret-stardust-particle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              ['--dx' as string]: p.dx,
              ['--dy' as string]: p.dy,
            }}
            aria-hidden="true"
          >
            <Sparkles size={p.size} color={p.color} />
          </div>
        ))}

        {/* Top Header Row */}
        <div className="secret-top-bar">
          <span className="secret-ending-tag">
            <Moon size={13} />
            PIP.EXE // FINAL TRANSMISSION · 432 HZ SYNC
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            className="secret-close-btn"
            onClick={handleCloseClick}
            aria-label="Close secret dream ending (or press Escape)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pip's Spotlight Visual Moment */}
        <div className="secret-pip-stage">
          <div className="secret-pip-halo" aria-hidden="true" />
          <div className="secret-pip-orbit" aria-hidden="true">
            <span className="orbit-star orbit-star-1">★</span>
            <span className="orbit-star orbit-star-2">✧</span>
            <span className="orbit-star orbit-star-3">✦</span>
          </div>

          {!imageFailed ? (
            <img
              src="/assets/pip_avatar_cloud.png"
              alt="Pip the Junior Dream Engineer smiling happily from a dreamy stardust cloud"
              className="secret-pip-avatar"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="secret-pip-fallback">
              <Moon size={48} color="#F7E7A6" />
            </div>
          )}

          <div className="secret-telemetry-row">
            <span className="secret-telemetry-badge">
              <Star size={11} fill="currentColor" /> FREQUENCY: 432 Hz LOCKED
            </span>
            <span className="secret-telemetry-badge">
              <Sparkles size={11} /> STARDUST ARCHIVE: 100%
            </span>
          </div>
        </div>

        {/* Ending Narrative */}
        <div className="secret-narrative-section">
          <h2 id="secret-ending-title" className="secret-title">
            The Secret of the Midnight Nursery
          </h2>
          <span className="secret-subtitle">
            FINAL SYSTEM LOG // CONSTELLATION HARMONIZED · LEVEL 04
          </span>

          <div className="secret-story-content">
            <p>
              When the lamps in the waking world flicker out, the quietest thoughts begin to wander.
              Some get tucked away behind bedroom bookshelves; others drift into the cool reaches of the midnight sky.
            </p>
            <p>
              You listened closely and searched with a gentle heart. You retrieved the <strong>Fallen Star</strong> humming at 432 Hz,
              rescued the <strong>Stardust Jar</strong> of afternoon daydreams, spun the <strong>Brass Cassette Reel</strong> of acoustic lullabies,
              and charted the celestial <strong>Moonbeam Waypoint</strong>.
            </p>
            <p>
              Because of you, the Midnight Dream Lab is humming in complete harmony. Every sleeping child and restless wanderer
              will wake up knowing that somewhere in the gentle dark, someone is keeping watch over their sweetest dreams.
            </p>
            <blockquote className="secret-quote">
              “Thank you, Dreamweaver. Whenever the waking world feels too loud or rushed, remember: you can always wind the music box,
              look up at the moon, and dream a little bigger.”
            </blockquote>
            <div className="secret-author-stamp">
              — PIP, JUNIOR DREAM ENGINEER
              <br />
              <small>Promoted to Master Constellation Architect · Midnight Nursery</small>
            </div>
          </div>
        </div>

        {/* Commemorative Dream Card */}
        <div className="secret-commemorative-card" role="region" aria-label="Completed Hunt Dream Card">
          <div className="commemorative-card-shine" aria-hidden="true" />
          <div className="commemorative-top">
            <span className="commemorative-serial">COMMEMORATIVE DREAM CARD · #004</span>
            <span className="commemorative-status-pill">
              <Award size={12} />
              ARCHIVE COMPLETED
            </span>
          </div>

          <h3 className="commemorative-title">The Midnight Constellation</h3>

          <div className="commemorative-grid">
            <div className="commemorative-item">
              <div className="commemorative-icon">
                <Star size={14} fill="currentColor" />
              </div>
              <div className="commemorative-item-meta">
                <span className="commemorative-item-name">The Fallen Star</span>
                <span className="commemorative-item-desc">432 Hz Status Beacon</span>
              </div>
            </div>

            <div className="commemorative-item">
              <div className="commemorative-icon">
                <Sparkles size={14} />
              </div>
              <div className="commemorative-item-meta">
                <span className="commemorative-item-name">The Stardust Jar</span>
                <span className="commemorative-item-desc">1,024 Daydream Vault</span>
              </div>
            </div>

            <div className="commemorative-item">
              <div className="commemorative-icon">
                <Disc size={14} />
              </div>
              <div className="commemorative-item-meta">
                <span className="commemorative-item-name">The Brass Cassette</span>
                <span className="commemorative-item-desc">Acoustic Lullaby Tape</span>
              </div>
            </div>

            <div className="commemorative-item">
              <div className="commemorative-icon">
                <Compass size={14} />
              </div>
              <div className="commemorative-item-meta">
                <span className="commemorative-item-name">Moonbeam Waypoint</span>
                <span className="commemorative-item-desc">Celestial Route Node</span>
              </div>
            </div>
          </div>

          <div className="commemorative-seal-row">
            <span className="commemorative-seal-text">
              ★ OFFICIAL SEAL OF THE MIDNIGHT DREAM LAB ★
            </span>
          </div>
        </div>

        {/* Modal Controls / Footer */}
        <div className="secret-footer-actions">
          <button
            type="button"
            className="secret-btn-journal"
            onClick={handleJournalClick}
          >
            <BookOpen size={13} />
            <span>OPEN DREAM JOURNAL</span>
          </button>

          <button
            type="button"
            className="secret-btn-close"
            onClick={handleCloseClick}
          >
            <span>RETURN TO NURSERY (ESC)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
