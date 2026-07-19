import { useEffect } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import CodeBlock from '../../components/docs/CodeBlock'
import EndpointCard from '../../components/docs/EndpointCard'
import ResourceCard from '../../components/docs/ResourceCard'
import { ROUTES } from '../../constants/routes'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import apiDocs from '../../mock/apiDocs.json'
import endpoints from '../../mock/endpoints.json'
import sdkExamples from '../../mock/sdkExamples.json'

const SECTION_IDS = [
  'introduction', 'base-url', 'authentication', 'endpoints',
  'rate-limits', 'status-codes', 'quick-start', 'pagination', 'localization', 'best-practices',
]

const RESOURCES = [
  { icon: '▶', title: 'Quick Start', description: 'Make your first request in under five minutes.', hash: '#quick-start' },
  { icon: '⚿', title: 'Authentication', description: 'How API keys will be sent once auth ships.', hash: '#authentication' },
  { icon: '◫', title: 'Pagination', description: 'Move through large result sets with num and page.', hash: '#pagination' },
  { icon: '🌐', title: 'Localization', description: 'Return results for a specific country and language.', hash: '#localization' },
  { icon: '⧗', title: 'Rate Limits', description: 'Understand plan quotas and burst limits.', hash: '#rate-limits' },
  { icon: '✓', title: 'Best Practices', description: 'Recommendations for reliable integrations.', hash: '#best-practices' },
]

function ApiDocumentationPage() {
  const { setActiveSection } = useOutletContext()
  const activeId = useScrollSpy(SECTION_IDS)
  const location = useLocation()

  useEffect(() => { setActiveSection(activeId) }, [activeId, setActiveSection])

  useEffect(() => {
    if (!location.hash) return
    const element = document.getElementById(location.hash.slice(1))
    element?.scrollIntoView({ block: 'start' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="docs-page">
      <header className="docs-hero">
        <p className="eyebrow">Developer Portal</p>
        <h1>Custom SERP API Documentation</h1>
        <p>Everything you need to integrate structured search results into your product — endpoints, parameters, response shapes, and working code examples.</p>
        <div className="docs-hero__actions">
          <a className="button button--primary" href="#endpoints">Browse endpoints</a>
          <Link className="button button--secondary" to={ROUTES.docsPlayground}>Try the playground</Link>
        </div>
      </header>

      <section id="introduction" className="docs-section">
        <h2>Introduction</h2>
        <p>The Custom SERP API returns structured search results as JSON — no HTML scraping required on your end. This reference documents the request/response contract the Python backend implements. The examples on this page reflect that contract exactly, so integration work can begin before the backend is live.</p>
      </section>

      <section id="base-url" className="docs-section">
        <h2>Base URL</h2>
        <p>All requests are made against a single base URL. Every endpoint path below is relative to it.</p>
        <CodeBlock code={apiDocs.baseUrl} language="bash" title="Base URL" />
      </section>

      <section id="authentication" className="docs-section">
        <h2>Authentication</h2>
        <p className="docs-notice" role="note">{apiDocs.authentication.notice}</p>
        <CodeBlock code={apiDocs.authentication.header} language="bash" title="Header" />
      </section>

      <section id="endpoints" className="docs-section">
        <h2>Available Endpoints</h2>
        <p>Each card includes its parameters, a request example in four languages, and a sample response.</p>
        <div className="endpoint-card-list">
          {endpoints.map((endpoint) => (
            <EndpointCard key={endpoint.id} endpoint={endpoint} examples={sdkExamples[endpoint.id]} />
          ))}
        </div>
      </section>

      <section id="rate-limits" className="docs-section">
        <h2>Rate Limits</h2>
        <p>Limits apply per API key and reset on a rolling basis.</p>
        <div className="rate-limit-table-wrapper">
          <table className="rate-limit-table">
            <thead><tr><th scope="col">Plan</th><th scope="col">Daily limit</th><th scope="col">Burst limit</th></tr></thead>
            <tbody>
              {apiDocs.rateLimits.map((tier) => (
                <tr key={tier.plan}><th scope="row">{tier.plan}</th><td>{tier.limit}</td><td>{tier.burst}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="status-codes" className="docs-section">
        <h2>Status Codes</h2>
        <ul className="status-code-list">
          {apiDocs.statusCodes.map((status) => (
            <li key={status.code}><code>{status.code}</code> <strong>{status.label}</strong> — {status.description}</li>
          ))}
        </ul>
        <p>See the <Link to={ROUTES.docsErrorCodes}>Error Codes</Link> page for detailed causes and resolutions.</p>
      </section>

      <section id="quick-start" className="docs-section">
        <h2>Quick Start</h2>
        <ol className="docs-steps">
          <li>Grab a request example from the <a href="#endpoints">Endpoints</a> section or the <Link to={ROUTES.docsSdkExamples}>SDK Examples</Link> page.</li>
          <li>Swap in your query, country, and language parameters.</li>
          <li>Run it against the <Link to={ROUTES.docsPlayground}>API Playground</Link> to preview the response shape locally before the backend is live.</li>
        </ol>
      </section>

      <section id="pagination" className="docs-section">
        <h2>Pagination</h2>
        <p>Use <code>num</code> to control page size (10, 20, or 50) and <code>page</code> to move through additional pages of the same query. Responses do not currently include a total page count — plan for cursor-less, offset-based pagination.</p>
      </section>

      <section id="localization" className="docs-section">
        <h2>Localization</h2>
        <p>Pass <code>country</code> and <code>language</code> on the Web Search endpoint to localize results. Both accept standard two-letter codes (for example <code>us</code>/<code>en</code> or <code>in</code>/<code>hi</code>).</p>
      </section>

      <section id="best-practices" className="docs-section">
        <h2>Best Practices</h2>
        <ul>
          <li>Cache identical queries client-side to stay within rate limits.</li>
          <li>Always handle the documented error shape rather than assuming a 200 response.</li>
          <li>Set a request timeout and retry with backoff on 429 and 500 responses.</li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>Developer Resources</h2>
        <div className="resource-card-grid">
          {RESOURCES.map((resource) => <ResourceCard key={resource.title} icon={resource.icon} title={resource.title} description={resource.description} href={resource.hash} />)}
        </div>
      </section>
    </div>
  )
}

export default ApiDocumentationPage
