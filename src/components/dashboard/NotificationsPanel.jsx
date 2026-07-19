import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useNotifications } from '../../hooks/useNotifications'
import EmptyState from './EmptyState'

function NotificationsPanel() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications()

  useClickOutside(containerRef, () => setOpen(false))
  useEscapeKey(() => setOpen(false), open)

  return (
    <div className="notifications-panel" ref={containerRef}>
      <button
        type="button"
        className="dashboard-icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
      >
        <span aria-hidden="true">🔔</span>
        {unreadCount > 0 && <span className="notifications-panel__badge">{unreadCount}</span>}
      </button>
      {open && (
        <div className="notifications-panel__dropdown" role="menu" aria-label="Notifications">
          <div className="notifications-panel__header">
            <h3>Notifications</h3>
            <div>
              <button type="button" onClick={markAllRead}>Mark all read</button>
              <button type="button" onClick={clearAll}>Clear all</button>
            </div>
          </div>
          {notifications.length === 0 ? (
            <EmptyState icon="🔔" title="No notifications" description="You're all caught up." />
          ) : (
            <ul className="notifications-panel__list">
              {notifications.map((item) => (
                <li key={item.id} className={item.read ? '' : 'is-unread'}>
                  <strong>{item.title}</strong>
                  <p>{item.message}</p>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationsPanel
