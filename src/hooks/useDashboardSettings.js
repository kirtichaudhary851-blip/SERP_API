import { useCallback } from 'react'
import { DASHBOARD_STORAGE_KEYS, DEFAULT_DASHBOARD_SETTINGS } from '../config/dashboardConfig'
import { useLocalStorage } from './useLocalStorage'

export function useDashboardSettings() {
  const [settings, setSettings] = useLocalStorage(DASHBOARD_STORAGE_KEYS.settings, DEFAULT_DASHBOARD_SETTINGS)

  const updateSetting = useCallback((key, value) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }, [setSettings])

  const resetSettings = useCallback(() => setSettings(DEFAULT_DASHBOARD_SETTINGS), [setSettings])

  return { settings, updateSetting, resetSettings }
}
