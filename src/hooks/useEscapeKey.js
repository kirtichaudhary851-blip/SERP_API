import { useEffect } from 'react'

// Lets keyboard users close a popover/dropdown with Escape, matching what
// mouse users already get from click-outside handling.
export function useEscapeKey(onEscape, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onEscape() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onEscape, enabled])
}
