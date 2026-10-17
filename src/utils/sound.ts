/**
 * Web Audio API Sound Utility for PIP.EXE
 * Creates tiny, gentle, synthesized chimes and clicks.
 * Pure native Web Audio API — zero external files or copyright issues.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  return audioCtx
}

export type SoundEffectType = 'click' | 'toggle' | 'open' | 'close' | 'star'

/**
 * Play a tiny, gentle bedtime sound effect if audio is explicitly enabled.
 */
export function playDreamSound(type: SoundEffectType = 'click', isEnabled = false): void {
  if (!isEnabled) return

  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Resume if suspended by browser autoplay policy
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    switch (type) {
      case 'click': {
        // Soft wooden/starlight click: 520Hz fading to 480Hz in 50ms
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(520, now)
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.05)

        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.06)
        break
      }

      case 'toggle': {
        // Gentle bubble/mode switch: 580Hz -> 360Hz
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(580, now)
        osc.frequency.exponentialRampToValueAtTime(360, now + 0.08)

        gain.gain.setValueAtTime(0.07, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.09)
        break
      }

      case 'open': {
        // Soft warm dream chord: 440Hz + 554Hz gentle swell
        ;[440, 554].forEach((freq) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, now)

          gain.gain.setValueAtTime(0.001, now)
          gain.gain.linearRampToValueAtTime(0.04, now + 0.03)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now)
          osc.stop(now + 0.18)
        })
        break
      }

      case 'close': {
        // Soft downward chime: 554Hz -> 440Hz
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(554, now)
        osc.frequency.exponentialRampToValueAtTime(415, now + 0.1)

        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.11)
        break
      }

      case 'star': {
        // Celestial stardust arpeggio: 528Hz -> 660Hz -> 792Hz
        const notes = [528, 660, 792, 990]
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, now + index * 0.06)

          gain.gain.setValueAtTime(0.001, now + index * 0.06)
          gain.gain.linearRampToValueAtTime(0.045, now + index * 0.06 + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.22)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start(now + index * 0.06)
          osc.stop(now + index * 0.06 + 0.24)
        })
        break
      }
    }
  } catch {
    // Fail silently without interrupting UI
  }
}
