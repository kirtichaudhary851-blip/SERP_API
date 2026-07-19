const METHOD_TONES = { GET: 'success', POST: 'info', PUT: 'warning', PATCH: 'warning', DELETE: 'danger' }

function MethodBadge({ method }) {
  return <span className={`method-badge method-badge--${METHOD_TONES[method] || 'neutral'}`}>{method}</span>
}

export default MethodBadge
