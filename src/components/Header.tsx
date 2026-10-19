import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Moon, Sun, Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react'
import { registerModal, restoreFocus } from '../utils/modalManager'
import './Header.css'

interface HeaderProps {
  theme: 'night' | 'day'
  onToggleTheme: () => void
  soundEnabled: boolean
  onToggleSound: () => void
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Coordinate mobile drawer with modalManager for Escape handling, scroll lock, and focus restoration
  useEffect(() => {
    if (!isMenuOpen) return

    const trigger = menuButtonRef.current
    const unregister = registerModal({
      id: 'mobile-menu',
      dismiss: () => setIsMenuOpen(false),
      getContainer: () => menuRef.current,
      triggerElement: trigger,
    })

    firstLinkRef.current?.focus()

    return () => {
      unregister()
      restoreFocus(trigger, null, '.mobile-menu-btn')
    }
  }, [isMenuOpen])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header" id="main-header">
      <div className="page-container header-container">
        {/* Brand Logo & Wordmark */}
        <a href="#hero" className="header-branding" aria-label="PIP.EXE Home" onClick={handleLinkClick}>
          <div className="header-logo-badge" title="PIP.EXE Dream Engine">
            <Sparkles size={14} color="#F5A9C5" />
            <span className="pip-title">PIP.EXE</span>
          </div>

          <div className="header-titles">
            <span className="header-lab-name">THE MIDNIGHT DREAM LAB</span>
            <span className="header-subtag">MIDNIGHT NURSERY</span>
          </div>
        </a>

        {/* Desktop Section Anchors */}
        <nav className="header-nav" aria-label="Primary Navigation">
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#dreams" className="nav-link">DREAMS</a>
          <a href="#story" className="nav-link">STORY</a>
        </nav>

        {/* Controls: Audio Toggle, Theme Toggle & Mobile Hamburger */}
        <div className="header-actions">
          {/* Working Sound Toggle */}
          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'sound-active' : ''}`}
            onClick={onToggleSound}
            aria-label={
              soundEnabled
                ? 'Sound enabled. Click to mute audio effects.'
                : 'Sound muted. Click to enable gentle bedtime audio.'
            }
            title={soundEnabled ? 'Mute bedtime audio' : 'Enable gentle bedtime audio'}
          >
            {soundEnabled ? (
              <>
                <Volume2 size={13} color="#F7E7A6" />
                <span className="sound-mode-label">SOUND: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={13} color="#F5A9C5" />
                <span className="sound-mode-label">MUTED</span>
              </>
            )}
          </button>

          {/* Working Day/Night Theme Toggle */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Current theme is ${theme}. Click to switch to ${theme === 'night' ? 'Daydream' : 'Midnight'} mode.`}
            title={`Switch to ${theme === 'night' ? 'Daydream' : 'Midnight'} mode`}
          >
            {theme === 'night' ? (
              <>
                <Moon size={13} color="#F7E7A6" />
                <span className="theme-mode-label">NIGHT</span>
              </>
            ) : (
              <>
                <Sun size={13} color="#A34068" />
                <span className="theme-mode-label">DAY</span>
              </>
            )}
          </button>

          {/* Mobile Hamburger Toggle Button (visible on <= 680px) */}
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            id="mobile-nav-drawer"
            ref={menuRef}
            className="mobile-drawer-card"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-tag">✦ NURSERY DIRECTORY</span>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mobile-drawer-nav" aria-label="Mobile Navigation Links">
              <a
                ref={firstLinkRef}
                href="#about"
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                <span>ABOUT PIP</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>

              <a
                href="#dreams"
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                <span>DREAM WORKBENCH</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>

              <a
                href="#story"
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                <span>CELESTIAL STORY</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <span className="mobile-drawer-subtext">
                PIP.EXE · 432 HZ DREAM LAB · ONLINE
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
