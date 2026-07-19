import { Link } from 'react-router-dom'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../constants/routes'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Link className="brand" to={ROUTES.home}><span className="brand-mark" aria-hidden="true">⌁</span>{APP_NAME}</Link><p>Search infrastructure, built for developers.</p></div>
        <div><h2>Explore</h2><Link to={ROUTES.home}>Home</Link><Link to={ROUTES.documentation}>API Docs</Link><Link to={ROUTES.about}>About</Link></div>
        <div><h2>Connect</h2><a href="https://github.com" target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a><a href="mailto:hello@example.com">Contact</a></div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {APP_NAME}. Built for the open web.</div>
    </footer>
  )
}

export default Footer
