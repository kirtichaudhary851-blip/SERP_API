import { Link } from 'react-router-dom'
import ArrowIcon from '../components/common/ArrowIcon'
import SectionHeading from '../components/common/SectionHeading'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { ROUTES } from '../constants/routes'

const features = [
  ['⚡', 'Fast Search', 'A focused interface designed to make every query feel immediate.'],
  ['🌍', 'Multi-country Support', 'Prepare searches across regions with flexible country controls.'],
  ['{}', 'Clean JSON Response', 'A developer-first response shape, ready for your next build.'],
  ['◫', 'Pagination Ready', 'A clear foundation for exploring more results when you need them.'],
  ['⌁', 'Secure API', 'A structure designed with dependable integrations in mind.'],
  ['</>', 'Developer Friendly', 'Simple primitives, clear docs, and an experience that stays out of your way.'],
]

const steps = [
  ['01', 'Enter search query', 'Start with a query and select the right locale for your use case.'],
  ['02', 'Frontend prepares request', 'Your application forms a consistent request using the selected inputs.'],
  ['03', 'Python backend processes', 'Your backend retrieves and normalizes the relevant search information.'],
  ['04', 'Receive JSON results', 'Use structured results wherever your product needs them next.'],
]

const technologies = ['⚛ React', 'ϟ Vite', '⌘ Python', '⚡ FastAPI', '⌕ BeautifulSoup', '▶ Playwright', '◇ Docker', '◉ GitHub']

function HomePage() {
  return (
    <div id="home">
      <section className="hero container">
        <div className="hero-copy">
          <Badge tone="success">Developer-first search infrastructure</Badge>
          <h1>Build your own <span>Google Search API.</span></h1>
          <p>Bring reliable search data into your product with a clean, developer-focused Custom SERP API foundation.</p>
          <div className="hero-actions"><Link className="button button--primary" to="#search-preview">Get started <ArrowIcon /></Link><Link className="button button--secondary" to={ROUTES.documentation}>View documentation</Link></div>
          <div className="hero-note"><span className="status-dot" aria-hidden="true"></span>Designed for modern developer workflows</div>
        </div>
        <div className="hero-visual" aria-label="Search response illustration">
          <div className="orb orb--one"></div><div className="orb orb--two"></div>
          <div className="terminal-card"><div className="terminal-bar"><span></span><span></span><span></span><p>search-response.json</p></div><pre><code><i>{'{'}</i>{'\n'}  <b>"query"</b>: <em>"best dev tools"</em>,{'\n'}  <b>"results"</b>: [<i>{'{'}</i> ... <i>{'}'}</i>],{'\n'}  <b>"status"</b>: <strong>200</strong>{'\n'}<i>{'}'}</i></code></pre></div>
          <div className="float-chip float-chip--top">⚡ Fast response</div><div className="float-chip float-chip--bottom">✓ JSON ready</div>
        </div>
      </section>

      <section id="search-preview" className="search-preview-section"><div className="container">
        <div className="search-panel"><div><p className="eyebrow">Try the interface</p><h2>One search interface. Endless possibilities.</h2></div><form className="search-form" onSubmit={(event) => event.preventDefault()}><Input id="search-query" label="Search query" placeholder="Try a search query..." /><label className="field"><span className="field__label">Country</span><select className="input" defaultValue="us"><option value="us">United States</option><option value="in">India</option><option value="gb">United Kingdom</option></select></label><label className="field"><span className="field__label">Language</span><select className="input" defaultValue="en"><option value="en">English</option><option value="hi">Hindi</option><option value="es">Spanish</option></select></label><Button type="submit">Search <ArrowIcon /></Button></form><p className="form-note">Preview only — no request will be sent.</p></div>
      </div></section>

      <section className="section container" id="features"><SectionHeading eyebrow="Why Custom SERP API" title="A better foundation for search." description="Everything you need to start building a search-powered experience, without unnecessary complexity." />
        <div className="feature-grid">{features.map(([icon, title, description]) => <Card className="feature-card" key={title}><span className="feature-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p></Card>)}</div>
      </section>

      <section className="section workflow-section"><div className="container"><SectionHeading eyebrow="The workflow" title="From query to structured results." description="A straightforward path that makes search data feel native to your application." />
        <ol className="timeline">{steps.map(([number, title, description]) => <li key={number} className="timeline-item"><span className="timeline-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      </div></section>

      <section className="section container"><SectionHeading eyebrow="Built with proven tools" title="A stack developers trust." />
        <div className="tech-grid">{technologies.map((technology) => <div className="tech-card" key={technology}>{technology}</div>)}</div>
      </section>

      <section className="section container"><div className="stats-grid"><div><strong>&lt; 1s</strong><span>Fast response</span></div><div><strong>99.9%</strong><span>Uptime target</span></div><div><strong>DX</strong><span>Developer friendly</span></div><div><strong>REST</strong><span>API architecture</span></div></div></section>

      <section className="container cta-section"><div><p className="eyebrow">Start building today</p><h2>Ready to build your own SERP API?</h2><p>Give your next project a powerful search foundation.</p></div><div className="cta-actions"><a className="button button--light" href="#search-preview">Get started <ArrowIcon /></a><Link className="button button--outline-light" to={ROUTES.documentation}>Documentation</Link></div></section>
    </div>
  )
}

export default HomePage
