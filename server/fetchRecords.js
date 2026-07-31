import { Client } from '@notionhq/client'

// Vite 개발 서버 미들웨어 전용 — Node 쪽에서만 실행되며 브라우저 번들에 포함되지 않는다.
// 배포 시에는 이 파일을 Vercel Serverless Function으로 옮겨야 한다 (CLAUDE.md 배포 전환 항목 참고).
export async function fetchRecordsFromNotion({ token, dataSourceId }) {
  const notion = new Client({ auth: token })

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [{ property: '완료일', direction: 'descending' }],
  })

  return response.results.map((page) => {
    const props = page.properties
    return {
      id: page.id,
      제목: props.제목.title.map((t) => t.plain_text).join(''),
      유형: props.유형.select?.name ?? '',
      평점: props.평점.number ?? 0,
      한줄평: props.한줄평.rich_text.map((t) => t.plain_text).join(''),
      완료일: props.완료일.date?.start ?? '',
      상태: props.상태.select?.name ?? '',
      커버이미지: props.커버이미지.url ?? '',
    }
  })
}
