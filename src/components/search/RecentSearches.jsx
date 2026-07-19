function RecentSearches({ history, onSelect, onClear }) {
  if (!history.length) return null

  return (
    <div className="recent-searches" aria-label="Recent searches">
      <div className="recent-searches__heading">
        <span>Recent searches</span>
        <button className="recent-searches__clear" type="button" onClick={onClear}>Clear history</button>
      </div>
      <ul className="recent-searches__list">
        {history.map((entry) => (
          <li key={entry.timestamp}>
            <button type="button" onClick={() => onSelect(entry)}>{entry.query}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentSearches
