import { THEME_MODES } from '../constants/theme'

export const DASHBOARD_STORAGE_KEYS = Object.freeze({
  theme: 'serp:theme',
  savedSearches: 'serp:saved-searches',
  settings: 'serp:dashboard-settings',
})

export const DEFAULT_DASHBOARD_SETTINGS = Object.freeze({
  theme: THEME_MODES.light,
  language: 'en',
  defaultCountry: 'us',
  defaultDevice: 'Desktop',
  resultsPerPage: '10',
  notificationsEnabled: true,
  autoSaveHistory: true,
})

export const HISTORY_PAGE_SIZE = 6
