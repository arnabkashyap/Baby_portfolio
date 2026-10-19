import React from 'react'
import { Sparkles, Feather, Moon, BookOpen, Star, Compass } from 'lucide-react'
import { type SoundEffectType } from '../utils/sound'
import './StorySection.css'
import '../components/DreamCollectible.css'

interface StoryChapter {
  id: string
  chapterNum: string
  title: string
  summary: string
  narrative: string
  emblem: React.ReactNode
  logStamp: string
  mood: string
  align: 'left' | 'right'
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-01',
    chapterNum: 'CHAPTER 01',
    title: 'THE FIRST SPARK',
    summary: 'A tiny star becomes a comforting light.',
    narrative:
      'Pip discovered that a tiny star could become a comforting light for creatures afraid of bedtime. Wandering onto the highest nursery balcony, Pip found a shivering fallen starlight crystal in the night mist. Instead of letting it fade, Pip wrapped it with spun silver thread. When placed inside a clear glass jar, it hummed with gentle warmth—proving that the dark is never scary when a tiny friend is glowing beside you.',
    emblem: <Sparkles size={24} />,
    logStamp: 'LOG 001 · BEDTIME BEACON DISCOVERED',
    mood: 'Warm Amber · 432 Hz',
    align: 'left',
  },
  {
    id: 'chapter-02',
    chapterNum: 'CHAPTER 02',
    title: 'A TINY INVENTION',
    summary: 'A moonbeam, a music box, and generous curiosity.',
    narrative:
      'Pip built a little dream machine from a moonbeam, a music box, and a generous amount of curiosity. Working beneath an oversized nightcap in the nursery attic, Pip combined a clockwork spring with lavender ribbons and an antenna tuned to sleepy night breezes. When wound with three quiet clicks, the little device hummed a 432 Hz lullaby that dissolved tangled worries into peaceful vanilla clouds.',
    emblem: <Feather size={24} />,
    logStamp: 'LOG 002 · DREAM ENGINE PROTOTYPE ALPHA',
    mood: 'Lavender Mist · Acoustic',
    align: 'right',
  },
  {
    id: 'chapter-03',
    chapterNum: 'CHAPTER 03',
    title: 'THE MIDNIGHT MISSION',
    summary: 'Designing dreams and gentle adventures every night.',
    narrative:
      'Now Pip designs dreams, lullabies, and nightlights to help sleepy creatures drift into gentle adventures. Appointed Junior Dream Engineer of Division 07, Pip keeps watch from the nursery tower whenever the clocks strike twelve. Checking delivery routes and brewing stardust harmonies, Pip ensures every little dreamer falls asleep surrounded by kindness, courage, and sweet starry reveries.',
    emblem: <Moon size={24} />,
    logStamp: 'LOG 003 · DIVISION 07 STANDING WATCH',
    mood: 'Midnight Blue · Sweet Dreams',
    align: 'left',
  },
]

interface StorySectionProps {
  isWaypointFound?: boolean
  onCollectWaypoint?: () => void
  onPlaySound?: (type: SoundEffectType) => void
}

