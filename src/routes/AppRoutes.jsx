import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import MainLayout from '../components/layout/MainLayout'
import AboutPage from '../pages/AboutPage'
import DocumentationPage from '../pages/DocumentationPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.documentation} element={<DocumentationPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
