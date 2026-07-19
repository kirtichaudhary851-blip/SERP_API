import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useToast } from '../../hooks/useToast'

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const { showToast } = useToast()

  useClickOutside(containerRef, () => setOpen(false))
  useEscapeKey(() => setOpen(false), open)

  const onLogout = () => {
    setOpen(false)
    showToast('Logout is a placeholder in this preview', 'info')
  }

  return (
    <div className="profile-menu" ref={containerRef}>
      <button type="button" className="profile-menu__trigger" onClick={() => setOpen((value) => !value)} aria-haspopup="true" aria-expanded={open} aria-label="Open profile menu">
        <span className="profile-menu__avatar" aria-hidden="true">DV</span>
      </button>
      {open && (
        <div className="profile-menu__dropdown" role="menu" aria-label="Profile">
          <div className="profile-menu__header"><strong>Developer</strong><span>developer@example.com</span></div>
          <Link role="menuitem" to={ROUTES.dashboard} onClick={() => setOpen(false)}>Profile</Link>
          <Link role="menuitem" to={ROUTES.dashboardSettings} onClick={() => setOpen(false)}>Settings</Link>
          <Link role="menuitem" to={ROUTES.documentation} onClick={() => setOpen(false)}>Documentation</Link>
          <button role="menuitem" type="button" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
