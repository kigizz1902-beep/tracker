import { useState } from 'react'
import Modal from './Modal'
import StarRating from './StarRating'

function AddRecordModal({ onClose, onAdd }) {
  const [제목, set제목] = useState('')
  const [유형, set유형] = useState('책')
  const [평점, set평점] = useState(5)
  const [한줄평, set한줄평] = useState('')
  const [완료일, set완료일] = useState('')
  const [커버이미지, set커버이미지] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      id: crypto.randomUUID(),
      제목,
      유형,
      평점,
      한줄평,
      완료일,
      상태: '완료',
      커버이미지,
    })
    onClose()
  }

  return (
    <Modal title="새 기록 추가" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-neutral-600">
          제목
          <input
            type="text"
            value={제목}
            onChange={(e) => set제목(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-purple-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-600">
          유형
          <select
            value={유형}
            onChange={(e) => set유형(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-purple-500 focus:outline-none"
          >
            <option value="책">책</option>
            <option value="영화">영화</option>
          </select>
        </label>

        <div className="flex flex-col gap-1 text-sm text-neutral-600">
          평점
          <StarRating rating={평점} onChange={set평점} />
        </div>

        <label className="flex flex-col gap-1 text-sm text-neutral-600">
          한줄평
          <textarea
            value={한줄평}
            onChange={(e) => set한줄평(e.target.value)}
            rows={2}
            className="resize-none rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-purple-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-600">
          완료일
          <input
            type="date"
            value={완료일}
            onChange={(e) => set완료일(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-purple-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-600">
          커버이미지 URL
          <input
            type="text"
            value={커버이미지}
            onChange={(e) => set커버이미지(e.target.value)}
            placeholder="https://..."
            className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-purple-500 focus:outline-none"
          />
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 cursor-pointer"
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddRecordModal
