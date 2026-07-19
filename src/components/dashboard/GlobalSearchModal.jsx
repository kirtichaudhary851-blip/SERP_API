import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import Modal from './Modal'

const CATEGORIES = [
  { label: 'History', items: ['best developer tools', 'python web scraping'], to: ROUTES.dashboardHistory },
  { label: 'Saved Searches', items: ['React vs Vue comparisons'], to: ROUTES.dashboardSaved },
  { label: 'Documentation', items: ['Authentication', 'Rate Limits'], to: ROUTES.documentation },
  { label: 'Settings', items: ['Theme', 'Default Country'], to: ROUTES.dashboardSettings },
]

function GlobalSearchModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Search everything">
      <form className="global-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
        <input type="search" className="input" placeholder="Search history, saved searches, docs, settings…" aria-label="Search everything" />
      </form>
      <div className="global-search-results">
        {CATEGORIES.map((category) => (
          <div className="global-search-results__group" key={category.label}>
            <div className="global-search-results__heading">
              <span>{category.label}</span>
              <Link to={category.to} onClick={onClose}>View all</Link>
            </div>
            <ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="global-search-note">This is a UI preview — results above are static examples, not a live search.</p>
    </Modal>
  )
}

export default GlobalSearchModal
