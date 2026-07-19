import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { DOCS_NAV } from '../../constants/docsNav'
import { ROUTES } from '../../constants/routes'

function DocsSidebar({ activeSection = '' }) {
  const location = useLocation()
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const onDocsPage = location.pathname === ROUTES.documentation

  const toggleGroup = (id) => setCollapsedGroups((current) => ({ ...current, [id]: !current[id] }))

  return (
    <nav className="docs-sidebar" aria-label="Documentation navigation">
      {DOCS_NAV.map((group) => {
        const isCollapsed = collapsedGroups[group.id]
        return (
          <div className="docs-sidebar__group" key={group.id}>
            <button
              type="button"
              className="docs-sidebar__group-toggle"
              aria-expanded={!isCollapsed}
              onClick={() => toggleGroup(group.id)}
            >
              <span>{group.title}</span>
              <span aria-hidden="true">{isCollapsed ? '+' : '−'}</span>
            </button>
            {!isCollapsed && (
              <ul>
                {group.items.map((item) => {
                  const isHashLink = Boolean(item.hash)
                  const isActive = isHashLink
                    ? onDocsPage && activeSection === item.hash.slice(1)
                    : location.pathname === item.to

                  return (
                    <li key={item.label}>
                      {isHashLink && onDocsPage ? (
                        <a className={`docs-sidebar__link ${isActive ? 'is-active' : ''}`} href={item.hash} aria-current={isActive ? 'true' : undefined}>
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          className={`docs-sidebar__link ${isActive ? 'is-active' : ''}`}
                          to={isHashLink ? `${ROUTES.documentation}${item.hash}` : item.to}
                          aria-current={isActive ? 'true' : undefined}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default DocsSidebar
