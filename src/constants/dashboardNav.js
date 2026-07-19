import { ROUTES } from './routes'

export const DASHBOARD_NAV = Object.freeze([
  { label: 'Dashboard', to: ROUTES.dashboard, icon: '▦', end: true },
  { label: 'Search', to: ROUTES.search, icon: '⌕' },
  { label: 'History', to: ROUTES.dashboardHistory, icon: '⟲' },
  { label: 'Analytics', to: ROUTES.dashboardAnalytics, icon: '▲' },
  { label: 'Saved Searches', to: ROUTES.dashboardSaved, icon: '★' },
  { label: 'Documentation', to: ROUTES.documentation, icon: '▤' },
  { label: 'Settings', to: ROUTES.dashboardSettings, icon: '⚙' },
])
