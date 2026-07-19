import { useCallback, useState } from 'react'

// Persists state to localStorage under `key`. Falls back to `initialValue` when
// storage is unavailable or the stored value can't be parsed.
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    setStoredValue((current) => {
      const nextValue = value instanceof Function ? value(current) : value
      try {
        window.localStorage.setItem(key, JSON.stringify(nextValue))
      } catch {
        // Storage unavailable (private browsing, quota exceeded, etc.) — state still updates in memory.
      }
      return nextValue
    })
  }, [key])

  return [storedValue, setValue]
}
