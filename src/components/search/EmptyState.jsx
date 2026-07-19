import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

function EmptyState({ query }) {
  return (
    <section className="state-card">
      <span aria-hidden="true">⌕</span>
      <h2>{query ? 'No results found' : 'No search results yet'}</h2>
      <p>{query ? `We couldn't find any results for "${query}". Try a different search.` : 'Run a search to see structured results displayed here.'}</p>
      {!query && <Link className="button button--primary" to={ROUTES.search}>Open search</Link>}
    </section>
  )
}

export default EmptyState
