function EmptyState({ icon = '◌', title, description, action }) {
  return (
    <div className="dashboard-empty-state">
      <span aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
