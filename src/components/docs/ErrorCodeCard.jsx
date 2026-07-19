function toneForCode(code) {
  if (code >= 500) return 'danger'
  if (code >= 400) return 'warning'
  return 'success'
}

function ErrorCodeCard({ error }) {
  return (
    <article className="error-card">
      <div className={`error-card__code error-card__code--${toneForCode(error.code)}`} aria-hidden="true">{error.code}</div>
      <div className="error-card__body">
        <h3>{error.code} {error.title}</h3>
        <p>{error.message}</p>
        <dl className="error-card__meta">
          <div><dt>Likely cause</dt><dd>{error.cause}</dd></div>
          <div><dt>Resolution</dt><dd>{error.resolution}</dd></div>
        </dl>
      </div>
    </article>
  )
}

export default ErrorCodeCard
