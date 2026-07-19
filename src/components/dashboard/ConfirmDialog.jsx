import Modal from './Modal'

function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', tone = 'primary', onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p>{message}</p>
      <div className="modal__actions">
        <button type="button" className="button button--secondary" onClick={onCancel}>Cancel</button>
        <button type="button" className={`button button--${tone}`} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
