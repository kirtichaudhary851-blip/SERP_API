export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').trim()
export const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 10000

// True once a backend URL is configured. Until then, searchService falls back to mock data.
export const IS_API_CONFIGURED = API_BASE_URL.length > 0
