import { Trash2 } from 'lucide-react'
import CoverImage from './CoverImage'
import TypeBadge from './TypeBadge'
import StarRating from './StarRating'

function RecordCard({ record, onClick, onDelete }) {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <button
        type="button"
        aria-label="삭제"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-neutral-500 opacity-0 shadow transition group-hover:opacity-100 hover:text-red-600 cursor-pointer"
      >
        <Trash2 size={16} />
      </button>

      <CoverImage src={record.커버이미지} alt={record.제목} className="h-52 w-full" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-medium text-neutral-900">{record.제목}</h3>
          <TypeBadge type={record.유형} />
        </div>

        <StarRating rating={record.평점} />

        <p className="line-clamp-2 text-sm text-neutral-600">{record.한줄평}</p>

        <p className="mt-auto text-xs text-neutral-400">{record.완료일}</p>
      </div>
    </div>
  )
}

export default RecordCard
