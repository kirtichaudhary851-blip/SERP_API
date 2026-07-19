import { NavLink } from 'react-router-dom'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../constants/routes'

const navigation = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Documentation', to: ROUTES.documentation },
  { label: 'About', to: ROUTES.about },
]

function Navbar() {
  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="Main navigation">
        <NavLink className="brand" to={ROUTES.home}>{APP_NAME}</NavLink>
        <div className="nav-links">
          {navigation.map(({ label, to }) => (
            <NavLink key={to} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`} to={to}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
