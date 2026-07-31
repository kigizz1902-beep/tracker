import { Plus, Search } from 'lucide-react'

const FILTERS = [
  { value: '전체', label: '전체' },
  { value: '책', label: '책' },
  { value: '영화', label: '영화' },
]

function Toolbar({
  filterType,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onAddClick,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
              filterType === value
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative flex-1 sm:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="제목 검색"
          className="w-full rounded-md border border-neutral-300 py-1.5 pl-9 pr-3 text-sm text-neutral-700 focus:border-purple-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 focus:border-purple-500 focus:outline-none"
        >
          <option value="완료일순">완료일순</option>
          <option value="평점순">평점순</option>
        </select>

        <button
          type="button"
          onClick={onAddClick}
          className="flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700 cursor-pointer"
        >
          <Plus size={16} />
          새 기록 추가
        </button>
      </div>
    </div>
  )
}

export default Toolbar
