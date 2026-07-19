import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

function NotFoundPage() {
  return <main className="container page-placeholder"><h1>404</h1><p>The page you requested could not be found.</p><Link className="button button--primary" to={ROUTES.home}>Return home</Link></main>
}

export default NotFoundPage
