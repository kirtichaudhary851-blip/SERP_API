import { useState } from 'react'
import CodeBlock from './CodeBlock'
import CodeTabs from './CodeTabs'
import CopyButton from './CopyButton'
import MethodBadge from './MethodBadge'
import ParametersTable from './ParametersTable'

function EndpointCard({ endpoint, examples }) {
  const [expanded, setExpanded] = useState(true)
  const bodyId = `endpoint-body-${endpoint.id}`

  return (
    <article className="endpoint-card" id={endpoint.id}>
      <div className="endpoint-card__header">
        <button
          type="button"
          className="endpoint-card__toggle"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={bodyId}
        >
          <MethodBadge method={endpoint.method} />
          <code className="endpoint-card__path">{endpoint.path}</code>
          <span className="endpoint-card__summary">{endpoint.summary}</span>
          <span className="endpoint-card__chevron" aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        <CopyButton value={`${endpoint.method} ${endpoint.path}`} label="Copy path" />
      </div>

      {expanded && (
        <div className="endpoint-card__body" id={bodyId}>
          <p>{endpoint.description}</p>

          {endpoint.parameters.length > 0 && (
            <>
              <h3 className="endpoint-card__subheading">Parameters</h3>
              <ParametersTable parameters={endpoint.parameters} />
            </>
          )}

          {examples && (
            <>
              <h3 className="endpoint-card__subheading">Example request</h3>
              <CodeTabs examples={examples} />
            </>
          )}

          <h3 className="endpoint-card__subheading">Example response</h3>
          <CodeBlock code={JSON.stringify(endpoint.exampleResponse, null, 2)} language="json" title="200 OK" />
        </div>
      )}
    </article>
  )
}

export default EndpointCard
