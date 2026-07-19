import { useToast } from '../../hooks/useToast'

function CopyButton({ value, label = 'Copy' }) {
  const { showToast } = useToast()

  const onCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(value)
      showToast('Copied successfully', 'success')
    } catch {
      showToast('Unable to copy to clipboard', 'error')
    }
  }

  return (
    <button className="copy-button" type="button" onClick={onCopy} aria-label={`${label} to clipboard`}>
      <span aria-hidden="true">⧉</span> {label}
    </button>
  )
}

export default CopyButton
