import React, { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { StorySection } from './sections/StorySection'
import { FooterSection } from './sections/FooterSection'
import { EasterEggModal } from './components/EasterEggModal'
import { SparkleTrail } from './components/SparkleTrail'
import { playDreamSound, type SoundEffectType } from './utils/sound'
import './App.css'

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'night' | 'day'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip-theme')
      if (saved === 'day' || saved === 'night') return saved
    }
    return 'night'
  })

  // Audio state defaults strictly to false (muted) on initial visit
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pip-theme', theme)
  }, [theme])

  const handlePlaySound = useCallback(
    (type: SoundEffectType) => {
      playDreamSound(type, soundEnabled)
    },
    [soundEnabled]
  )

  const toggleTheme = () => {
    const next = theme === 'night' ? 'day' : 'night'
    setTheme(next)
    handlePlaySound('toggle')
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      // Play confirmation sound immediately with the new state
      playDreamSound('toggle', next)
      return next
    })
  }

  const handleOpenEasterEgg = () => {
    setIsEasterEggOpen(true)
  }

  const handleCloseEasterEgg = () => {
    handlePlaySound('close')
    setIsEasterEggOpen(false)
  }

  return (
    <div className="app-root">
      {/* Tasteful Lightweight Sparkle Cursor Trail on fine pointer devices */}
      <SparkleTrail />

      {/* Slim Header with Wordmark, Anchor Links, Sound Toggle, and Day/Night Toggle */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Page Content */}
      <main className="page-container main-content">
        {/* Hero Section with Pip Character, Tagline, Easter Egg Trigger & Audio feedback */}
        <HeroSection
          onOpenEasterEgg={handleOpenEasterEgg}
          onPlaySound={handlePlaySound}
        />

        {/* About Section: Small skull. Big dreams */}
        <AboutSection />

        {/* Projects Section: Little dreams. Big possibilities. & Interactive Blueprints */}
        <ProjectsSection onPlaySound={handlePlaySound} />

        {/* Story Section: How Pip found the moonlight & Winding Celestial Route */}
        <StorySection />
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Secret Stardust Easter Egg Modal */}
      <EasterEggModal isOpen={isEasterEggOpen} onClose={handleCloseEasterEgg} />
    </div>
  )
}

export default App
