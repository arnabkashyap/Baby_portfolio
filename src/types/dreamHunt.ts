/**
 * PIP.EXE — The Midnight Dream Lab
 * Dream Hunt: Collectible Types & Single Source of Truth
 */

export interface DreamCollectible {
  id: 'fallen-star' | 'stardust-jar' | 'brass-cassette' | 'moonbeam-waypoint'
  name: string
  location: string
  description: string
  hint: string
}

export type DreamCollectibleId = DreamCollectible['id']

export const DREAM_HUNT_STORAGE_KEY = 'pip-dream-hunt-items'

export const DREAM_COLLECTIBLES: readonly DreamCollectible[] = [
  {
    id: 'fallen-star',
    name: 'The Fallen Star',
    location: 'Hero Status Beacon',
    description: 'A tiny star humming softly at 432 Hz, discovered resting quietly beside Pip’s telemetry beacon.',
    hint: 'Listen for a gentle 432 Hz frequency in the nursery welcome telemetry.',
  },
  {
    id: 'stardust-jar',
    name: 'The Stardust Jar',
    location: 'About Fact Card #3',
    description: 'A sealed glass jar glowing with unfinished afternoon daydreams, safely catalogued in Pip’s archive.',
    hint: 'Inspect the storage vaults where 1,024 unfinished dreams are kept.',
  },
  {
    id: 'brass-cassette',
    name: 'The Brass Cassette Reel',
    location: 'Lullaby Lab Blueprint',
    description: 'A miniature clockwork cassette spool wound with acoustic lullaby tape and dandelion fluff.',
    hint: 'Inspect the blueprint of Pip’s audio synthesis invention.',
  },
  {
    id: 'moonbeam-waypoint',
    name: 'The Moonbeam Waypoint',
    location: 'Story Chapter 02',
    description: 'A radiant navigation station along the celestial dream route guiding nocturnal wanderers.',
    hint: 'Follow the celestial trail near Chapter 02: A Tiny Invention.',
  },
] as const

export const VALID_COLLECTIBLE_IDS: ReadonlySet<string> = new Set(
  DREAM_COLLECTIBLES.map((c) => c.id)
)
