import CodeTabs from '../../components/docs/CodeTabs'
import MethodBadge from '../../components/docs/MethodBadge'
import endpoints from '../../mock/endpoints.json'
import sdkExamples from '../../mock/sdkExamples.json'

function SdkExamplesPage() {
  return (
    <section aria-labelledby="sdk-heading">
      <header className="docs-page-header">
        <p className="eyebrow">SDK Examples</p>
        <h1 id="sdk-heading">Call the API from your language of choice.</h1>
        <p>Copy-paste starter snippets for cURL, JavaScript, Python, and Node.js.</p>
      </header>

      <div className="sdk-examples-list">
        {endpoints.map((endpoint) => (
          <article className="sdk-example-card" key={endpoint.id}>
            <div className="sdk-example-card__heading">
              <MethodBadge method={endpoint.method} />
              <code>{endpoint.path}</code>
              <span>{endpoint.summary}</span>
            </div>
            <CodeTabs examples={sdkExamples[endpoint.id]} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default SdkExamplesPage
