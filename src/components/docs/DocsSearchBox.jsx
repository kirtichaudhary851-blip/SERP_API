function DocsSearchBox() {
  return (
    <form className="docs-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <span className="docs-search__icon" aria-hidden="true">⌕</span>
      <input className="docs-search__input" type="search" placeholder="Search documentation…" aria-label="Search documentation" />
      <kbd className="docs-search__kbd">Ctrl K</kbd>
    </form>
  )
}

export default DocsSearchBox
