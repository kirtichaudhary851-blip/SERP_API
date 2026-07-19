function StatCard({ icon, label, value, delta, trend }) {
  return (
    <article className="stat-card">
      <div className="stat-card__icon" aria-hidden="true">{icon}</div>
      <div className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
        {delta && (
          <span className={`stat-card__delta stat-card__delta--${trend}`}>
            <span aria-hidden="true">{trend === 'up' ? '▲' : '▼'}</span> {delta}
          </span>
        )}
      </div>
    </article>
  )
}

export default StatCard
