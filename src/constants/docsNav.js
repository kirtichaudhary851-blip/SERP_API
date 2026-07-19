import { ROUTES } from './routes'

export const DOCS_NAV = Object.freeze([
  {
    id: 'overview',
    title: 'Overview',
    items: [
      { label: 'Introduction', hash: '#introduction' },
      { label: 'Base URL', hash: '#base-url' },
      { label: 'Authentication', hash: '#authentication' },
    ],
  },
  {
    id: 'reference',
    title: 'API Reference',
    items: [
      { label: 'Endpoints', hash: '#endpoints' },
      { label: 'Rate limits', hash: '#rate-limits' },
      { label: 'Status codes', hash: '#status-codes' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      { label: 'Quick start', hash: '#quick-start' },
      { label: 'Pagination', hash: '#pagination' },
      { label: 'Localization', hash: '#localization' },
      { label: 'Best practices', hash: '#best-practices' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { label: 'API Playground', to: ROUTES.docsPlayground },
      { label: 'SDK Examples', to: ROUTES.docsSdkExamples },
      { label: 'Error Codes', to: ROUTES.docsErrorCodes },
      { label: 'Changelog', to: ROUTES.docsChangelog },
    ],
  },
])
