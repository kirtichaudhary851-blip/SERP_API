function ResourceCard({ icon, title, description, href }) {
  return (
    <a className="resource-card" href={href}>
      <span className="resource-card__icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  )
}

export default ResourceCard
