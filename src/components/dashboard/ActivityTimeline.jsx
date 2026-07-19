const ICONS = { search: '⌕', settings: '⚙', saved: '★', history: '⟲' }

function ActivityTimeline({ items }) {
  if (!items.length) return null

  return (
    <ol className="activity-timeline">
      {items.map((item) => (
        <li className="activity-timeline__item" key={item.id}>
          <span className="activity-timeline__icon" aria-hidden="true">{ICONS[item.type] || '•'}</span>
          <div>
            <p>{item.message}</p>
            <span>{item.time}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ActivityTimeline
