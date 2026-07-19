import { useCallback } from 'react'
import { DASHBOARD_STORAGE_KEYS } from '../config/dashboardConfig'
import { useLocalStorage } from './useLocalStorage'

export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useLocalStorage(DASHBOARD_STORAGE_KEYS.savedSearches, [])

  const saveSearch = useCallback((entry) => {
    if (!entry?.query?.trim()) return
    setSavedSearches((current) => [
      { id: Date.now(), name: entry.query, favorite: false, ...entry, createdAt: Date.now() },
      ...current,
    ])
  }, [setSavedSearches])

  const renameSearch = useCallback((id, name) => {
    if (!name?.trim()) return
    setSavedSearches((current) => current.map((item) => (item.id === id ? { ...item, name } : item)))
  }, [setSavedSearches])

  const removeSearch = useCallback((id) => {
    setSavedSearches((current) => current.filter((item) => item.id !== id))
  }, [setSavedSearches])

  const toggleFavorite = useCallback((id) => {
    setSavedSearches((current) => current.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)))
  }, [setSavedSearches])

  return { savedSearches, saveSearch, renameSearch, removeSearch, toggleFavorite }
}
