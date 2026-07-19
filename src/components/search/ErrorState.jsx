function ErrorState({ error, onRetry }) {
  const message = error?.message || 'Something went wrong. You can retry the search.'
  return (
    <section className="state-card" role="alert">
      <span aria-hidden="true">!</span>
      <h2>Something went wrong.</h2>
      <p>{message}</p>
      <button className="button button--primary" type="button" onClick={onRetry}>Retry</button>
    </section>
  )
}

export default ErrorState
