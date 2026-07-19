import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Pagination from '../components/common/Pagination'
import EmptyState from '../components/search/EmptyState'
import ErrorState from '../components/search/ErrorState'
import SearchCard from '../components/search/SearchCard'
import SearchFilters from '../components/search/SearchFilters'
import SkeletonCard from '../components/search/SkeletonCard'
import SummaryCard from '../components/search/SummaryCard'
import { ROUTES } from '../constants/routes'
import { DEBOUNCE_DELAY_MS } from '../config/appConfig'
import { DEFAULT_SEARCH_FILTERS, SEARCH_STATUS } from '../constants/searchConstants'
import { useDebounce } from '../hooks/useDebounce'
import { useSearch } from '../hooks/useSearch'
import { useSearchHistory } from '../hooks/useSearchHistory'
import { useToast } from '../hooks/useToast'
import countries from '../mock/mockCountries.json'
import languages from '../mock/mockLanguages.json'

function readFilters(searchParams) {
  return {
    country: searchParams.get('country') || DEFAULT_SEARCH_FILTERS.country,
    language: searchParams.get('language') || DEFAULT_SEARCH_FILTERS.language,
    device: searchParams.get('device') || DEFAULT_SEARCH_FILTERS.device,
    resultCount: searchParams.get('resultCount') || DEFAULT_SEARCH_FILTERS.resultCount,
  }
}

function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [filters, setFilters] = useState(() => readFilters(searchParams))
  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY_MS)
  const { status, data, error, search } = useSearch()
  const { addSearch } = useSearchHistory()
  const { showToast } = useToast()

  const onFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
    const nextParams = new window.URLSearchParams(searchParams)
    nextParams.set(name, value)
    setSearchParams(nextParams, { replace: true })
  }

  const executeSearch = (searchQuery, searchFilters) => {
    showToast('Search started', 'info')
    search({ query: searchQuery, ...searchFilters })
      .then((result) => {
        if (!result) return
        showToast('Search completed', 'success')
        addSearch({ query: searchQuery, ...searchFilters })
      })
      .catch((searchError) => {
        showToast(searchError?.message || 'Something went wrong while searching.', 'error')
      })
  }

  useEffect(() => {
    if (!query.trim()) return
    executeSearch(query, debouncedFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, debouncedFilters])

  const retry = () => executeSearch(query, debouncedFilters)

  const isLoading = status === SEARCH_STATUS.loading
  const hasQuery = Boolean(query.trim())

  const statusMessage = !hasQuery ? 'Awaiting a search'
    : isLoading ? 'Searching…'
    : status === SEARCH_STATUS.error ? 'Search failed'
    : status === SEARCH_STATUS.empty ? 'No results found'
    : status === SEARCH_STATUS.success ? `${data.results.length} organic results`
    : 'Organic results'

  return (
    <section className="results-page container">
      <div className="results-page-top">
        <div>
          <p className="eyebrow">Search results</p>
          <h1>{hasQuery ? `Results for "${query}"` : 'Results preview'}</h1>
        </div>
        <Link className="button button--secondary" to={ROUTES.search}>← New search</Link>
      </div>

      {status === SEARCH_STATUS.success && data?.summary && <SummaryCard summary={data.summary} />}

      <div className="results-layout">
        <SearchFilters values={filters} countries={countries} languages={languages} onChange={onFilterChange} disabled={isLoading} />
        <div className="results-list">
          <div className="results-list-heading">
            <p aria-live="polite">{statusMessage}</p>
          </div>
          {!hasQuery ? <EmptyState />
            : status === SEARCH_STATUS.error ? <ErrorState error={error} onRetry={retry} />
            : isLoading ? Array.from({ length: 4 }, (_, index) => <SkeletonCard key={index} />)
            : status === SEARCH_STATUS.empty ? <EmptyState query={query} />
            : status === SEARCH_STATUS.success ? <>{data.results.map((result) => <SearchCard key={result.position} result={result} />)}<Pagination label="Search result pages" /></>
            : null}
        </div>
      </div>
    </section>
  )
}

export default SearchResultsPage
