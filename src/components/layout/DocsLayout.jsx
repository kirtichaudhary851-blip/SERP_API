import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ErrorBoundary from '../common/ErrorBoundary'
import DocsSearchBox from '../docs/DocsSearchBox'
import DocsSidebar from '../docs/DocsSidebar'

function DocsLayout() {
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  return (
    <div className="docs-shell container">
      <aside className="docs-sidebar-wrapper">
        <DocsSearchBox />
        <DocsSidebar activeSection={activeSection} />
      </aside>
      <div className="docs-content">
        <ErrorBoundary key={location.pathname}>
          <Outlet context={{ setActiveSection }} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default DocsLayout
