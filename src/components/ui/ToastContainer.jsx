import { useToast } from '../../hooks/useToast'
import Toast from './Toast'

function ToastContainer() {
  const { toasts, dismissToast } = useToast()
  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} tone={toast.tone} onDismiss={() => dismissToast(toast.id)} />
      ))}
    </div>
  )
}

export default ToastContainer
