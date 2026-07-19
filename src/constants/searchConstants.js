export const SEARCH_STATUS = Object.freeze({
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  empty: 'empty',
  error: 'error',
})

export const DEFAULT_SEARCH_FILTERS = Object.freeze({
  country: 'us',
  language: 'en',
  device: 'Desktop',
  resultCount: '10',
  safeSearch: 'Moderate',
})

export const RESULT_COUNT_OPTIONS = Object.freeze(['10', '20', '50'])
export const DEVICE_OPTIONS = Object.freeze(['Desktop', 'Mobile'])
export const SAFE_SEARCH_OPTIONS = Object.freeze(['Moderate', 'Strict', 'Off'])
