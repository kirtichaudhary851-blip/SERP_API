import { useState } from 'react'
import CodeBlock from '../../components/docs/CodeBlock'
import { DEVICE_OPTIONS, RESULT_COUNT_OPTIONS } from '../../constants/searchConstants'
import endpoints from '../../mock/endpoints.json'
import countries from '../../mock/mockCountries.json'
import languages from '../../mock/mockLanguages.json'

const PLAYGROUND_DELAY_MS = 500

function ApiPlaygroundPage() {
  const [endpointId, setEndpointId] = useState(endpoints[0].id)
  const [query, setQuery] = useState('best developer tools')
  const [country, setCountry] = useState('us')
  const [language, setLanguage] = useState('en')
  const [device, setDevice] = useState('Desktop')
  const [resultCount, setResultCount] = useState('10')
  const [status, setStatus] = useState('idle')
  const [response, setResponse] = useState(null)

  const endpoint = endpoints.find((item) => item.id === endpointId)
  const isWebSearch = endpoint.id === 'web-search'

  const onExecute = (event) => {
    event.preventDefault()
    setStatus('loading')
    window.setTimeout(() => {
      const base = endpoint.exampleResponse
      const nextResponse = isWebSearch
        ? { ...base, query, country, language, results: base.results.slice(0, Number(resultCount)) }
        : base
      setResponse(nextResponse)
      setStatus('success')
    }, PLAYGROUND_DELAY_MS)
  }

  return (
    <section aria-labelledby="playground-heading">
      <header className="docs-page-header">
        <p className="eyebrow">API Playground</p>
        <h1 id="playground-heading">Try requests against mock responses.</h1>
        <p>Explore request shapes and response payloads locally — no live backend calls are made in this phase.</p>
      </header>

      <div className="playground-layout">
        <form className="playground-form" onSubmit={onExecute}>
          <label className="field">
            <span className="field__label">Endpoint</span>
            <select className="input" value={endpointId} onChange={(event) => setEndpointId(event.target.value)}>
              {endpoints.map((item) => <option key={item.id} value={item.id}>{item.method} {item.path}</option>)}
            </select>
          </label>

          {isWebSearch && (
            <>
              <label className="field"><span className="field__label">Query</span><input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search query" /></label>
              <label className="field"><span className="field__label">Country</span>
                <select className="input" value={country} onChange={(event) => setCountry(event.target.value)}>
                  {countries.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
                </select>
              </label>
              <label className="field"><span className="field__label">Language</span>
                <select className="input" value={language} onChange={(event) => setLanguage(event.target.value)}>
                  {languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
                </select>
              </label>
              <label className="field"><span className="field__label">Device</span>
                <select className="input" value={device} onChange={(event) => setDevice(event.target.value)}>
                  {DEVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="field"><span className="field__label">Result count</span>
                <select className="input" value={resultCount} onChange={(event) => setResultCount(event.target.value)}>
                  {RESULT_COUNT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </>
          )}

          <button className="button button--primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Executing…' : 'Execute'}
          </button>
        </form>

        <div className="playground-response" aria-live="polite">
          {status === 'idle' && <p className="playground-response__placeholder">Execute a request to see a mock response here.</p>}
          {status === 'loading' && <p className="playground-response__placeholder">Running mock request…</p>}
          {status === 'success' && <CodeBlock title="Response · 200 OK" code={JSON.stringify(response, null, 2)} language="json" />}
        </div>
      </div>
    </section>
  )
}

export default ApiPlaygroundPage
