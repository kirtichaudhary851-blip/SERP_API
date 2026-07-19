import { APP_NAME } from '../../constants/app'

function Footer() {
  return <footer className="site-footer"><div className="container">© {new Date().getFullYear()} {APP_NAME}</div></footer>
}

export default Footer
