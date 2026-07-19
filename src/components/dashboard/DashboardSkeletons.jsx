export function SkeletonStatCard() {
  return <div className="dashboard-skeleton-card" aria-hidden="true"><span /><b /><i /></div>
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="dashboard-skeleton-table" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div className="dashboard-skeleton-table__row" key={index}><span /><span /><span /><span /><span /></div>
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return <div className="dashboard-skeleton-chart" aria-hidden="true" />
}
