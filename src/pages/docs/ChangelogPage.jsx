import ChangelogItem from '../../components/docs/ChangelogItem'
import changelog from '../../mock/changelog.json'

function ChangelogPage() {
  return (
    <section aria-labelledby="changelog-heading">
      <header className="docs-page-header">
        <p className="eyebrow">Changelog</p>
        <h1 id="changelog-heading">What&apos;s new in the Custom SERP API.</h1>
        <p>A running log of releases, improvements, and fixes.</p>
      </header>

      <ol className="changelog-list">
        {changelog.map((entry) => <ChangelogItem key={entry.version} entry={entry} />)}
      </ol>
    </section>
  )
}

export default ChangelogPage
