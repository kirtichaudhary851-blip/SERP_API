import { useEffect, useState } from 'react'
import GlobalSearchModal from './GlobalSearchModal'
import NotificationsPanel from './NotificationsPanel'
import ProfileMenu from './ProfileMenu'

function DashboardTopbar({ onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="dashboard-topbar">
      <button type="button" className="dashboard-topbar__menu" onClick={onToggleSidebar} aria-label="Toggle navigation">
        <span aria-hidden="true">☰</span>
      </button>
      <button type="button" className="dashboard-topbar__search" onClick={() => setSearchOpen(true)}>
        <span aria-hidden="true">⌕</span>
        <span className="dashboard-topbar__search-label">Search dashboard…</span>
        <kbd>Ctrl K</kbd>
      </button>
      <div className="dashboard-topbar__actions">
        <NotificationsPanel />
        <ProfileMenu />
      </div>
      <GlobalSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

export default DashboardTopbar
