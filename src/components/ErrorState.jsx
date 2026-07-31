import { AlertTriangle } from 'lucide-react'

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-neutral-500">
      <AlertTriangle size={32} strokeWidth={1.5} className="text-red-400" />
      <p className="text-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 cursor-pointer"
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

export default ErrorState
