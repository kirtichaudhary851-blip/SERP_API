// Suspense fallback shown while a lazily-loaded route chunk is downloading.
function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}

export default PageLoader
