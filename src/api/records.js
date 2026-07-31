export async function fetchRecords() {
  const response = await fetch('/api/records')

  if (!response.ok) {
    throw new Error('Notion 데이터를 불러오지 못했습니다.')
  }

  return response.json()
}

export async function createRecord(data) {
  const response = await fetch('/api/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('기록을 추가하지 못했습니다.')
  }

  return response.json()
}

export async function updateRecord(id, data) {
  const response = await fetch(`/api/records/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('기록을 수정하지 못했습니다.')
  }

  return response.json()
}

export async function deleteRecord(id) {
  const response = await fetch(`/api/records/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('기록을 삭제하지 못했습니다.')
  }

  return response.json()
}
