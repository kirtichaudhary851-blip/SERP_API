import { useCallback, useState } from 'react'
import notificationSeed from '../mock/notifications.json'

// In-memory only — notifications are explicitly mock data for this phase, not persisted.
export function useNotifications() {
  const [notifications, setNotifications] = useState(notificationSeed)

  const markAllRead = useCallback(() => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
  }, [])

  const clearAll = useCallback(() => setNotifications([]), [])

  const unreadCount = notifications.filter((item) => !item.read).length

  return { notifications, unreadCount, markAllRead, clearAll }
}
