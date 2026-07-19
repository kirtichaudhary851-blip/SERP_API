function Toast({ message, tone = 'info', onDismiss }) {
  return (
    <div className={`toast toast--${tone}`} role="status">
      <span>{message}</span>
      <button className="toast__close" type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button>
    </div>
  )
}

export default Toast
