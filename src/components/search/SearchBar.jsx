import { DEVICE_OPTIONS, RESULT_COUNT_OPTIONS, SAFE_SEARCH_OPTIONS } from '../../constants/searchConstants'
import Button from '../ui/Button'
import Input from '../ui/Input'

function SearchBar({ values, countries, languages, onChange, onSubmit, onClear, disabled = false }) {
  return <form className="search-controls" onSubmit={onSubmit} aria-busy={disabled}>
    <Input id="query" label="Search query" name="query" value={values.query} onChange={onChange} placeholder="What are you looking for?" disabled={disabled} required />
    <label className="field"><span className="field__label">Country</span><select className="input" name="country" value={values.country} onChange={onChange} disabled={disabled}>{countries.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
    <label className="field"><span className="field__label">Language</span><select className="input" name="language" value={values.language} onChange={onChange} disabled={disabled}>{languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
    <label className="field"><span className="field__label">Device</span><select className="input" name="device" value={values.device} onChange={onChange} disabled={disabled}>{DEVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
    <label className="field"><span className="field__label">Results</span><select className="input" name="resultCount" value={values.resultCount} onChange={onChange} disabled={disabled}>{RESULT_COUNT_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
    <label className="field"><span className="field__label">Safe search</span><select className="input" name="safeSearch" value={values.safeSearch} onChange={onChange} disabled={disabled}>{SAFE_SEARCH_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
    <div className="search-control-actions"><Button type="submit" disabled={disabled}>{disabled ? 'Searching…' : <>Search <span aria-hidden="true">→</span></>}</Button><Button type="button" variant="secondary" onClick={onClear} disabled={disabled}>Clear</Button></div>
  </form>
}

export default SearchBar
