import { useCallback, useRef, useState } from 'react'
import { TOAST_DURATION_MS } from '../config/appConfig'
import { ToastContext } from './ToastContext'

let nextToastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const showToast = useCallback((message, tone = 'info') => {
    const id = ++nextToastId
    setToasts((current) => [...current, { id, message, tone }])
    timers.current.set(id, window.setTimeout(() => dismissToast(id), TOAST_DURATION_MS))
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}
