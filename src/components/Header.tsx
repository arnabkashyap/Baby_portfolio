import React from 'react'
import { Sparkles, Moon, Sun, Volume2, VolumeX } from 'lucide-react'
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
  return (
    <header className="site-header" id="main-header">
      <div className="page-container header-container">
        {/* Brand Logo & Wordmark */}
        <a href="#hero" className="header-branding" aria-label="PIP.EXE Home">
          <div className="header-logo-badge" title="PIP.EXE Dream Engine">
            <Sparkles size={14} color="#F5A9C5" />
            <span className="pip-title">PIP.EXE</span>
          </div>

          <div className="header-titles">
            <span className="header-lab-name">THE MIDNIGHT DREAM LAB</span>
            <span className="header-subtag">MIDNIGHT NURSERY</span>
          </div>
        </a>

        {/* Section Anchors */}
        <nav className="header-nav" aria-label="Primary Navigation">
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#dreams" className="nav-link">DREAMS</a>
          <a href="#story" className="nav-link">STORY</a>
        </nav>

        {/* Controls: Audio Toggle & Theme Toggle */}
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
                <Volume2 size={12} color="#F7E7A6" />
                <span className="sound-mode-label">SOUND: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={12} color="#F5A9C5" />
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
                <Moon size={12} color="#F7E7A6" />
                <span className="theme-mode-label">NIGHT</span>
              </>
            ) : (
              <>
                <Sun size={12} color="#A34068" />
                <span className="theme-mode-label">DAY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
