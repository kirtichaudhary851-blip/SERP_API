import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../constants/routes'

const navigation = [
  { label: 'Home', to: ROUTES.home },
  { label: 'API Docs', to: ROUTES.documentation },
  { label: 'About', to: ROUTES.about },
  { label: 'Search', to: ROUTES.search },
  { label: 'Dashboard', to: ROUTES.dashboard },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="Main navigation">
        <Link className="brand" to={ROUTES.home} onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">⌁</span>
          {APP_NAME}
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
          <span className="sr-only">Toggle navigation menu</span><span aria-hidden="true">☰</span>
        </button>
        <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map(({ label, to }) => (
            <NavLink key={to} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`} to={to} onClick={closeMenu}>{label}</NavLink>
          ))}
          <a className="nav-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <button className="theme-button" type="button" aria-label="Theme controls are coming soon" title="Theme controls are coming soon">
            <span aria-hidden="true">◐</span><span className="theme-button__label">Theme</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
