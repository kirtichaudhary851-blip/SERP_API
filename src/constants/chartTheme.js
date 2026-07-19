// Mirrors the --chart-series-1/2 and surface/muted/border tokens in styles/tokens.css.
// Recharts renders to SVG attributes rather than CSS, so colors are resolved here in JS
// instead of read from custom properties, keyed by the active theme.
export const CHART_THEME = Object.freeze({
  light: {
    series1: '#2563eb',
    series2: '#15803d',
    grid: '#e2e8f0',
    axis: '#64748b',
    surface: '#ffffff',
    text: '#0f172a',
  },
  dark: {
    series1: '#3987e5',
    series2: '#199e70',
    grid: '#334155',
    axis: '#94a3b8',
    surface: '#1e293b',
    text: '#f8fafc',
  },
})
