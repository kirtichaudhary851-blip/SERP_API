import { API_BASE_URL, API_TIMEOUT_MS } from '../config/apiConfig'
import { ApiError, ERROR_TYPES, normalizeError } from './errors'

// Generic JSON request helper. Applies a timeout and lets an external AbortSignal
// cancel the request (e.g. when a newer search supersedes this one).
export async function apiRequest(path, { params, signal } = {}) {
  const url = new window.URL(path, API_BASE_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value)
    })
  }

  const controller = new window.AbortController()
  let timedOut = false
  const timeoutId = window.setTimeout(() => { timedOut = true; controller.abort() }, API_TIMEOUT_MS)
  const onExternalAbort = () => controller.abort()
  signal?.addEventListener('abort', onExternalAbort)

  try {
    const response = await window.fetch(url, { headers: { Accept: 'application/json' }, signal: controller.signal })

    if (!response.ok) {
      const type = response.status >= 500 ? ERROR_TYPES.SERVER : ERROR_TYPES.UNKNOWN
      throw new ApiError(type, `Request failed with status ${response.status}.`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error?.name === 'AbortError') {
      if (timedOut) throw new ApiError(ERROR_TYPES.TIMEOUT)
      throw error
    }
    throw normalizeError(error)
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', onExternalAbort)
  }
}
