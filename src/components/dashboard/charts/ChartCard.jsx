function ChartCard({ title, description, children }) {
  const label = description ? `${title}. ${description}` : title

  return (
    <article className="chart-card">
      <div className="chart-card__header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className="chart-card__body" role="img" aria-label={label}>
        {children}
      </div>
    </article>
  )
}

export default ChartCard
