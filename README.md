# Custom SERP API Frontend

A production-ready React frontend for a custom Search Engine Results Page (SERP)
API. This repo is **frontend-only** — the Python backend is being built
separately. Until it's connected, the app runs entirely on local mock data so
every feature can be built, demoed, and tested end to end today.

## Project overview

The app has three main areas:

- **Marketing site** — landing page, search UI, and results page (`/`, `/search`, `/results`).
- **Developer portal** — API documentation, an interactive playground, SDK code
  samples, error code reference, and a changelog (`/documentation/*`).
- **Dashboard** — search history, analytics charts, saved searches, and settings
  for a signed-in-style developer experience (`/dashboard/*`).

There is no authentication and no real backend call in this codebase — search
results, analytics numbers, and documentation examples all come from JSON files
in `src/mock/`. The app is structured so that connecting the real API later is a
small, contained change (see [Frontend architecture](#frontend-architecture)).

## Features

- Landing page with a live-feeling product preview
- Search workspace (query + country/language/device/result-count/safe-search)
  with recent searches
- Results page with real idle/loading/success/empty/error states, filters, and
  pagination
- Developer documentation portal: endpoint reference, parameters, code
  examples (cURL/JS/Python/Node), API playground, error codes, changelog
- Dashboard: usage stats, charts (line/area/bar/pie via Recharts), search
  history (search/filter/sort/delete/clear/paginate), saved searches
  (save/rename/delete/favorite), and settings (theme, defaults, notifications)
- Light/dark theme, toast notifications, modals, skeleton loading states,
  and error boundaries throughout

## Folder structure

```
src/
├── assets/            Placeholder folders for icons/images/logo (none needed yet —
│                       the UI currently uses Unicode glyphs and system fonts, so
│                       there are no binary assets to ship)
├── components/
│   ├── common/         Shared, page-agnostic components (Pagination, ErrorBoundary,
│   │                   PageLoader, ArrowIcon, SectionHeading)
│   ├── dashboard/       Dashboard-only building blocks (sidebar, topbar, modals,
│   │   └── charts/      stat cards, empty states) and the 4 reusable chart widgets
│   ├── docs/            Documentation portal components (code blocks, tabs,
│   │                   endpoint cards, sidebar)
│   ├── layout/          Route-level layouts: MainLayout, DocsLayout, DashboardLayout
│   ├── search/          Search page + results page components
│   └── ui/              Base UI primitives: Button, Input, Card, Badge, Toast
├── config/              Environment-driven config (API base URL/timeout, app
│                       defaults, dashboard defaults) — see below
├── constants/            Static app data: routes, nav trees, search option lists
├── context/             React Context + Providers (Theme, Toast)
├── hooks/               Reusable custom hooks (see below)
├── mock/                 JSON fixtures standing in for backend responses
├── pages/                One file per route, grouped into dashboard/ and docs/
├── routes/               AppRoutes.jsx — the route table (lazy-loaded per page)
├── services/             API layer: fetch wrapper, error normalization, mock
│                       fallback, and the single searchService() entry point
├── styles/               Hand-written CSS, one file per feature area, plus
│                       design tokens (light/dark) in tokens.css
└── utils/                Small stateless helpers (code highlighting, locale lookups)
```

### Custom hooks

| Hook | Purpose |
|---|---|
| `useLocalStorage` | Generic state synced to `localStorage` |
| `useDebounce` | Debounce a fast-changing value |
| `useSearch` | idle/loading/success/empty/error state machine for a search request |
| `useSearchHistory` / `useDashboardHistory` | Read/write the shared search history in `localStorage` |
| `useSavedSearches` | CRUD for saved searches |
| `useDashboardSettings` | Read/update/reset dashboard settings |
| `useTheme` | Read/toggle the light/dark theme |
| `useToast` | Fire toast notifications |
| `useNotifications` | In-memory mock notification list |
| `useScrollSpy` | Track which section is in view (docs sidebar highlighting) |
| `useClickOutside` / `useEscapeKey` | Close a dropdown/menu on outside click or Escape |
| `useMockLoading` | Simulate a fetch delay for skeleton-loading demos |

## Installation

```bash
npm install
```

## Run commands

```bash
npm run dev       # start the Vite dev server
npm run lint      # run ESLint
npm run build     # production build (output in dist/)
npm run preview   # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | _(empty)_ | Base URL of the Python backend. Leave empty to run entirely on mock data. |
| `VITE_API_TIMEOUT_MS` | `10000` | Request timeout (ms) before a search is treated as a timeout error. |

Never put secrets in `VITE_*` variables — Vite exposes them to the browser bundle.

## Frontend architecture

**API-ready, backend-optional.** `src/services/searchService.js` is the single
place the UI calls to run a search. When `VITE_API_BASE_URL` isn't set, it
transparently resolves against `src/mock/mockResults.json` (with a simulated
network delay) so the whole app works today. Once the Python backend is live,
setting `VITE_API_BASE_URL` is the only change needed — no component code
changes, because every page already consumes `searchService()` through the
`useSearch` hook and handles loading/error/empty states the same way a real
network response would.

**Error handling.** `src/services/errors.js` normalizes any failure (network,
server, timeout, or unknown) into a consistent `ApiError` shape so every page
can show the same kind of friendly error state and retry action.

**State & persistence.** Local UI state uses plain `useState`; anything that
should survive a refresh (search history, saved searches, dashboard settings,
theme) goes through `useLocalStorage`. Cross-cutting concerns (theme, toasts)
are React Context providers mounted once in `App.jsx`.

**Routing & code splitting.** `src/routes/AppRoutes.jsx` lazy-loads every page
component with `React.lazy()` behind a single `<Suspense>` boundary, so each
route ships its own JS chunk instead of one large bundle. Layouts
(`MainLayout`, `DocsLayout`, `DashboardLayout`) stay eager since they render on
every navigation within their section, and each layout wraps its `<Outlet />`
in an `ErrorBoundary` (keyed by the current path) so a failure on one page
doesn't take down the rest of the app.

**Styling.** Tailwind CSS handles utility classes; hand-written CSS in
`src/styles/` (one file per feature area, plus `tokens.css` for design tokens)
covers the custom components. All colors are CSS custom properties with a
light and dark value, switched by a `data-theme` attribute on `<html>`.

## Production readiness

See [`PRODUCTION_READINESS.md`](./PRODUCTION_READINESS.md) for the full Phase 6
audit: performance, accessibility, responsiveness, and cleanup.
