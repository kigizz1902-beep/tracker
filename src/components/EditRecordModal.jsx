import { useState } from 'react'
import Modal from './Modal'
import StarRating from './StarRating'

function EditRecordModal({ record, onClose, onSave }) {
  const [평점, set평점] = useState(record.평점)
  const [한줄평, set한줄평] = useState(record.한줄평)
  const [커버이미지, set커버이미지] = useState(record.커버이미지)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...record, 평점, 한줄평, 커버이미지 })
    onClose()
  }

  return (
    <Modal title={record.제목} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

export default EditRecordModal
