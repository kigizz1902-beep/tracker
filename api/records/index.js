import { listRecords, createRecord } from '../_lib/notion.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const records = await listRecords()
      res.status(200).json(records)
      return
    }

    if (req.method === 'POST') {
      const record = await createRecord(req.body)
      res.status(201).json(record)
      return
    }

    res.status(405).json({ message: 'Method Not Allowed' })
  } catch (error) {
    console.error('[api/records]', error)
    res.status(500).json({ message: 'Notion 요청이 실패했습니다.' })
  }
}
