import { Page } from 'puppeteer'
import { encodeToJson, evaluateWithParams } from '../../helper/crawler'
import { defaultFeatures, Features, queryId, varQuery } from './config'

export const crawler = async (page: Page): Promise<void> => {
  // const query = {
  //   count: 20,
  //   product: 'top',
  //   querySource: 'typed_query',
  //   rawQuery: 'mu utd'
  // }

  // // Chặn và lấy token từ request
  // page.on('request', async (request) => {
  //   const url = request.url()
  //   if (url.includes('https://x.com/i/api/graphql/')) {
  //     console.log('[Request URL]:', url)

  //     const headers = request.headers()
  //     if (headers.authorization) {
  //       console.log('🔑 Access Token:', headers.authorization)
  //     }

  //     console.log('Request Body:', request.postData()) // Xem dữ liệu gửi lên API
  //   }
  // })

  // Lấy nội dung response của request
  page.on('response', async (response) => {
    const url = response.url()
    if (url.includes('https://x.com/i/api/graphql/')) {
      console.log('[Response URL]:', url)

      try {
        const responseBody = await response.json() // Parse JSON từ response
        console.log('Response Body:', responseBody)
      } catch (error) {
        console.log('Không thể parse JSON:', error)
      }
    }
  })

  // // search Actions
  const SearchBtn = await page.waitForSelector('[href="/explore"]')

  console.log(SearchBtn, 'search')

  if (SearchBtn) SearchBtn.click()

  await page.waitForNetworkIdle({ idleTime: 500 })

  await page.waitForSelector('[data-testid="SearchBox_Search_Input"]')
  await page.type('input[data-testid="SearchBox_Search_Input"]', 'mu utd', { delay: 50 })
  await page.keyboard.press('Enter')

  page.on('response', async (response) => {
    const url = response.url()
    if (url.includes('https://x.com/i/api/graphql/')) {
      console.log('[Response URL]:', url)

      try {
        const responseBody = await response.json()
        console.log('Response Body:', responseBody)
        const data =
          responseBody?.data?.search_by_raw_query?.search_timeline?.timeline?.instructions[0]
            ?.entries

        console.log(data)
      } catch (error) {
        console.log('Không thể parse JSON:', error)
      }
    }
  })
  // const encodeQuery = encodeToJson(query)
  // const encodeFeat = encodeToJson(defaultFeatures)
  // console.log(encodeQuery)
  // console.log(encodeFeat)

  // const data = await evaluateWithParams(
  //   page,
  //   async function getData(query: varQuery, feat: Features, queryId: queryId) {
  //     const url = `https://x.com/i/api/graphql/${queryId}/SearchTimeline?variables=${query}&features=${feat}`
  //     const response = await fetch(url)
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`)
  //     }
  //     const data = await response.json()
  //     return data
  //   },
  //   [encodeQuery, encodeFeat, 'U3QTLwGF8sZCHDuWIMSAmg']
  // )

  // console.log(data, 'dataCrawler')
}
