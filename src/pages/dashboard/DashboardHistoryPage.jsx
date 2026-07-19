import { useMemo, useState } from 'react'
import Pagination from '../../components/common/Pagination'
import ConfirmDialog from '../../components/dashboard/ConfirmDialog'
import { SkeletonTable } from '../../components/dashboard/DashboardSkeletons'
import EmptyState from '../../components/dashboard/EmptyState'
import { HISTORY_PAGE_SIZE } from '../../config/dashboardConfig'
import { useDashboardHistory } from '../../hooks/useDashboardHistory'
import { useMockLoading } from '../../hooks/useMockLoading'
import { useToast } from '../../hooks/useToast'
import { countryName, languageName } from '../../utils/localeLookup'

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'query-asc', label: 'Query A–Z' },
]

function DashboardHistoryPage() {
  const isLoading = useMockLoading(500)
  const { history, removeEntry, clearAll } = useDashboardHistory()
  const { showToast } = useToast()
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [sort, setSort] = useState('date-desc')
  const [page, setPage] = useState(1)
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

  const availableCountries = useMemo(() => Array.from(new Set(history.map((item) => item.country))), [history])

  const filtered = useMemo(() => {
    let rows = history
    if (search.trim()) rows = rows.filter((item) => item.query.toLowerCase().includes(search.trim().toLowerCase()))
    if (countryFilter !== 'all') rows = rows.filter((item) => item.country === countryFilter)
    return [...rows].sort((a, b) => {
      if (sort === 'date-asc') return a.timestamp - b.timestamp
      if (sort === 'query-asc') return a.query.localeCompare(b.query)
      return b.timestamp - a.timestamp
    })
  }, [history, search, countryFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / HISTORY_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * HISTORY_PAGE_SIZE, currentPage * HISTORY_PAGE_SIZE)

  const onDeleteConfirm = () => {
    removeEntry(pendingDelete.timestamp)
    setPendingDelete(null)
    showToast('Search removed from history', 'success')
  }

  const onClearAllConfirm = () => {
    clearAll()
    setConfirmClearOpen(false)
    showToast('Search history cleared', 'success')
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="eyebrow">Search History</p>
        <h1>Everything you&apos;ve searched.</h1>
        <p>History is stored locally in this browser and mirrors what you search from the Search page.</p>
      </header>

      <div className="dashboard-toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search history…"
          value={search}
          onChange={(event) => { setSearch(event.target.value); setPage(1) }}
          aria-label="Search history"
        />
        <select className="input" value={countryFilter} onChange={(event) => { setCountryFilter(event.target.value); setPage(1) }} aria-label="Filter by country">
          <option value="all">All countries</option>
          {availableCountries.map((code) => <option key={code} value={code}>{countryName(code)}</option>)}
        </select>
        <select className="input" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort history">
          {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button type="button" className="button button--secondary" onClick={() => setConfirmClearOpen(true)} disabled={!history.length}>Clear all</button>
      </div>

      {isLoading ? <SkeletonTable rows={HISTORY_PAGE_SIZE} /> : filtered.length === 0 ? (
        <EmptyState
          icon="⟲"
          title="No history yet"
          description={history.length ? 'No entries match your filters.' : 'Run a search from the Search page to see it appear here.'}
        />
      ) : (
        <>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <caption className="sr-only">Search history</caption>
              <thead>
                <tr>
                  <th scope="col">Query</th>
                  <th scope="col">Country</th>
                  <th scope="col">Language</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((item) => (
                  <tr key={item.timestamp}>
                    <th scope="row">{item.query}</th>
                    <td>{countryName(item.country)}</td>
                    <td>{languageName(item.language)}</td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td><span className="badge badge--success">Completed</span></td>
                    <td>
                      <button type="button" className="dashboard-table__action" onClick={() => setPendingDelete(item)} aria-label={`Delete search for ${item.query}`}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} label="Table pages" />
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this search?"
        message="This entry will be permanently removed from your local search history."
        confirmLabel="Delete"
        onConfirm={onDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />
      <ConfirmDialog
        open={confirmClearOpen}
        title="Clear all history?"
        message="This will permanently remove every entry from your local search history."
        confirmLabel="Clear all"
        onConfirm={onClearAllConfirm}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  )
}

export default DashboardHistoryPage
