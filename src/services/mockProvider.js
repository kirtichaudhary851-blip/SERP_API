import mockResults from '../mock/mockResults.json'

const MOCK_NETWORK_DELAY_MS = 550

// Simulates a network round trip against the local fixtures so the UI works end to end
// before the Python backend is available. Honors abort signals like a real request would.
export function fetchMockResults(params, signal) {
  const { query } = params

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (!query || !query.trim()) {
        resolve({ summary: { ...mockResults.summary, query: query || '', totalResults: '0 results' }, results: [] })
        return
      }
      resolve({ summary: { ...mockResults.summary, query }, results: mockResults.results })
    }, MOCK_NETWORK_DELAY_MS)

    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(Object.assign(new Error('The search was cancelled.'), { name: 'AbortError' }))
    })
  })
}
