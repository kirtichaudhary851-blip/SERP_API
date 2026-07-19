// Shared by the search results preview and the dashboard's data tables.
// Passing onPageChange makes it interactive; omitting it renders a static preview
// (buttons still show state, but do nothing) for read-only/demo contexts.
function Pagination({ currentPage = 1, totalPages = 3, onPageChange, label = 'Pagination' }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label={label}>
      <button type="button" onClick={() => onPageChange?.(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? 'is-current' : ''}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
      <button type="button" onClick={() => onPageChange?.(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
    </nav>
  )
}

export default Pagination
