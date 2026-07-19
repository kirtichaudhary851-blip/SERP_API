function ChangelogGroup({ label, tone, items }) {
  if (!items?.length) return null
  return (
    <div className="changelog-item__group">
      <span className={`badge badge--${tone}`}>{label}</span>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )
}

function ChangelogItem({ entry }) {
  return (
    <li className="changelog-item">
      <div className="changelog-item__marker" aria-hidden="true" />
      <div className="changelog-item__content">
        <div className="changelog-item__header">
          <span className="changelog-item__version">v{entry.version}</span>
          <time className="changelog-item__date" dateTime={entry.date}>{entry.date}</time>
        </div>
        <ChangelogGroup label="Features" tone="success" items={entry.features} />
        <ChangelogGroup label="Improvements" tone="info" items={entry.improvements} />
        <ChangelogGroup label="Bug fixes" tone="danger" items={entry.fixes} />
      </div>
    </li>
  )
}

export default ChangelogItem
