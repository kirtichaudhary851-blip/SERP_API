import { Outlet, useLocation } from 'react-router-dom'
import ErrorBoundary from '../common/ErrorBoundary'
import Footer from './Footer'
import Navbar from './Navbar'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
