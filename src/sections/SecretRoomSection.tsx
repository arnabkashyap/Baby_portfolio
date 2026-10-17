import React from 'react'
import { KeyRound, Lock } from 'lucide-react'
import './sections.css'

export const SecretRoomSection: React.FC = () => {
  return (
    <section id="secret-room" className="dream-section" aria-label="Secret Room">
      <div className="section-stub-card">
        <div className="section-header-row">
          <span className="section-tag">Hidden Sector · Classified</span>
          <span className="section-status-badge">
            <Lock size={12} />
            SECTION: SECRET ROOM
          </span>
        </div>
        <h2 className="section-title">Pip’s Midnight Secret Vault</h2>
        <p className="section-desc">
          An elusive chamber hidden beneath the nursery floorboards. Rumored to contain nostalgic mini-games, unreleased dream tapes, and easter eggs.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <span className="dream-badge">
            <KeyRound size={12} />
            PIXEL DISKETTE: LOCKED
          </span>
          <span className="dream-badge" style={{ color: 'var(--color-moonlight-yellow)' }}>
            EASTER EGG PROTOCOL
          </span>
        </div>
      </div>
    </section>
  )
}
