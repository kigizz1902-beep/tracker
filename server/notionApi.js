import { Client } from '@notionhq/client'

// Vite 개발 서버 미들웨어 전용 — Node 쪽에서만 실행되며 브라우저 번들에 포함되지 않는다.
// 배포 시에는 이 파일을 Vercel Serverless Function으로 옮겨야 한다 (CLAUDE.md 배포 전환 항목 참고).

function getClient(token) {
  return new Client({ auth: token })
}

function mapPage(page) {
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
}

export async function listRecords({ token, dataSourceId }) {
  const notion = getClient(token)
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [{ property: '완료일', direction: 'descending' }],
  })
  return response.results.map(mapPage)
}

export async function createRecord({ token, dataSourceId, data }) {
  const notion = getClient(token)
  const page = await notion.pages.create({
    parent: { data_source_id: dataSourceId },
    properties: {
      제목: { title: [{ text: { content: data.제목 ?? '' } }] },
      유형: { select: { name: data.유형 } },
      평점: { number: data.평점 ?? null },
      한줄평: { rich_text: [{ text: { content: data.한줄평 ?? '' } }] },
      완료일: { date: data.완료일 ? { start: data.완료일 } : null },
      상태: { select: { name: data.상태 } },
      커버이미지: { url: data.커버이미지 || null },
    },
  })
  return mapPage(page)
}

export async function updateRecord({ token, pageId, data }) {
  const notion = getClient(token)
  const page = await notion.pages.update({
    page_id: pageId,
    properties: {
      평점: { number: data.평점 ?? null },
      한줄평: { rich_text: [{ text: { content: data.한줄평 ?? '' } }] },
      커버이미지: { url: data.커버이미지 || null },
    },
  })
  return mapPage(page)
}

// 완전 삭제 대신 Notion 휴지통으로 보관 처리 — 조회 시 자동으로 제외되고, 필요하면 Notion에서 복구 가능하다.
export async function archiveRecord({ token, pageId }) {
  const notion = getClient(token)
  await notion.pages.update({ page_id: pageId, in_trash: true })
}
