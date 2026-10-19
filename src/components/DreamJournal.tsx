import React, { useEffect, useRef, useCallback } from 'react'
import { BookOpen, X, Lock, Check, Star, Sparkles, Disc, Compass, Moon } from 'lucide-react'
import { DREAM_COLLECTIBLES, type DreamCollectible, type DreamCollectibleId } from '../types/dreamHunt'
import { type SoundEffectType } from '../utils/sound'
import { registerModal, restoreFocus, getTopModal } from '../utils/modalManager'
import './DreamJournal.css'

interface DreamJournalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  foundCount: number
  totalCount: number
  hasCompleted: boolean
  isItemFound: (id: DreamCollectibleId) => boolean
  onPlaySound?: (type: SoundEffectType) => void
  onOpenEnding?: () => void
}

function getItemIcon(id: DreamCollectibleId) {
  switch (id) {
    case 'fallen-star':
      return <Star size={18} fill="currentColor" color="currentColor" />
    case 'stardust-jar':
      return <Sparkles size={18} color="currentColor" />
    case 'brass-cassette':
      return <Disc size={18} color="currentColor" />
    case 'moonbeam-waypoint':
      return <Compass size={18} color="currentColor" />
  }
}

export const DreamJournal: React.FC<DreamJournalProps> = ({
  isOpen,
  onOpen,
  onClose,
  foundCount,
  totalCount,
  hasCompleted,
  isItemFound,
  onPlaySound,
  onOpenEnding,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const isTransitioningToEndingRef = useRef(false)

  const handleCloseClick = useCallback(() => {
    onPlaySound?.('close')
    onClose()
  }, [onPlaySound, onClose])

  // Manage Escape key, scroll locking, and focus restoration via modalManager
  useEffect(() => {
    if (!isOpen) return

    if (!triggerRef.current && typeof document !== 'undefined') {
      triggerRef.current = document.activeElement as HTMLElement | null
    }

    const unregister = registerModal({
      id: 'dream-journal',
      dismiss: handleCloseClick,
      getContainer: () => dialogRef.current,
      triggerElement: triggerRef.current,
    })

    closeBtnRef.current?.focus()

    return () => {
      unregister()
      const trigger = triggerRef.current
      triggerRef.current = null
      const isSwitching = isTransitioningToEndingRef.current
      isTransitioningToEndingRef.current = false

      if (!isSwitching) {
        restoreFocus(trigger, getTopModal(), '.dream-journal-fab')
      }
    }
  }, [isOpen, handleCloseClick])

  const handleOpenClick = () => {
    triggerRef.current = document.activeElement as HTMLElement | null
    onPlaySound?.('open')
    onOpen()
  }

  const progressPercent = Math.round((foundCount / totalCount) * 100)

  return (
    <>
      {/* 1. Floating Journal Action Button */}
      <button
        type="button"
        className={`dream-journal-fab ${hasCompleted ? 'is-complete' : ''}`}
        onClick={handleOpenClick}
        aria-label={
          hasCompleted
            ? `Dream Journal: All ${totalCount} memories recovered. Secret dream ending unlocked! Click or press Enter to open field log.`
            : `Dream Journal: ${foundCount} of ${totalCount} memories recovered. Click or press Enter to open field log.`
        }
        title={
          hasCompleted
            ? 'Dream Journal (4/4 Complete · Secret Ending Ready)'
            : `Dream Journal (${foundCount}/${totalCount})`
        }
      >
        <BookOpen size={15} className="journal-fab-icon" />
        <span>{hasCompleted ? '✦ JOURNAL (4/4) · UNLOCKED' : `✦ JOURNAL (${foundCount}/${totalCount})`}</span>
      </button>

      {/* 2. Journal Modal Dialog */}
      {isOpen && (
        <div
          className="dream-journal-backdrop"
          onClick={handleCloseClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dream-journal-title"
        >
          <div
            ref={dialogRef}
            className="dream-journal-dialog"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Top Bar */}
            <div className="journal-top-bar">
              <span className="journal-tag">
                <BookOpen size={13} />
                PIP'S FIELD LOG · DREAM HUNT JOURNAL
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="journal-close-btn"
                onClick={handleCloseClick}
                aria-label="Close Dream Journal (or press Escape)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Header & Subtitle */}
            <div className="journal-header">
              <h2 id="dream-journal-title" className="journal-title">
                Pip’s Dream Journal
              </h2>
              <p className="journal-subtext">
                Field notes and bedtime memories discovered across the Midnight Nursery.
              </p>
            </div>

            {/* Progress Bar & Status Summary */}
            <div className="journal-progress-box">
              <div className="journal-progress-labels">
                <span>{`STARDUST SYNTHESIS: ${foundCount} / ${totalCount} DISCOVERED`}</span>
                <span>{`${progressPercent}%`}</span>
              </div>
              <div
                className="journal-progress-track"
                role="progressbar"
                aria-valuenow={foundCount}
                aria-valuemin={0}
                aria-valuemax={totalCount}
                aria-label="Dream hunt collection progress"
              >
                <div
                  className="journal-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Secret Ending Ready Callout Banner */}
            {hasCompleted && (
              <div
                className="journal-secret-ending-card"
                role="region"
                aria-label="Secret Ending Transmission Unlocked"
              >
                <div className="journal-secret-glow" aria-hidden="true" />
                <div className="journal-secret-content">
                  <div className="journal-secret-badge">
                    <Sparkles size={12} />
                    <span>CONSTELLATION HARMONIZED · 4/4</span>
                  </div>
                  <h3 className="journal-secret-title">
                    Secret Ending Ready for Playback!
                  </h3>
                  <p className="journal-secret-text">
                    All four dream memories have returned to Pip’s cradle. The final Midnight Transmission is unlocked and waiting.
                  </p>
                  <button
                    type="button"
                    className="journal-launch-ending-btn"
                    onClick={() => {
                      isTransitioningToEndingRef.current = true
                      onPlaySound?.('star')
                      onClose()
                      onOpenEnding?.()
                    }}
                  >
                    <Moon size={14} />
                    <span>PLAY SECRET DREAM ENDING ✦</span>
                  </button>
                </div>
              </div>
            )}

            {/* Collectibles List (Four Items) */}
            <div className="journal-items-list">
              {DREAM_COLLECTIBLES.map((item: DreamCollectible) => {
                const isFound = isItemFound(item.id)
                return (
                  <article
                    key={item.id}
                    className={`journal-item-card ${isFound ? 'is-unlocked' : 'is-locked'}`}
                    aria-label={`${item.name}: ${isFound ? 'Discovered' : 'Locked'}`}
                  >
                    <div className="journal-item-icon-box" aria-hidden="true">
                      {isFound ? getItemIcon(item.id) : <Lock size={16} />}
                    </div>

                    <div className="journal-item-content">
                      <div className="journal-item-top">
                        <h3 className="journal-item-name">
                          {isFound ? item.name : '??? Locked Dream Memory'}
                        </h3>
                        <span
                          className={`journal-item-badge ${
                            isFound ? 'badge-collected' : 'badge-locked'
                          }`}
                        >
                          {isFound ? (
                            <>
                              <Check size={11} />
                              <span>COLLECTED</span>
                            </>
                          ) : (
                            <>
                              <Lock size={10} />
                              <span>UNDISCOVERED</span>
                            </>
                          )}
                        </span>
                      </div>

                      {isFound ? (
                        <>
                          <span className="journal-item-location">
                            {`FOUND IN: ${item.location}`}
                          </span>
                          <p className="journal-item-desc">{item.description}</p>
                        </>
                      ) : (
                        <div className="journal-item-clue-box">
                          <span className="journal-clue-label">✦ FIELD CLUE:</span>
                          <p className="journal-clue-text">{item.hint}</p>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Dialog Footer */}
            <div className="journal-footer-row">
              <span className="journal-footer-lore">
                Pip keeps watch until every scattered dream finds its way home.
              </span>
              <button
                type="button"
                className="journal-bottom-close-btn"
                onClick={handleCloseClick}
              >
                CLOSE JOURNAL (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
