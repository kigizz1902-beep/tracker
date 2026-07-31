export async function fetchRecords() {
  const response = await fetch('/api/records')

  if (!response.ok) {
    throw new Error('Notion 데이터를 불러오지 못했습니다.')
  }

  return response.json()
}
