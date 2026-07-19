import { useState } from 'react'
import ConfirmDialog from '../../components/dashboard/ConfirmDialog'
import { SkeletonTable } from '../../components/dashboard/DashboardSkeletons'
import EmptyState from '../../components/dashboard/EmptyState'
import Modal from '../../components/dashboard/Modal'
import { useMockLoading } from '../../hooks/useMockLoading'
import { useSavedSearches } from '../../hooks/useSavedSearches'
import { useToast } from '../../hooks/useToast'
import { countryName, languageName } from '../../utils/localeLookup'
import countries from '../../mock/mockCountries.json'
import languages from '../../mock/mockLanguages.json'

const emptyForm = { query: '', country: 'us', language: 'en' }

function SavedSearchesPage() {
  const isLoading = useMockLoading(500)
  const { savedSearches, saveSearch, renameSearch, removeSearch, toggleFavorite } = useSavedSearches()
  const { showToast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [renameTarget, setRenameTarget] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const sorted = [...savedSearches].sort((a, b) => Number(b.favorite) - Number(a.favorite) || b.createdAt - a.createdAt)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!form.query.trim()) return
    saveSearch(form)
    setForm(emptyForm)
    showToast('Saved search created', 'success')
  }

  const onRenameOpen = (item) => { setRenameTarget(item); setRenameValue(item.name) }

  const onRenameConfirm = (event) => {
    event.preventDefault()
    renameSearch(renameTarget.id, renameValue)
    setRenameTarget(null)
    showToast('Saved search renamed', 'success')
  }

  const onDeleteConfirm = () => {
    removeSearch(deleteTarget.id)
    setDeleteTarget(null)
    showToast('Saved search deleted', 'success')
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="eyebrow">Saved Searches</p>
        <h1>Keep your favorite queries handy.</h1>
        <p>Saved searches are stored locally in this browser.</p>
      </header>

      <form className="saved-search-form" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Query to save…"
          value={form.query}
          onChange={(event) => setForm((current) => ({ ...current, query: event.target.value }))}
          aria-label="Query to save"
        />
        <select className="input" value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} aria-label="Country">
          {countries.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
        <select className="input" value={form.language} onChange={(event) => setForm((current) => ({ ...current, language: event.target.value }))} aria-label="Language">
          {languages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
        <button className="button button--primary" type="submit">Save search</button>
      </form>

      {isLoading ? <SkeletonTable rows={3} /> : sorted.length === 0 ? (
        <EmptyState icon="★" title="No saved searches yet" description="Save a query above to find it here later." />
      ) : (
        <div className="saved-search-grid">
          {sorted.map((item) => (
            <article className="saved-search-card" key={item.id}>
              <div className="saved-search-card__header">
                <h3>{item.name}</h3>
                <button
                  type="button"
                  className={`favorite-toggle ${item.favorite ? 'is-favorite' : ''}`}
                  onClick={() => toggleFavorite(item.id)}
                  aria-pressed={item.favorite}
                  aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  ★
                </button>
              </div>
              <p>{countryName(item.country)} · {languageName(item.language)}</p>
              <div className="saved-search-card__actions">
                <button type="button" onClick={() => onRenameOpen(item)}>Rename</button>
                <button type="button" onClick={() => setDeleteTarget(item)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={Boolean(renameTarget)} onClose={() => setRenameTarget(null)} title="Rename saved search">
        <form onSubmit={onRenameConfirm}>
          <input className="input" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} aria-label="New name" />
          <div className="modal__actions">
            <button type="button" className="button button--secondary" onClick={() => setRenameTarget(null)}>Cancel</button>
            <button type="submit" className="button button--primary">Save</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete saved search?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        confirmLabel="Delete"
        onConfirm={onDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default SavedSearchesPage
