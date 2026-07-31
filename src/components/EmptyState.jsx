import { LibraryBig, Plus } from 'lucide-react'

function EmptyState({ onAddClick }) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-neutral-400">
      <LibraryBig size={40} strokeWidth={1.5} />
      <p className="text-base">아직 등록된 기록이 없습니다.</p>
      <button
        type="button"
        onClick={onAddClick}
        className="flex items-center gap-2 rounded-md bg-purple-600 px-5 py-3 text-base font-medium text-white hover:bg-purple-700 cursor-pointer"
      >
        <Plus size={20} />
        새 기록 추가
      </button>
    </div>
  )
}

export default EmptyState
