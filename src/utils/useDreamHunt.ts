import { useState, useCallback } from 'react'
import {
  DREAM_COLLECTIBLES,
  DREAM_HUNT_STORAGE_KEY,
  VALID_COLLECTIBLE_IDS,
  type DreamCollectible,
  type DreamCollectibleId,
} from '../types/dreamHunt'

/**
 * Safely load previously discovered collectible IDs from localStorage.
 * Handles disabled storage, corrupt JSON, and non-array/invalid values gracefully.
 */
function loadSavedCollectibles(): DreamCollectibleId[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DREAM_HUNT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const sanitized = parsed.filter(
      (id): id is DreamCollectibleId => typeof id === 'string' && VALID_COLLECTIBLE_IDS.has(id)
    )
    return Array.from(new Set(sanitized))
  } catch {
    return []
  }
}

/**
 * Safely persist discovered collectible IDs to localStorage.
 */
function saveCollectibles(ids: DreamCollectibleId[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(DREAM_HUNT_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Fail silently if localStorage is blocked or quota exceeded
  }
}

export interface UseDreamHuntReturn {
  foundIds: DreamCollectibleId[]
  foundCount: number
  totalCount: number
  hasCompleted: boolean
  isItemFound: (id: DreamCollectibleId) => boolean
  collectItem: (id: DreamCollectibleId) => boolean
  resetHunt: () => void
  collectibles: readonly DreamCollectible[]
  isJournalOpen: boolean
  openJournal: () => void
  closeJournal: () => void
  toggleJournal: () => void
  isEndingOpen: boolean
  openEnding: () => void
  closeEnding: () => void
  justUnlocked: boolean
  dismissUnlockToast: () => void
}

export function useDreamHunt(): UseDreamHuntReturn {
  const [foundIds, setFoundIds] = useState<DreamCollectibleId[]>(loadSavedCollectibles)
  const [isJournalOpen, setIsJournalOpen] = useState(false)
  const [isEndingOpen, setIsEndingOpen] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  const isItemFound = useCallback(
    (id: DreamCollectibleId): boolean => foundIds.includes(id),
    [foundIds]
  )

  const collectItem = useCallback((id: DreamCollectibleId): boolean => {
    if (!VALID_COLLECTIBLE_IDS.has(id)) return false

    let wasNew = false
    let isFourth = false
    setFoundIds((prev) => {
      if (prev.includes(id)) {
        return prev
      }
      wasNew = true
      const next = [...prev, id]
      if (next.length === DREAM_COLLECTIBLES.length) {
        isFourth = true
      }
      saveCollectibles(next)
      return next
    })

    if (isFourth) {
      setJustUnlocked(true)
    }

    return wasNew
  }, [])

  const resetHunt = useCallback(() => {
    setFoundIds([])
    saveCollectibles([])
    setIsEndingOpen(false)
    setJustUnlocked(false)
  }, [])

  const openJournal = useCallback(() => setIsJournalOpen(true), [])
  const closeJournal = useCallback(() => setIsJournalOpen(false), [])
  const toggleJournal = useCallback(() => setIsJournalOpen((prev) => !prev), [])

  const openEnding = useCallback(() => {
    // Only allow opening if all 4 items have been collected
    if (foundIds.length === DREAM_COLLECTIBLES.length) {
      setIsEndingOpen(true)
      setJustUnlocked(false)
    }
  }, [foundIds.length])

  const closeEnding = useCallback(() => setIsEndingOpen(false), [])
  const dismissUnlockToast = useCallback(() => setJustUnlocked(false), [])

  return {
    foundIds,
    foundCount: foundIds.length,
    totalCount: DREAM_COLLECTIBLES.length,
    hasCompleted: foundIds.length === DREAM_COLLECTIBLES.length,
    isItemFound,
    collectItem,
    resetHunt,
    collectibles: DREAM_COLLECTIBLES,
    isJournalOpen,
    openJournal,
    closeJournal,
    toggleJournal,
    isEndingOpen,
    openEnding,
    closeEnding,
    justUnlocked,
    dismissUnlockToast,
  }
}
