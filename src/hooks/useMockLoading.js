import { useEffect, useState } from 'react'

// Simulates a fetch delay so dashboard pages can demonstrate skeleton states
// without a real backend to wait on.
export function useMockLoading(delayMs = 500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return isLoading
}
