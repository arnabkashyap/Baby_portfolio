import React from 'react'
import { Compass, Moon, Sparkles, Clock, Music, Sparkle } from 'lucide-react'
import './AboutSection.css'

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section" aria-label="About Pip">
      <div className="about-header-group">
        <span className="about-tag">
          <Compass size={12} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          ARCHIVE DOSSIER · PIP.EXE
        </span>

        <h2 className="about-heading">
          Small skull. Big dreams.
        </h2>

        <p className="about-intro-text">
          Pip is the Junior Dream Engineer on duty at the <strong>Midnight Nursery</strong>.
          Armed with an oversized nightcap, an encyclopedia of lullabies, and an irrepressible curiosity,
          Pip stays up when the world goes quiet to assemble the sweetest adventures in slumber.
        </p>

        {/* Personality Traits Badges */}
        <div className="traits-badges-row">
          <span className="trait-badge" title="Always exploring the edges of bedtime thoughts">
            <Sparkles size={12} color="#F5A9C5" />
            Curious
          </span>

          <span className="trait-badge" title="Takes tiny power-naps inside fluffy clouds">
            <Moon size={12} color="#F7E7A6" />
            Sleepy
          </span>

          <span className="trait-badge" title="Discovers magical sleep formulas by joyful chance">
            <Sparkle size={12} color="#FFF5E8" />
            Accidentally brilliant
          </span>
        </div>
      </div>

      {/* Visual Storytelling: Three Compact Fact Cards */}
      <div className="facts-cards-grid">
        {/* Fact 1 */}
        <div className="fact-card">
          <div className="fact-icon-bubble" aria-hidden="true">
            <Clock size={24} />
          </div>
          <h3 className="fact-card-title">Works after moonrise</h3>
          <p className="fact-card-desc">
            While sleepy heads rest on pillows, Pip tunes the midnight nursery telescopes
            to gather quiet moonlight and spin it into warm, reassuring thoughts.
          </p>
          <span className="fact-retro-tag">SHIFT: 00:00 — 06:00 AM</span>
        </div>

        {/* Fact 2 */}
        <div className="fact-card">
          <div className="fact-icon-bubble" aria-hidden="true">
            <Music size={24} />
          </div>
          <h3 className="fact-card-title">Speaks fluent lullaby</h3>
          <p className="fact-card-desc">
            Knows the ancient dialect of humming stars and soft raindrops. Can deconstruct
            tangled worries into rhythmic 432 Hz melodies that lull any restless mind.
          </p>
          <span className="fact-retro-tag">AUDIO DIALECT: ACOUSTIC COZY</span>
        </div>

        {/* Fact 3 */}
        <div className="fact-card">
          <div className="fact-icon-bubble" aria-hidden="true">
            <Sparkles size={24} />
          </div>
          <h3 className="fact-card-title">Collects unfinished dreams</h3>
          <p className="fact-card-desc">
            Saves forgotten afternoon daydreams in sealed glass stardust jars, polishing
            their edges until they are ready to become full nighttime adventures.
          </p>
          <span className="fact-retro-tag">STORAGE: 1,024 FLUFFY JARS</span>
        </div>
      </div>
    </section>
  )
}
