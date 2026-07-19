import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLoader from '../components/common/PageLoader'
import DashboardLayout from '../components/layout/DashboardLayout'
import DocsLayout from '../components/layout/DocsLayout'
import MainLayout from '../components/layout/MainLayout'
import { ROUTES } from '../constants/routes'

// Route-level code splitting: each page is its own chunk, only downloaded when visited.
// Layouts stay eager since they render immediately on every navigation within their section.
const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const SearchResultsPage = lazy(() => import('../pages/SearchResultsPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const ApiDocumentationPage = lazy(() => import('../pages/docs/ApiDocumentationPage'))
const ApiPlaygroundPage = lazy(() => import('../pages/docs/ApiPlaygroundPage'))
const SdkExamplesPage = lazy(() => import('../pages/docs/SdkExamplesPage'))
const ErrorCodesPage = lazy(() => import('../pages/docs/ErrorCodesPage'))
const ChangelogPage = lazy(() => import('../pages/docs/ChangelogPage'))

const DashboardOverviewPage = lazy(() => import('../pages/dashboard/DashboardOverviewPage'))
const DashboardHistoryPage = lazy(() => import('../pages/dashboard/DashboardHistoryPage'))
const DashboardAnalyticsPage = lazy(() => import('../pages/dashboard/DashboardAnalyticsPage'))
const SavedSearchesPage = lazy(() => import('../pages/dashboard/SavedSearchesPage'))
const DashboardSettingsPage = lazy(() => import('../pages/dashboard/DashboardSettingsPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route path={ROUTES.results} element={<SearchResultsPage />} />
          <Route path={ROUTES.documentation} element={<DocsLayout />}>
            <Route index element={<ApiDocumentationPage />} />
            <Route path="playground" element={<ApiPlaygroundPage />} />
            <Route path="sdk-examples" element={<SdkExamplesPage />} />
            <Route path="error-codes" element={<ErrorCodesPage />} />
            <Route path="changelog" element={<ChangelogPage />} />
          </Route>
        </Route>
        <Route path={ROUTES.dashboard} element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="history" element={<DashboardHistoryPage />} />
          <Route path="analytics" element={<DashboardAnalyticsPage />} />
          <Route path="saved-searches" element={<SavedSearchesPage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
