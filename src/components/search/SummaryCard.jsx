function SummaryCard({ summary }) { return <section className="summary-card" aria-label="Search summary"><div><span>Search query</span><strong>“{summary.query}”</strong></div><div><span>Total results</span><strong>{summary.totalResults}</strong></div><div><span>Search time</span><strong>{summary.searchTime}</strong></div><div><span>Location</span><strong>{summary.country} · {summary.language}</strong></div></section> }

export default SummaryCard
