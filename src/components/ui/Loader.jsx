function Loader({ label = 'Loading' }) {
  return <span className="loader" role="status" aria-label={label}><span className="sr-only">{label}</span></span>
}

export default Loader
