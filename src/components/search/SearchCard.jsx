function SearchCard({ result }) {
  const hostname = result.url.replace(/^https?:\/\//, '').split('/')[0]
  return <article className="result-card"><div className="result-position" aria-label={`Result ${result.position}`}>{result.position}</div><div className="result-favicon" aria-hidden="true">{hostname[0].toUpperCase()}</div><div className="result-content"><p className="result-breadcrumb">{result.breadcrumb}</p><a className="result-title" href={result.url} target="_blank" rel="noreferrer">{result.title}<span className="sr-only"> (opens in a new tab)</span></a><p className="result-url">{result.url}</p><p className="result-description">{result.description}</p></div></article>
}

export default SearchCard
