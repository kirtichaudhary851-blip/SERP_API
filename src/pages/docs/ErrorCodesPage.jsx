import ErrorCodeCard from '../../components/docs/ErrorCodeCard'
import errorCodes from '../../mock/errorCodes.json'

function ErrorCodesPage() {
  return (
    <section aria-labelledby="errors-heading">
      <header className="docs-page-header">
        <p className="eyebrow">Error Codes</p>
        <h1 id="errors-heading">Understand and resolve API errors.</h1>
        <p>Every error response includes a status code and message shaped like the examples below.</p>
      </header>

      <div className="error-codes-grid">
        {errorCodes.map((error) => <ErrorCodeCard key={error.code} error={error} />)}
      </div>
    </section>
  )
}

export default ErrorCodesPage
