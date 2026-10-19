import React, { useEffect } from 'react'
import { Sparkles, X, Moon } from 'lucide-react'
import { type SoundEffectType } from '../utils/sound'
import './UnlockToast.css'

export interface UnlockToastProps {
  isVisible: boolean
  onOpenEnding: () => void
  onDismiss: () => void
  onPlaySound?: (type: SoundEffectType) => void
}

export const UnlockToast: React.FC<UnlockToastProps> = ({
  isVisible,
  onOpenEnding,
  onDismiss,
  onPlaySound,
}) => {
  useEffect(() => {
    if (!isVisible) return

    // Auto-dismiss toast after 14 seconds if user doesn't interact
    const timer = setTimeout(() => {
      onDismiss()
    }, 14000)

    return () => clearTimeout(timer)
  }, [isVisible, onDismiss])

  if (!isVisible) return null

  const handleOpenEnding = () => {
    onPlaySound?.('open')
    onOpenEnding()
  }

  const handleDismiss = () => {
    onPlaySound?.('close')
    onDismiss()
  }

  return (
    <aside
      className="unlock-toast-wrapper"
      role="status"
      aria-live="polite"
      aria-label="Secret Dream Ending Unlocked Notification"
    >
      <div className="unlock-toast-card">
        <div className="unlock-toast-glow" aria-hidden="true" />

        <div className="unlock-toast-icon-box" aria-hidden="true">
          <Sparkles size={18} className="unlock-toast-sparkle" />
        </div>

        <div className="unlock-toast-content">
          <div className="unlock-toast-header">
            <span className="unlock-toast-tag">✦ CONSTELLATION HARMONIZED · 4/4</span>
            <button
              type="button"
              className="unlock-toast-close"
              onClick={handleDismiss}
              aria-label="Dismiss secret ending unlock notification"
            >
              <X size={14} />
            </button>
          </div>
          <p className="unlock-toast-message">
            All four dream memories recovered! Pip’s secret lab ending is now ready.
          </p>
          <div className="unlock-toast-actions">
            <button
              type="button"
              className="unlock-toast-cta"
              onClick={handleOpenEnding}
            >
              <Moon size={13} />
              <span>VIEW SECRET ENDING ✦</span>
            </button>
            <button
              type="button"
              className="unlock-toast-dismiss-btn"
              onClick={handleDismiss}
            >
              LATER
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
