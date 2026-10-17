import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, ArrowLeft, X, Lightbulb, Compass, Radio } from 'lucide-react'
import { type SoundEffectType } from '../utils/sound'
import './ProjectsSection.css'

interface ProjectItem {
  id: string
  title: string
  category: string
  description: string
  whatItDoes: string
  designDetail: string
  fictionalTag: string
  svgArt: React.ReactNode
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'lullaby-lab',
    title: 'LULLABY LAB',
    category: 'AUDIO SYNTHESIS · PIP-01',
    description: 'Turns tangled thoughts into gentle bedtime melodies.',
    whatItDoes:
      'Filters noisy afternoon thoughts, worry knots, and daytime static, weaving them into soft 432 Hz harmonic lullabies that sync gently with slow bedtime breathing.',
    designDetail:
      'Features a miniature brass frequency dial calibrated with dandelion fluff and a moonbeam antenna that samples nocturnal breezes to dynamically soften the volume.',
    fictionalTag: "Pip's Imagined Invention #01 · Fictional Bedtime Prototype",
    svgArt: (
      <svg
        className="project-art-svg"
        viewBox="0 0 340 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Lullaby Lab moonlit music-player and sound waves"
      >
        <defs>
          <linearGradient id="lullabyTapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#252747" />
            <stop offset="100%" stopColor="#17152B" />
          </linearGradient>
          <linearGradient id="lullabyWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A34068" />
            <stop offset="50%" stopColor="#F5A9C5" />
            <stop offset="100%" stopColor="#F7E7A6" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="80%" cy="25%" r="35%">
            <stop offset="0%" stopColor="#F7E7A6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#17152B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="340" height="200" fill="#17152B" />
        <circle cx="280" cy="45" r="50" fill="url(#moonGlow)" />

        {/* Crescent Moon in Corner */}
        <path
          d="M280 25 C265 25, 255 35, 255 50 C255 65, 268 75, 285 75 C275 75, 265 67, 265 52 C265 37, 275 28, 280 25 Z"
          fill="#F7E7A6"
        />

        {/* Moonlit Vintage Music Player Deck */}
        <rect x="45" y="45" width="250" height="110" rx="10" fill="url(#lullabyTapeGrad)" stroke="#F5A9C5" strokeWidth="1.5" />
        {/* Cassette Tape Window */}
        <rect x="85" y="60" width="170" height="48" rx="6" fill="#121024" stroke="rgba(245, 169, 197, 0.4)" strokeWidth="1" />
        
        {/* Tape Reels with Rotating Dots */}
        <circle cx="130" cy="84" r="16" fill="#252747" stroke="#F7E7A6" strokeWidth="1.5" />
        <circle cx="130" cy="84" r="6" fill="#17152B" />
        <circle cx="210" cy="84" r="16" fill="#252747" stroke="#F7E7A6" strokeWidth="1.5" />
        <circle cx="210" cy="84" r="6" fill="#17152B" />
        <line x1="130" y1="84" x2="210" y2="84" stroke="rgba(247, 231, 166, 0.3)" strokeWidth="1" strokeDasharray="2 3" />

        {/* Radiating Sound Waves (Sine Curves) */}
        <path
          d="M55 125 Q75 110, 95 125 T135 125 T175 125 T215 125 T255 125 T285 125"
          stroke="url(#lullabyWaveGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M65 135 Q85 145, 105 135 T145 135 T185 135 T225 135 T265 135"
          stroke="#F5A9C5"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Floating Musical Notes */}
        {/* Note 1 (Eighth Note ♪) */}
        <g transform="translate(65, 30)">
          <ellipse cx="6" cy="14" rx="4" ry="3" fill="#F5A9C5" transform="rotate(-20 6 14)" />
          <line x1="9" y1="13" x2="9" y2="3" stroke="#F5A9C5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 3 Q13 5, 14 9" stroke="#F5A9C5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
        {/* Note 2 (Beamed Notes ♫) */}
        <g transform="translate(160, 22)">
          <ellipse cx="4" cy="14" rx="3.5" ry="2.5" fill="#F7E7A6" transform="rotate(-20 4 14)" />
          <ellipse cx="18" cy="11" rx="3.5" ry="2.5" fill="#F7E7A6" transform="rotate(-20 18 11)" />
          <line x1="6.5" y1="13" x2="6.5" y2="3" stroke="#F7E7A6" strokeWidth="1.5" />
          <line x1="20.5" y1="10" x2="20.5" y2="0" stroke="#F7E7A6" strokeWidth="1.5" />
          <line x1="6" y1="3" x2="21" y2="0" stroke="#F7E7A6" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Tiny Stars & Sparkles */}
        <polygon points="50,20 52,24 56,25 53,27 54,31 50,29 46,31 47,27 44,25 48,24" fill="#FFF5E8" />
        <polygon points="230,28 231,31 234,32 232,34 233,37 230,35 227,37 228,34 226,32 229,31" fill="#F7E7A6" />
      </svg>
    ),
  },
  {
    id: 'nightlight-collection',
    title: 'NIGHTLIGHT COLLECTION',
    category: 'ILLUMINATION · PIP-02',
    description: 'Tiny lights inspired by friendly stars and sleepy clouds.',
    whatItDoes:
      'Radiates gentle amber starlight across bedroom ceilings, dispersing scary closet shadows without interfering with natural sleepy-eye melatonin.',
    designDetail:
      'Powered by a safe, spun moon-sugar filament that stays cool to the touch and dims automatically as soon as peaceful snores are detected.',
    fictionalTag: "Pip's Imagined Invention #02 · Fictional Bedtime Prototype",
    svgArt: (
      <svg
        className="project-art-svg"
        viewBox="0 0 340 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Nightlight Collection glowing lamp with star halo"
      >
        <defs>
          <radialGradient id="starHalo" cx="50%" cy="45%" r="46%">
            <stop offset="0%" stopColor="#F7E7A6" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F5A9C5" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#A34068" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#17152B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="340" height="200" fill="#17152B" />

        {/* Ambient Soft Halo */}
        <circle cx="170" cy="85" r="85" fill="url(#starHalo)" />

        {/* Sleepy Cloud Stand */}
        <ellipse cx="170" cy="150" rx="70" ry="20" fill="#252747" stroke="#F5A9C5" strokeWidth="1.5" />
        <ellipse cx="130" cy="144" rx="34" ry="16" fill="#FFF5E8" fillOpacity="0.85" />
        <ellipse cx="210" cy="144" rx="34" ry="16" fill="#FFF5E8" fillOpacity="0.85" />
        <ellipse cx="170" cy="140" rx="46" ry="18" fill="#FFF5E8" />

        {/* Hanging Star Decorations */}
        <line x1="95" y1="20" x2="95" y2="70" stroke="rgba(247, 231, 166, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="95,70 98,75 104,76 100,79 101,84 95,82 89,84 90,79 86,76 92,75" fill="#F7E7A6" />

        <line x1="245" y1="20" x2="245" y2="60" stroke="rgba(245, 169, 197, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="245,60 247,64 252,65 249,68 250,72 245,70 240,72 241,68 238,65 243,64" fill="#F5A9C5" />

        {/* Centerpiece Star Nightlight Character */}
        <polygon
          points="170,40 179,66 206,68 185,85 192,112 170,96 148,112 155,85 134,68 161,66"
          fill="#F7E7A6"
          stroke="#FFF5E8"
          strokeWidth="2"
        />

        {/* Sweet Sleepy Eyes */}
        <path d="M161 77 Q165 82 169 77" stroke="#17152B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M171 77 Q175 82 179 77" stroke="#17152B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Rosy Stardust Cheeks */}
        <circle cx="158" cy="83" r="3.5" fill="#F5A9C5" />
        <circle cx="182" cy="83" r="3.5" fill="#F5A9C5" />
        {/* Nightlight Base Switch */}
        <rect x="160" y="152" width="20" height="7" rx="3" fill="#A34068" />
        <circle cx="170" cy="155.5" r="2.5" fill="#F7E7A6" />
      </svg>
    ),
  },
  {
    id: 'dream-delivery-routes',
    title: 'DREAM DELIVERY ROUTES',
    category: 'NAVIGATION · PIP-03',
    description: 'Helps every dream find the right sleepyhead.',
    whatItDoes:
      'Calculates cozy, turbulence-free flight corridors across the nighttime sky so peaceful dreams land directly upon the intended pillow before midnight.',
    designDetail:
      'Uses silver cloud railway switches and constellation waypoints to smoothly steer dream parcels around passing thunderstorms and grumpy thunderheads.',
    fictionalTag: "Pip's Imagined Invention #03 · Fictional Bedtime Prototype",
    svgArt: (
      <svg
        className="project-art-svg"
        viewBox="0 0 340 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Dream Delivery Routes winding path with stars and moon markers"
      >
        <defs>
          <linearGradient id="routeTrack" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A34068" />
            <stop offset="45%" stopColor="#F5A9C5" />
            <stop offset="100%" stopColor="#F7E7A6" />
          </linearGradient>
        </defs>

        <rect width="340" height="200" fill="#17152B" />

        {/* Pillow Cloud Stations */}
        <ellipse cx="65" cy="155" rx="35" ry="18" fill="#252747" stroke="#F5A9C5" strokeWidth="1" />
        <ellipse cx="65" cy="150" rx="25" ry="12" fill="#FFF5E8" />
        <text x="65" y="178" fill="#F5A9C5" fontSize="8" fontFamily="'Press Start 2P', monospace" textAnchor="middle">DEPOT A</text>

        <ellipse cx="175" cy="75" rx="40" ry="20" fill="#252747" stroke="#F7E7A6" strokeWidth="1" />
        <ellipse cx="175" cy="70" rx="28" ry="13" fill="#FFF5E8" />
        <text x="175" y="103" fill="#F7E7A6" fontSize="8" fontFamily="'Press Start 2P', monospace" textAnchor="middle">CLOUD 9</text>

        <ellipse cx="280" cy="140" rx="35" ry="18" fill="#252747" stroke="#F5A9C5" strokeWidth="1" />
        <ellipse cx="280" cy="135" rx="25" ry="12" fill="#FFF5E8" />
        <text x="280" y="165" fill="#F5A9C5" fontSize="8" fontFamily="'Press Start 2P', monospace" textAnchor="middle">PILLOW 4B</text>

        {/* Winding Illustrated Dream Route Path */}
        <path
          d="M65 145 C90 100, 130 65, 175 65 C220 65, 230 140, 280 130"
          stroke="url(#routeTrack)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Tiny Moon Markers Along Route */}
        {/* Moon Marker 1 */}
        <g transform="translate(120, 95)">
          <circle cx="0" cy="0" r="10" fill="#252747" stroke="#F7E7A6" strokeWidth="1.5" />
          <path d="M2 -5 C-3 -5, -6 -1, -6 3 C-6 7, -3 9, 2 9 C-1 9, -4 7, -4 3 C-4 -1, -1 -4, 2 -5 Z" fill="#F7E7A6" />
        </g>
        {/* Moon Marker 2 */}
        <g transform="translate(230, 85)">
          <circle cx="0" cy="0" r="10" fill="#252747" stroke="#F5A9C5" strokeWidth="1.5" />
          <path d="M2 -5 C-3 -5, -6 -1, -6 3 C-6 7, -3 9, 2 9 C-1 9, -4 7, -4 3 C-4 -1, -1 -4, 2 -5 Z" fill="#F5A9C5" />
        </g>

        {/* Waypoint Stars */}
        <polygon points="65,135 67,139 71,140 68,142 69,146 65,144 61,146 62,142 59,140 63,139" fill="#F7E7A6" />
        <polygon points="175,55 177,59 181,60 178,62 179,66 175,64 171,66 172,62 169,60 173,59" fill="#FFF5E8" />
        <polygon points="280,120 282,124 286,125 283,127 284,131 280,129 276,131 277,127 274,125 278,124" fill="#F7E7A6" />
      </svg>
    ),
  },
]