export const StorySection: React.FC<StorySectionProps> = ({
  isWaypointFound = false,
  onCollectWaypoint,
  onPlaySound,
}) => {
  return (
    <section id="story" className="story-section" aria-label="How Pip found the moonlight">
      <div className="story-header-group">
        <span className="story-tag">
          <BookOpen size={12} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
          STORYBOOK CHRONICLES · VOLUME 01
        </span>

        <h2 className="story-heading">
          How Pip found the moonlight
        </h2>

        <p className="story-intro-text">
          Follow Pip’s winding celestial trail through the Midnight Nursery logbooks.
          A tiny adventure about bravery, bedtime inventions, and looking out for sleepers everywhere.
        </p>
      </div>

      <div className="story-adventure-wrapper">
        {/* Illustrated Winding SVG Dream Route Connecting the Three Chapter Markers */}
        <svg
          className="story-winding-route-svg"
          viewBox="0 0 900 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="storyRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7E7A6" />
              <stop offset="45%" stopColor="#F5A9C5" />
              <stop offset="75%" stopColor="#A34068" />
              <stop offset="100%" stopColor="#F7E7A6" />
            </linearGradient>
            <radialGradient id="nodeGlowYellow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F7E7A6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F7E7A6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowPink" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5A9C5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F5A9C5" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Continuous Winding Dream Trail connecting Chapter 1 (top-left) to Chapter 2 (middle-right) to Chapter 3 (bottom-left) */}
          <path
            className="dream-route-line"
            d="M 60,70 C 180,120 720,180 780,360 C 840,540 180,590 100,750"
          />

          {/* Route Glowing Station Nodes */}
          {/* Node 1 near Chapter 01 */}
          <circle cx="60" cy="70" r="16" fill="url(#nodeGlowYellow)" />
          <circle cx="60" cy="70" r="5" fill="#F7E7A6" />

          {/* Node 2 near Chapter 02 */}
          <circle cx="780" cy="360" r="18" fill="url(#nodeGlowPink)" />
          <circle cx="780" cy="360" r="6" fill="#F5A9C5" />

          {/* Node 3 near Chapter 03 */}
          <circle cx="100" cy="750" r="18" fill="url(#nodeGlowYellow)" />
          <circle cx="100" cy="750" r="6" fill="#F7E7A6" />

          {/* Decorative Stars and Moon Symbols along the Route */}
          {/* Waypoint Star 1 */}
          <polygon
            points="320,135 323,141 330,142 325,146 326,152 320,149 314,152 315,146 310,142 317,141"
            fill="#F7E7A6"
            opacity="0.8"
          />
          {/* Waypoint Moon 1 */}
          <path
            d="M 520,220 C 508,220 500,228 500,240 C 500,252 510,260 524,260 C 516,260 508,254 508,242 C 508,230 516,222 520,220 Z"
            fill="#F5A9C5"
            opacity="0.7"
          />
          {/* Waypoint Star 2 */}
          <polygon
            points="460,560 462,565 468,566 464,570 465,575 460,573 455,575 456,570 452,566 458,565"
            fill="#FFF5E8"
            opacity="0.8"
          />
        </svg>

        {/* Story Chapters List */}
        <div className="story-chapters-list">
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.id}
              className={`story-chapter-card ${chapter.align === 'right' ? 'chapter-right' : 'chapter-left'}`}
              aria-label={`${chapter.chapterNum} — ${chapter.title}`}
            >
              {/* Marker Column */}
              <div className="chapter-marker-col">
                <span className="chapter-number-pill">{chapter.chapterNum}</span>
                <div className="chapter-emblem" aria-hidden="true">
                  {chapter.emblem}
                </div>
              </div>

              {/* Narrative Content */}
              <div className="chapter-content-col">
                <span className="chapter-subtitle-tag">{chapter.summary}</span>
                <h3 className="chapter-title">{chapter.chapterNum} — {chapter.title}</h3>
                <p className="chapter-narrative-text">{chapter.narrative}</p>

                <div className="chapter-footnote-row">
                  <span className="chapter-log-stamp">{chapter.logStamp}</span>
                  <span className="chapter-mood-pill">
                    <Star size={11} fill="#F7E7A6" color="#F7E7A6" />
                    {chapter.mood}
                  </span>
                </div>

                {/* Collectible: The Moonbeam Waypoint */}
                {chapter.id === 'chapter-02' && (
                  <div className="chapter-collectible-row">
                    <button
                      type="button"
                      className={`chapter-waypoint-btn ${isWaypointFound ? 'is-collected' : 'is-uncollected'}`}
                      onClick={() => {
                        onCollectWaypoint?.()
                        onPlaySound?.('star')
                      }}
                      title={isWaypointFound ? 'The Moonbeam Waypoint (Collected)' : 'Tune Moonbeam Waypoint'}
                      aria-label={
                        isWaypointFound
                          ? 'The Moonbeam Waypoint: Collected into dream journal.'
                          : 'Tune Moonbeam Waypoint: Celestial dream trail navigation beacon. Click or press Enter to collect.'
                      }
                    >
                      <Compass size={12} />
                      <span>{isWaypointFound ? 'WAYPOINT BEACON · COLLECTED' : '✦ TUNE MOONBEAM WAYPOINT'}</span>
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
