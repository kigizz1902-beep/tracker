import { useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

function Toast({ message, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [message, onDismiss])

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg">
      <AlertCircle size={18} className="shrink-0 text-red-400" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="닫기"
        className="text-neutral-400 hover:text-white cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast
