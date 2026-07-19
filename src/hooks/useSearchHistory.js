import { useCallback } from 'react'
import { SEARCH_HISTORY_LIMIT, STORAGE_KEYS } from '../config/appConfig'
import { useLocalStorage } from './useLocalStorage'

// Tracks recent searches in localStorage, most recent first, deduped by query text.
export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.searchHistory, [])

  const addSearch = useCallback((entry) => {
    if (!entry?.query?.trim()) return
    setHistory((current) => {
      const withoutDuplicate = current.filter((item) => item.query.toLowerCase() !== entry.query.toLowerCase())
      return [{ ...entry, timestamp: Date.now() }, ...withoutDuplicate].slice(0, SEARCH_HISTORY_LIMIT)
    })
  }, [setHistory])

  const clearHistory = useCallback(() => setHistory([]), [setHistory])

  return { history, addSearch, clearHistory }
}
