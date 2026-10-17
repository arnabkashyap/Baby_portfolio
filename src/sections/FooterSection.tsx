import React from 'react'
import { Heart, Sparkles, Moon, ArrowUp } from 'lucide-react'
import './sections.css'

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="site-footer" aria-label="Footer Section">
      <div className="page-container footer-content">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={14} color="#F5A9C5" />
            <span className="footer-title">PIP.EXE · THE MIDNIGHT DREAM LAB</span>
          </div>
          <span className="footer-tagline">“I build the dreams you fall asleep inside.”</span>
          <p className="footer-sub-meta">
            Midnight Nursery · Section 07 · Junior Dream Engineer Dossier
          </p>
        </div>

        <div className="footer-links-group">
          <nav className="footer-nav" aria-label="Footer Navigation">
            <a href="#about" className="footer-link">About Pip</a>
            <span className="footer-sep">·</span>
            <a href="#dreams" className="footer-link">Dream Workshop</a>
            <span className="footer-sep">·</span>
            <a href="#story" className="footer-link">Origin Lore</a>
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-top-btn"
            title="Return to top of Dream Lab"
            aria-label="Back to top"
          >
            TOP <ArrowUp size={12} />
          </button>
        </div>

        <div className="footer-meta">
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', margin: 0 }}>
            Crafted with <Heart size={13} color="#F5A9C5" fill="#F5A9C5" /> for the haX.baby challenge
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.35rem', fontSize: '0.75rem', opacity: 0.75 }}>
            <Moon size={12} color="#F7E7A6" />
            Bedtime Protocol Active · Sleep tight
          </p>
        </div>
      </div>
    </footer>
  )
}
