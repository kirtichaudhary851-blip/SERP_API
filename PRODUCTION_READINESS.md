# Phase 6 — Production Readiness Report

Scope: review and polish the existing frontend (Phases 0–5) for production. No
new features, no redesign, no backend work — this document records what was
found and what changed.

## 1. Performance improvements

**Route-level code splitting.** Every page in `src/routes/AppRoutes.jsx` is now
loaded with `React.lazy()` behind a single `<Suspense fallback={<PageLoader />}>`.
Previously the whole app (including the `recharts` charting library, ~470 KB)
shipped in one bundle:

| Build | Main JS bundle | Notes |
|---|---|---|
| Before Phase 6 | 747 KB (over Vite's 500 KB warning threshold) | Every route in one chunk |
| After Phase 6 | 255 KB main + ~25 small per-route chunks (0.2–10 KB each) + 431 KB analytics chunk | No warning; charting library only downloads if the user visits `/dashboard/analytics` |

Layouts (`MainLayout`, `DocsLayout`, `DashboardLayout`) stay eagerly bundled
since they render on every navigation within their section — only leaf pages
are split.

**Fewer duplicate renders / duplicate code paths.** Two near-identical
pagination components (`components/search/Pagination.jsx` and
`components/dashboard/DashboardPagination.jsx`) were merged into one
`components/common/Pagination.jsx`, used by both the search results page and
the dashboard history table, with identical rendered output preserved for the
existing search results usage (verified via prop defaults).

## 2. Accessibility improvements

- **Focus states**: added a single universal `:focus-visible` rule (using the
  existing `--color-focus` token) covering links, buttons, and form controls
  app-wide — previously only `.input` had an explicit focus ring.
- **Keyboard navigation**: the Notifications panel and Profile menu dropdowns
  now close on `Escape` (new `useEscapeKey` hook), matching the click-outside
  behavior they already had. The global search modal already handled this via
  the native `<dialog>` element.
- **Screen reader support**: external links (Navbar GitHub link, Footer GitHub
  link, search result links) now include a visually-hidden "(opens in a new
  tab)" hint alongside `rel="noreferrer"`.
- **Error boundaries** use `role="alert"` so a caught error is announced
  immediately.
- Confirmed already in place from earlier phases and left unchanged: labelled
  form fields, `scope`/`caption` on all data tables, `aria-expanded` /
  `aria-haspopup` / `aria-current` on navigation and menus, `role="img"` with a
  text description on every chart, and native `<dialog>` for all modals (free
  focus handling and Escape-to-close).

## 3. Responsive audit

Tested programmatically (Chrome DevTools Protocol with `Emulation.setDeviceMetricsOverride`,
not just eyeballed screenshots) at **390px (mobile), 768px (tablet), and
1024px (laptop)** against all 11 routes: home, about, search, results,
documentation + its 4 sub-pages, and dashboard + its 4 sub-pages.

**Result: zero horizontal overflow on any page at any of the three widths.**
An initial visual read of screenshots suggested possible text clipping on the
landing page hero and the search page's button row; a precise
`getBoundingClientRect`/`scrollWidth` check under real mobile emulation showed
this was a false alarm (screenshot rendering artifact, not an actual layout
bug) — both elements measured exactly within their container with no overflow.
No responsive fixes were needed; the breakpoints built in Phases 1–5 already
hold up.

## 4. Error boundaries

Added a reusable `components/common/ErrorBoundary.jsx` (class component, as
required by React). It's wrapped:
- once at the very top of `App.jsx`, around the whole app (catches anything
  even providers might throw), and
- once inside each layout around its `<Outlet />`, **keyed by the current
  path** — so if one page throws, the rest of the app (nav, sidebar, other
  routes) stays usable, and navigating away automatically clears the error
  instead of leaving the user stuck on a dead page.

The fallback UI shows a friendly message and a "Try again" button; the raw
error message is only shown in dev builds (`import.meta.env.DEV`).

## 5. Code cleanup

| Found | Action |
|---|---|
| `components/ui/Loader.jsx` — never imported anywhere | Deleted |
| `hooks/useMediaQuery.js` — built in Phase 5, never actually used | Deleted |
| `THEME_MODES` defined identically in both `constants/theme.js` (Phase 0) and `config/dashboardConfig.js` (Phase 5) | `dashboardConfig.js` now imports it from `constants/theme.js`; single source of truth |
| `components/search/Pagination.jsx` and `components/dashboard/DashboardPagination.jsx` — same markup/CSS class, one had click handlers | Merged into `components/common/Pagination.jsx` (optional `onPageChange`, backward-compatible defaults) |
| `SearchBar`'s `compact` prop — no caller ever passed it, and no CSS rule (`.search-controls--compact`) existed for it | Removed |
| Mock data files, constants, and config — checked for anything unused | None found; every `mock/*.json` and constant file is imported somewhere |

**Note on scope**: the hand-written CSS files (`search.css`, `docs.css`,
`dashboard.css`, ~1,500 lines combined) were not swept selector-by-selector for
unused classes — that would require tracing every `className` string across
~100 components and carries real risk of removing something used
conditionally. Tailwind's own utility classes are already tree-shaken
automatically by its Vite plugin; the risk is confined to the small number of
hand-written rules, which is a reasonable, disclosed trade-off given the
"don't change working functionality" constraint for this phase.

## 6. Configuration review

- `VITE_API_BASE_URL` and `VITE_API_TIMEOUT_MS` are the only environment
  variables, both documented in `.env.example` and `README.md`. No secrets are
  read from `import.meta.env`.
- Searched for stray hardcoded URLs outside config/mock files — none found.
  The only hardcoded-looking URL (`https://api.customserp.dev`) is
  intentional: it's the documentation portal's placeholder example base URL,
  not a real endpoint.
- `.env` is git-ignored and does not exist in the working tree — confirmed no
  secrets are at risk of being committed.

## 7. Architecture summary

```
Route (lazy) → Page component → useSearch / useDashboardHistory / etc. (hooks)
                                   → searchService() (single API entry point)
                                       → real fetch if VITE_API_BASE_URL is set
                                       → else mock data with simulated delay
```

Everything above the `searchService()` line (pages, hooks, error states,
loading states) is written against that one function's contract. Connecting
the real Python backend later means setting one environment variable — no
component changes required.

## Checklist

- [x] Duplicate code found and refactored (Pagination, THEME_MODES)
- [x] Unused components/hooks removed (Loader, useMediaQuery, dead `compact` prop)
- [x] React.lazy() + Suspense route-level code splitting
- [x] Reusable ErrorBoundary, wrapped at app root and per-layout
- [x] Accessibility pass: focus states, Escape-to-close menus, external-link hints
- [x] Responsive audit across 11 routes × 3 breakpoints — no issues found
- [x] Favicon + theme-color added (previously missing)
- [x] Config reviewed — no hardcoded values, `.env` safely git-ignored
- [x] README rewritten with overview, structure, install/run, env vars, architecture
- [x] `npm install`, `npm run lint`, `npm run build`, `npm run preview` all pass
- [x] Full app smoke-tested against the actual production build (`dist/`) — 15 routes, 0 console errors
- [x] No backend, no auth, no deployment, no redesign — scope respected
