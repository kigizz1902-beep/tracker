import Modal from './Modal'

function ConfirmDeleteDialog({ record, onCancel, onConfirm }) {
  return (
    <Modal title="기록 삭제" onClose={onCancel}>
      <p className="text-sm text-neutral-600">
        <span className="font-medium text-neutral-900">{record.제목}</span> 기록을
        삭제할까요? 이 작업은 되돌릴 수 없습니다.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 cursor-pointer"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 cursor-pointer"
        >
          삭제
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteDialog
