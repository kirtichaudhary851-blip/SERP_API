import { useCallback, useEffect, useRef, useState } from 'react'
import { SEARCH_STATUS } from '../constants/searchConstants'
import { normalizeError } from '../services/errors'
import { searchService } from '../services/searchService'

const initialState = { status: SEARCH_STATUS.idle, data: null, error: null }

// Drives the idle/loading/success/empty/error state machine for a search request.
// Cancels the previous in-flight request whenever a new search starts or the hook unmounts.
export function useSearch() {
  const [state, setState] = useState(initialState)
  const abortControllerRef = useRef(null)

  const search = useCallback(async (params) => {
    abortControllerRef.current?.abort()
    const controller = new window.AbortController()
    abortControllerRef.current = controller

    setState({ status: SEARCH_STATUS.loading, data: null, error: null })

    try {
      const result = await searchService(params, { signal: controller.signal })
      if (controller.signal.aborted) return undefined
      const hasResults = Array.isArray(result?.results) && result.results.length > 0
      setState({ status: hasResults ? SEARCH_STATUS.success : SEARCH_STATUS.empty, data: result, error: null })
      return result
    } catch (error) {
      if (error?.name === 'AbortError') return undefined
      const normalized = normalizeError(error)
      setState({ status: SEARCH_STATUS.error, data: null, error: normalized })
      throw normalized
    }
  }, [])

  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setState(initialState)
  }, [])

  useEffect(() => () => abortControllerRef.current?.abort(), [])

  return { ...state, search, reset }
}
