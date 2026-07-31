import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchRecordsFromNotion } from './server/fetchRecords.js'

// 개발 서버 전용 API 미들웨어. 토큰은 여기(Node 쪽)에서만 쓰이고 브라우저로 전달되지 않는다.
function notionApiPlugin(env) {
  return {
    name: 'notion-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/records', async (req, res) => {
        try {
          const records = await fetchRecordsFromNotion({
            token: env.NOTION_TOKEN,
            dataSourceId: env.NOTION_DATA_SOURCE_ID,
          })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(records))
        } catch (error) {
          console.error('[api/records]', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ message: 'Notion 데이터를 불러오지 못했습니다.' }))
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
