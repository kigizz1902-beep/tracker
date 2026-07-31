import { useMemo, useState } from 'react'
import { LibraryBig } from 'lucide-react'
import { mockRecords } from './data/mockRecords'
import Toolbar from './components/Toolbar'
import RecordCard from './components/RecordCard'
import AddRecordModal from './components/AddRecordModal'
import EditRecordModal from './components/EditRecordModal'
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog'

function App() {
  const [records, setRecords] = useState(mockRecords)
  const [filterType, setFilterType] = useState('전체')
  const [sortBy, setSortBy] = useState('완료일순')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [deletingRecord, setDeletingRecord] = useState(null)

  const visibleRecords = useMemo(() => {
    const filtered =
      filterType === '전체' ? records : records.filter((r) => r.유형 === filterType)

    return [...filtered].sort((a, b) =>
      sortBy === '평점순' ? b.평점 - a.평점 : b.완료일.localeCompare(a.완료일),
    )
  }, [records, filterType, sortBy])

  const handleAdd = (record) => setRecords((prev) => [record, ...prev])

  const handleUpdate = (updated) =>
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))

  const handleDelete = (id) => setRecords((prev) => prev.filter((r) => r.id !== id))

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex items-center gap-2 border-b border-neutral-200 bg-white px-6 py-4">
        <LibraryBig className="text-purple-600" size={24} strokeWidth={1.5} />
        <h1 className="text-lg font-medium text-neutral-900">독서·영화 기록 트래커</h1>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6">
        <Toolbar
          filterType={filterType}
          onFilterChange={setFilterType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddClick={() => setIsAddOpen(true)}
        />

        {visibleRecords.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-24 text-neutral-400">
            <LibraryBig size={32} strokeWidth={1.5} />
            <p className="text-sm">아직 기록이 없어요. 새 기록을 추가해보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleRecords.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={() => setEditingRecord(record)}
                onDelete={() => setDeletingRecord(record)}
              />
            ))}
          </div>
        )}
      </main>

      {isAddOpen && (
        <AddRecordModal onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      )}

      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleUpdate}
        />
      )}

      {deletingRecord && (
        <ConfirmDeleteDialog
          record={deletingRecord}
          onCancel={() => setDeletingRecord(null)}
          onConfirm={() => {
            handleDelete(deletingRecord.id)
            setDeletingRecord(null)
          }}
        />
      )}
    </div>
  )
}

export default App