interface ProjectsSectionProps {
  onPlaySound?: (type: SoundEffectType) => void
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onPlaySound }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const detailDialogRef = useRef<HTMLDivElement>(null)

  // Handle escape key to close project detail
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onPlaySound?.('close')
        setSelectedProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    detailDialogRef.current?.focus()

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, onPlaySound])

  const handleCardClick = (project: ProjectItem) => {
    onPlaySound?.('open')
    setSelectedProject(project)
  }

  const handleCardKeyDown = (e: React.KeyboardEvent, project: ProjectItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPlaySound?.('open')
      setSelectedProject(project)
    }
  }

  const handleCloseDetail = () => {
    onPlaySound?.('close')
    setSelectedProject(null)
  }

  return (
    <section id="dreams" className="projects-section" aria-label="Pip's Dream Inventions">
      <div className="projects-header-group">
        <span className="projects-tag">
          <Sparkles size={12} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          PIP’S DREAM LAB WORKBENCH
        </span>

        <h2 className="projects-heading">
          Little dreams. Big possibilities.
        </h2>

        <p className="projects-subtext">
          Three bedside inventions engineered from midnight stardust, gentle lullabies, and curiosity.
          Click or activate any dream card to inspect Pip's imagined blueprints.
        </p>
      </div>

      {/* 3-Card Balanced Desktop Grid / Mobile Stack */}
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={`project-card ${selectedProject?.id === project.id ? 'active-card' : ''}`}
            onClick={() => handleCardClick(project)}
            onKeyDown={(e) => handleCardKeyDown(e, project)}
            tabIndex={0}
            role="button"
            aria-haspopup="dialog"
            aria-expanded={selectedProject?.id === project.id}
            aria-label={`${project.title}: ${project.description}. Click or press Enter to inspect Pip's blueprint.`}
          >
            {/* Visual Canvas (CSS/SVG Art) */}
            <div className="project-art-canvas">
              {project.svgArt}
            </div>

            {/* Card Content Area */}
            <div className="project-content">
              <span className="project-category-badge">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-footer-row">
                <span className="project-inspect-trigger">
                  <Sparkles size={12} />
                  INSPECT BLUEPRINT ✦
                </span>
                <span className="project-status-dot-label">
                  <span className="dot-indicator" aria-hidden="true" />
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Detail Dialog (Step 4) */}
      {selectedProject && (
        <div
          className="project-detail-overlay"
          onClick={handleCloseDetail}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-dialog-title"
        >
          <div
            ref={detailDialogRef}
            className="project-detail-dialog"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="detail-top-bar">
              <span className="detail-fictional-badge">
                <Radio size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                {selectedProject.fictionalTag}
              </span>
              <button
                type="button"
                className="detail-close-icon-btn"
                onClick={handleCloseDetail}
                aria-label="Close dream blueprint (or press Escape)"
              >
                <X size={18} />
              </button>
            </div>

            <div className="detail-header-block">
              <span className="detail-category">{selectedProject.category}</span>
              <h3 id="detail-dialog-title" className="detail-title">{selectedProject.title}</h3>
              <p className="detail-tagline">“{selectedProject.description}”</p>
            </div>

            {/* What the project does */}
            <div className="detail-block">
              <span className="detail-block-label">
                <Compass size={13} color="#F7E7A6" />
                WHAT THIS DREAM DOES
              </span>
              <p className="detail-block-text">{selectedProject.whatItDoes}</p>
            </div>

            {/* Imaginative design detail */}
            <div className="detail-block">
              <span className="detail-block-label">
                <Lightbulb size={13} color="#F5A9C5" />
                IMAGINATIVE DESIGN DETAIL
              </span>
              <p className="detail-block-text">{selectedProject.designDetail}</p>
            </div>

            {/* Close / Back to Dreams */}
            <div className="detail-bottom-row">
              <button
                type="button"
                className="detail-back-btn"
                onClick={handleCloseDetail}
              >
                <ArrowLeft size={13} />
                BACK TO DREAMS
              </button>
              <span className="detail-notebook-stamp">
                MIDNIGHT NURSERY · NOTEBOOK PAGE 07
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
