import { DEVICE_OPTIONS, RESULT_COUNT_OPTIONS } from '../../constants/searchConstants'

function SearchFilters({ values, countries, languages, onChange, disabled = false }) {
  return (
    <aside className="filter-sidebar" aria-label="Search filters" aria-busy={disabled}>
      <div className="filter-heading"><h2>Filters</h2><span>{disabled ? 'Updating…' : 'Live'}</span></div>
      <label className="field"><span className="field__label">Country</span><select className="input" name="country" value={values.country} onChange={onChange} disabled={disabled}>{countries.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
      <label className="field"><span className="field__label">Language</span><select className="input" name="language" value={values.language} onChange={onChange} disabled={disabled}>{languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
      <label className="field"><span className="field__label">Device</span><select className="input" name="device" value={values.device} onChange={onChange} disabled={disabled}>{DEVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label className="field"><span className="field__label">Result count</span><select className="input" name="resultCount" value={values.resultCount} onChange={onChange} disabled={disabled}>{RESULT_COUNT_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
    </aside>
  )
}

export default SearchFilters
