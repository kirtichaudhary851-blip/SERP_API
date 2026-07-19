import { useCallback } from 'react'
import { STORAGE_KEYS } from '../config/appConfig'
import { useLocalStorage } from './useLocalStorage'

// Reads the same localStorage-backed search history Phase 3's useSearchHistory writes to,
// adding the delete/clear capabilities the dashboard's History table needs.
export function useDashboardHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.searchHistory, [])

  const removeEntry = useCallback((timestamp) => {
    setHistory((current) => current.filter((item) => item.timestamp !== timestamp))
  }, [setHistory])

  const clearAll = useCallback(() => setHistory([]), [setHistory])

  return { history, removeEntry, clearAll }
}
