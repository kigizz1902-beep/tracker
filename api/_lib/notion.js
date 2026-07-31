import { Client } from '@notionhq/client'

// Vercel Serverless Function 전용 — Node 런타임에서만 실행되며 브라우저에 절대 노출되지 않는다.
// 인증 정보는 코드에 직접 쓰지 않고 환경변수(NOTION_TOKEN, NOTION_DATABASE_ID)로 관리한다.

function getClient() {
  return new Client({ auth: process.env.NOTION_TOKEN })
}

// 웜 인스턴스 사이에 재사용되는 캐시. 콜드 스타트당 한 번만 데이터소스를 조회하면 된다.
let cachedDataSourceId = null

async function resolveDataSourceId(notion) {
  if (cachedDataSourceId) return cachedDataSourceId

  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  })
  cachedDataSourceId = database.data_sources[0].id
  return cachedDataSourceId
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

export async function listRecords() {
  const notion = getClient()
  const dataSourceId = await resolveDataSourceId(notion)

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [{ property: '완료일', direction: 'descending' }],
  })

  return response.results.map(mapPage)
}

export async function createRecord(data) {
  const notion = getClient()
  const dataSourceId = await resolveDataSourceId(notion)

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

export async function updateRecord(pageId, data) {
  const notion = getClient()

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
export async function archiveRecord(pageId) {
  const notion = getClient()
  await notion.pages.update({ page_id: pageId, in_trash: true })
}
