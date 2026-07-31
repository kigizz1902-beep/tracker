import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { listRecords, createRecord, updateRecord, archiveRecord } from './server/notionApi.js'
import { readJsonBody } from './server/readJsonBody.js'

// 개발 서버 전용 API 미들웨어. 토큰은 여기(Node 쪽)에서만 쓰이고 브라우저로 전달되지 않는다.
function notionApiPlugin(env) {
  return {
    name: 'notion-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/records', async (req, res) => {
        const auth = { token: env.NOTION_TOKEN, dataSourceId: env.NOTION_DATA_SOURCE_ID }
        // '/api/records'에 마운트되어 req.url은 그 뒤 경로만 남는다: '' 또는 '/<pageId>'
        const pageId = req.url.split('?')[0].replace(/^\/+/, '')
        res.setHeader('Content-Type', 'application/json')

        try {
          if (req.method === 'GET' && !pageId) {
            const records = await listRecords(auth)
            res.end(JSON.stringify(records))
            return
          }

          if (req.method === 'POST' && !pageId) {
            const data = await readJsonBody(req)
            const record = await createRecord({ ...auth, data })
            res.statusCode = 201
            res.end(JSON.stringify(record))
            return
          }

          if (req.method === 'PATCH' && pageId) {
            const data = await readJsonBody(req)
            const record = await updateRecord({ ...auth, pageId, data })
            res.end(JSON.stringify(record))
            return
          }

          if (req.method === 'DELETE' && pageId) {
            await archiveRecord({ ...auth, pageId })
            res.end(JSON.stringify({ ok: true }))
            return
          }

          res.statusCode = 404
          res.end(JSON.stringify({ message: 'Not found' }))
        } catch (error) {
          console.error('[api/records]', error)
          res.statusCode = 500
          res.end(JSON.stringify({ message: 'Notion 요청이 실패했습니다.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), notionApiPlugin(env)],
  }
})
