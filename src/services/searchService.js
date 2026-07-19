import { IS_API_CONFIGURED } from '../config/apiConfig'
import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { fetchMockResults } from './mockProvider'

// Single entry point the UI calls to run a search. When VITE_API_BASE_URL is not
// configured yet, requests transparently resolve against local mock data so the
// app keeps working until the Python backend is connected.
export function searchService(params, { signal } = {}) {
  if (!IS_API_CONFIGURED) return fetchMockResults(params, signal)
  return apiRequest(ENDPOINTS.search, { params, signal })
}
