import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function DeleteModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const [open, setOpen] = useState(isOpen)

  // Close modal when user clicks outside or presses cancel
  const closeModal = () => {
    setOpen(false);
    onCancel && onCancel();
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {message}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onConfirm && onConfirm();
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500"
              >
                {confirmText}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-semibold text-gray-900 border rounded-md hover:bg-gray-100"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
