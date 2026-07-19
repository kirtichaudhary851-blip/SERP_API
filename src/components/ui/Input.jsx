function Input({ className = '', label, id, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      {label && <span className="field__label">{label}</span>}
      <input id={id} className={`input ${className}`.trim()} {...props} />
    </label>
  )
}

export default Input
