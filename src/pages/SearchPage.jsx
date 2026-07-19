import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecentSearches from '../components/search/RecentSearches'
import SearchBar from '../components/search/SearchBar'
import { ROUTES } from '../constants/routes'
import { DEFAULT_SEARCH_FILTERS } from '../constants/searchConstants'
import { useSearchHistory } from '../hooks/useSearchHistory'
import { useToast } from '../hooks/useToast'
import countries from '../mock/mockCountries.json'
import languages from '../mock/mockLanguages.json'

const defaultValues = { query: '', ...DEFAULT_SEARCH_FILTERS }

function SearchPage() {
  const [values, setValues] = useState(defaultValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { history, clearHistory } = useSearchHistory()
  const { showToast } = useToast()

  const onChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const onClear = () => setValues(defaultValues)

  const runSearch = (searchValues) => {
    setIsSubmitting(true)
    const params = new window.URLSearchParams(Object.entries(searchValues).filter(([, value]) => value !== ''))
    navigate(`${ROUTES.results}?${params.toString()}`)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!values.query.trim()) return
    runSearch(values)
  }

  const onSelectRecent = (entry) => {
    const nextValues = { ...defaultValues, ...entry, query: entry.query }
    setValues(nextValues)
    runSearch(nextValues)
  }

  const onClearHistory = () => {
    clearHistory()
    showToast('Search history cleared', 'info')
  }

  return (
    <section className="search-page container">
      <div className="search-page-intro">
        <p className="eyebrow">Search workspace</p>
        <h1>Explore search, your way.</h1>
        <p>Configure a search request using local UI controls. Results come from the live API when it&apos;s configured, and fall back to sample data otherwise.</p>
      </div>
      <div className="search-workspace">
        <SearchBar values={values} countries={countries} languages={languages} onChange={onChange} onSubmit={onSubmit} onClear={onClear} disabled={isSubmitting} />
        <p className="search-disclaimer">Search requests use the configured backend when available, and fall back to local sample data otherwise.</p>
      </div>
      <RecentSearches history={history} onSelect={onSelectRecent} onClear={onClearHistory} />
    </section>
  )
}

export default SearchPage
