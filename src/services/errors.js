export const ERROR_TYPES = Object.freeze({
  NETWORK: 'NETWORK',
  SERVER: 'SERVER',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN: 'UNKNOWN',
})

const DEFAULT_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Unable to reach the server. Check your connection and try again.',
  [ERROR_TYPES.SERVER]: 'The server ran into a problem handling this search. Please try again shortly.',
  [ERROR_TYPES.TIMEOUT]: 'The request took too long to respond. Please try again.',
  [ERROR_TYPES.UNKNOWN]: 'Something unexpected happened. Please try again.',
}

export class ApiError extends Error {
  constructor(type, message, status) {
    super(message || DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES[ERROR_TYPES.UNKNOWN])
    this.name = 'ApiError'
    this.type = type
    this.status = status
  }
}

// Converts fetch/runtime errors into an ApiError with a stable, user-facing message.
export function normalizeError(error) {
  if (error instanceof ApiError) return error
  if (error instanceof TypeError) return new ApiError(ERROR_TYPES.NETWORK)
  return new ApiError(ERROR_TYPES.UNKNOWN, error?.message)
}
