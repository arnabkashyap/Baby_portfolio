/**
 * PIP.EXE — Accessible Modal Coordination, Scroll Lock & Focus Restoration Manager
 * Lightweight, zero-dependency coordinator for stacked accessible dialogs.
 */

export interface ActiveModal {
  id: string
  dismiss: () => void
  getContainer?: () => HTMLElement | null
  triggerElement?: HTMLElement | null
}

const modalStack: ActiveModal[] = []
let scrollLockCount = 0
let previousBodyOverflow = ''

/**
 * Acquire a body scroll lock reference.
 */
export function lockScroll(): void {
  if (typeof document === 'undefined') return
  if (scrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  scrollLockCount++
}

/**
 * Release a body scroll lock reference. Only restores original overflow when all dialogs close.
 */
export function unlockScroll(): void {
  if (typeof document === 'undefined') return
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow || ''
  }
}

/**
 * Register an active modal on the coordination stack.
 * Returns an unregister cleanup function.
 */
export function registerModal(modal: ActiveModal): () => void {
  const existingIndex = modalStack.findIndex((m) => m.id === modal.id)
  if (existingIndex !== -1) {
    modalStack[existingIndex] = modal
  } else {
    modalStack.push(modal)
    lockScroll()
  }

  return () => {
    const idx = modalStack.findIndex((m) => m.id === modal.id)
    if (idx !== -1) {
      modalStack.splice(idx, 1)
      unlockScroll()
    }
  }
}

/**
 * Returns the currently topmost modal on the stack.
 */
export function getTopModal(): ActiveModal | undefined {
  return modalStack[modalStack.length - 1]
}

/**
 * Returns the modal immediately below the specified modal, if any.
 */
export function getUnderlyingModal(currentId: string): ActiveModal | undefined {
  const idx = modalStack.findIndex((m) => m.id === currentId)
  if (idx > 0) {
    return modalStack[idx - 1]
  }
  return undefined
}

/**
 * Restores keyboard focus gracefully on dialog closure:
 * 1. Prioritizes the underlying modal if one exists in a stack.
 * 2. Restores to the original trigger element if still mounted.
 * 3. Falls back to a stable container/button selector.
 */
export function restoreFocus(
  triggerElement: HTMLElement | null | undefined,
  underlyingModal?: ActiveModal | null,
  fallbackSelector?: string
): void {
  if (typeof document === 'undefined') return

  // 1. If an underlying stacked modal exists, restore focus into it
  if (underlyingModal) {
    const container = underlyingModal.getContainer?.()
    if (container && document.body.contains(container)) {
      const focusable = container.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable) {
        focusable.focus()
        return
      }
      container.focus()
      return
    }
  }

  // 2. Otherwise restore to the original triggering element if still connected to DOM
  if (triggerElement && document.body.contains(triggerElement)) {
    triggerElement.focus()
    return
  }

  // 3. Fallback to a stable selector on page
  if (fallbackSelector) {
    const fallback = document.querySelector<HTMLElement>(fallbackSelector)
    if (fallback && document.body.contains(fallback)) {
      fallback.focus()
    }
  }
}

// Single coordinated Escape key event listener in capture phase
if (typeof window !== 'undefined') {
  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        const top = modalStack[modalStack.length - 1]
        if (top && typeof top.dismiss === 'function') {
          e.stopPropagation()
          e.preventDefault()
          top.dismiss()
        }
      }
    },
    true
  )
}
