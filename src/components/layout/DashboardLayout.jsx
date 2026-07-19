import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ErrorBoundary from '../common/ErrorBoundary'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import DashboardTopbar from '../dashboard/DashboardTopbar'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="dashboard-shell">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <DashboardTopbar onToggleSidebar={() => setSidebarOpen((value) => !value)} />
        <main className="dashboard-content">
          <ErrorBoundary key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
