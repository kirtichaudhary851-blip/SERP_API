import ErrorBoundary from './components/common/ErrorBoundary'
import ToastContainer from './components/ui/ToastContainer'
import { ThemeProvider } from './context/ThemeProvider'
import { ToastProvider } from './context/ToastProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ErrorBoundary title="The application hit a snag." message="Try reloading the page. If this keeps happening, please report it.">
      <ThemeProvider>
        <ToastProvider>
          <AppRoutes />
          <ToastContainer />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
