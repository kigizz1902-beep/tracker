import { updateRecord, archiveRecord } from '../_lib/notion.js'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    if (req.method === 'PATCH') {
      const record = await updateRecord(id, req.body)
      res.status(200).json(record)
      return
    }

    if (req.method === 'DELETE') {
      await archiveRecord(id)
      res.status(200).json({ ok: true })
      return
    }

    res.status(405).json({ message: 'Method Not Allowed' })
  } catch (error) {
    console.error('[api/records/[id]]', error)
    res.status(500).json({ message: 'Notion 요청이 실패했습니다.' })
  }
}
