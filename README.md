# PIP.EXE — The Midnight Dream Lab 🌙✨

> *“I build the dreams you fall asleep inside.”*

A whimsical, cozy, retro-storybook personal website and creative portfolio for **Pip**, Junior Dream Engineer at Midnight Nursery. Built for the [haX.baby](https://hax.baby) **“Baby’s First Website”** hackathon challenge.

---

## 🎨 Creative Art Direction

- **50% Retro Early-Internet Nostalgia**: Pixel-style telemetry badges, glowing terminal window headers, status lights, and pocket-blueprint dialogs.
- **30% Dreamy Storybook**: Expressive typography, starry nightcaps, soft ambient gradients, and charming narrative lore.
- **20% Pixel-Game Interactivity**: Interactive blueprint cards, sound chimes, pointer-responsive 3D tilt, and a secret stardust easter egg.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with comprehensive design token variables (no heavy CSS frameworks)
- **Audio Engine**: Pure native **Web Audio API** (procedurally synthesized click, chime, bubble, and stardust arpeggios — no external audio files required)
- **Icons**: Lucide React
- **Typography**:
  - `DM Serif Display` — Expressive storybook headings
  - `Nunito` — Readable, friendly narrative body
  - `Press Start 2P` — Retro telemetry and category badges

---

## 🌟 Key Features

1. **Magical Dream Laboratory Hero**:
   - Status telemetry badge: `JUNIOR DREAM ENGINEER · ONLINE`
   - Official creed quote card and dual CTA buttons with smooth anchor scrolling
   - Official Pip cloud avatar with subtle 3D cursor tilt and ambient dream aura
   - Retro status card: `DREAM ENGINE: ONLINE · 432 Hz Bedtime Stream`
2. **About Pip Dossier (`#about`)**:
   - Heading: *“Small skull. Big dreams.”*
   - Personality badges: `Curious`, `Sleepy`, and `Accidentally brilliant`
   - Three visual storytelling fact cards: *Works after moonrise*, *Speaks fluent lullaby*, and *Collects unfinished dreams*
3. **Dream Inventions Workshop (`#dreams`)**:
   - Heading: *“Little dreams. Big possibilities.”*
   - Three distinct SVG-illustrated cards:
     - **Lullaby Lab**: Custom audio cassette player & 432 Hz waveform synthesizer
     - **Nightlight Collection**: Ambient star lantern with a cloud pedestal
     - **Dream Delivery Routes**: Celestial railway map with waypoints and pillow stations
   - **Interactive Blueprint Inspection**: Click or press `Enter`/`Space` to inspect Pip's imagined blueprints, featuring "What it does", whimsical design details, and a `← BACK TO DREAMS` control.
4. **Storybook Adventure (`#story`)**:
   - Heading: *“How Pip found the moonlight”*
   - Three connected chapters: *The First Spark*, *A Tiny Invention*, and *The Midnight Mission*
   - Connected by an illustrated winding SVG dream trail with glowing station nodes
5. **Day / Night Theme Switcher**:
   - Seamlessly toggle between nocturnal **Midnight Mode** (`#17152B`) and warm dawn **Daydream Mode** (`#FFF5E8`)
6. **Procedural Bedtime Sound System**:
   - Clearly visible `SOUND: ON` / `MUTED` control in the header
   - Defaults strictly to muted on initial visit
   - Gentle Web Audio chimes on UI interactions
7. **Secret Stardust Easter Egg**:
   - Hidden humming star beacon (`★ 432Hz`) in the hero
   - On activation: fires a sparkle particle burst and unlocks Pip's secret pocket dream message
   - Fully accessible via mouse or keyboard (`Tab` + `Enter`, dismissible via `Escape`)
8. **Sparkle Cursor Trail**:
   - Lightweight stardust particles trailing pointer movements on fine-pointer desktop devices (auto-disabled on touch and for `prefers-reduced-motion`)

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arnabkashyap/Baby_portfolio.git
   cd Baby_portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Linting**:
   ```bash
   npm run lint
   ```

---

## 📜 Palette

| Color | Hex | Token |
|---|---|---|
| Midnight Ink | `#17152B` | `--color-midnight-ink` |
| Dream Navy | `#252747` | `--color-dream-navy` |
| Moon Cream | `#FFF5E8` | `--color-moon-cream` |
| Dream Berry | `#A34068` | `--color-dream-berry` |
| Stardust Pink | `#F5A9C5` | `--color-stardust-pink` |
| Moonlight Yellow | `#F7E7A6` | `--color-moonlight-yellow` |

---

*Crafted with 💖 for the haX.baby challenge.*
