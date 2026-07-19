import { useCallback, useEffect } from 'react'
import { DASHBOARD_STORAGE_KEYS } from '../config/dashboardConfig'
import { THEME_MODES } from '../constants/theme'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(DASHBOARD_STORAGE_KEYS.theme, THEME_MODES.light)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === THEME_MODES.dark ? THEME_MODES.light : THEME_MODES.dark))
  }, [setTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
