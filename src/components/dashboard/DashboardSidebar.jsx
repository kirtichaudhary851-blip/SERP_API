import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../../constants/app'
import { DASHBOARD_NAV } from '../../constants/dashboardNav'
import { ROUTES } from '../../constants/routes'

function DashboardSidebar({ open, onClose }) {
  return (
    <>
      {open && <button type="button" className="dashboard-sidebar-backdrop" aria-label="Close sidebar" onClick={onClose} />}
      <aside className={`dashboard-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard navigation">
        <Link className="dashboard-sidebar__brand" to={ROUTES.dashboard} onClick={onClose}>
          <span aria-hidden="true">⌁</span> {APP_NAME}
        </Link>
        <nav>
          <ul>
            {DASHBOARD_NAV.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => `dashboard-sidebar__link ${isActive ? 'is-active' : ''}`}
                >
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default DashboardSidebar
