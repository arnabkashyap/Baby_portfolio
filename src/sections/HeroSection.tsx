import React, { useState } from 'react'
import { PipCharacter } from '../components/PipCharacter'
import { ArrowRight, ArrowDown, Star } from 'lucide-react'
import { type SoundEffectType } from '../utils/sound'
import './HeroSection.css'

interface HeroSectionProps {
  onOpenEasterEgg: () => void
  onPlaySound?: (type: SoundEffectType) => void
}

const BURST_SPARKS = [
  { id: 1, bx: '-24px', by: '-20px' },
  { id: 2, bx: '24px', by: '-22px' },
  { id: 3, bx: '-28px', by: '18px' },
  { id: 4, bx: '26px', by: '16px' },
  { id: 5, bx: '0px', by: '-30px' },
  { id: 6, bx: '0px', by: '28px' },
]

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEasterEgg, onPlaySound }) => {
  const [isBursting, setIsBursting] = useState(false)

  const handleActivateEasterEgg = () => {
    setIsBursting(true)
    onPlaySound?.('star')
    onOpenEasterEgg()
    setTimeout(() => setIsBursting(false), 600)
  }

  return (
    <section id="hero" className="hero-section" aria-label="Welcome to Pip's Dream Lab">
      <div className="hero-grid">
        {/* Left Column: Storybook & Retro Narrative */}
        <div className="hero-content">
          <div className="hero-top-status-row">
            <div className="hero-status-tag">
              <span className="hero-status-pulse" aria-hidden="true" />
              <span>JUNIOR DREAM ENGINEER · ONLINE</span>
            </div>

            {/* Secret Easter Egg Interactive Trigger */}
            <button
              type="button"
              className="hero-easter-egg-trigger"
              onClick={handleActivateEasterEgg}
              title="★ Secret Beacon: 432Hz · Click or Press Enter to inspect"
              aria-label="Secret sleeping star humming softly at 432Hz. Click or press Enter to inspect Pip's hidden stardust stash."
            >
              <Star size={13} color="#F7E7A6" fill="#F7E7A6" className="easter-egg-star-icon" />
              <span className="easter-egg-hint">★ 432Hz</span>

              {/* Small Sparkle Burst on Activation */}
              {isBursting && (
                <div className="easter-egg-burst-overlay" aria-hidden="true">
                  {BURST_SPARKS.map((s) => (
                    <span
                      key={s.id}
                      className="burst-spark-node"
                      style={{
                        top: '50%',
                        left: '50%',
                        ['--bx' as string]: s.bx,
                        ['--by' as string]: s.by,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          </div>

          <h1 className="hero-heading">
            Dreams don't build themselves.
          </h1>

          <p className="hero-intro">
            Meet Pip — a tiny dream engineer making bedtime a little more magical.
          </p>

          <div className="hero-tagline-box">
            <p className="hero-tagline-text">
              “I build the dreams you fall asleep inside.”
            </p>
            <span className="hero-tagline-author">
              — PIP'S OFFICIAL CREED · MIDNIGHT NURSERY
            </span>
          </div>

          <div className="hero-actions-row">
            <a
              href="#about"
              className="btn-primary-dream"
              onClick={() => onPlaySound?.('click')}
            >
              ENTER THE NURSERY <ArrowRight size={14} />
            </a>

            <a
              href="#dreams"
              className="btn-secondary-dream"
              onClick={() => onPlaySound?.('click')}
            >
              EXPLORE PIP'S DREAMS <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Right Column: Pip Character in Dream Laboratory */}
        <div className="hero-visual">
          <PipCharacter />
        </div>
      </div>
    </section>
  )
}
