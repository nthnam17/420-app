import { Page } from 'puppeteer'
import { encodeToJson, evaluateWithParams } from '../../helper/crawler'
import { defaultFeatures, Features, queryId, varQuery } from './config'

export const crawler = async (page: Page): Promise<void> => {
  const query = { rawQuery: 'muutd', count: 20, querySource: 'typed_query', product: 'Top' }

  // // search Actions
  const SearchBtn = await page.waitForSelector('[href="/explore"]')

  console.log(SearchBtn, 'search')

  if (SearchBtn) SearchBtn.click()

  await page.waitForNetworkIdle({ idleTime: 500 })

  await page.waitForSelector('[data-testid="SearchBox_Search_Input"]')
  await page.type('input[data-testid="SearchBox_Search_Input"]', 'mu utd', { delay: 50 })
  await page.keyboard.press('Enter')

  let accessToken = ''
  let csrfToken = ''

  const getToken = (): Promise<void> => {
    return new Promise((resolve) => {
      page.on('request', (request) => {
        if (request.url().includes('https://x.com/i/api/')) {
          const reqHeaders = request.headers()

          if (reqHeaders['authorization'] && reqHeaders['x-csrf-token']) {
            accessToken = reqHeaders['authorization']
            csrfToken = reqHeaders['x-csrf-token']

            console.log('Access Token:', accessToken)
            console.log('CSRF Token:', csrfToken)
          }
          if (accessToken && csrfToken) {
            page.removeAllListeners('request')
            resolve()
          }
        }
      })
    })
  }

  await getToken()

  console.log('Lấy thành công Access Token & CSRF Token!')

  const queryEndCode = encodeToJson(query)
  const featEnCode = encodeToJson(defaultFeatures)

  const data = await evaluateWithParams(
    page,
    async function getData(
      query: varQuery,
      feat: Features,
      queryId: queryId,
      _accessToken: string,
      _csrfToken: string
    ) {
      const response = await fetch(
        `https://x.com/i/api/graphql/${queryId}/SearchTimeline?variables=${query}&features=${feat}`,
        {
          method: 'GET',
          headers: {
            authorization: _accessToken,
            'x-csrf-token': _csrfToken,
            referer: 'https://x.com/search?q=mu&src=typed_query&f=Top',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            'x-client-transaction-id':
              'gF/ArdqnDhlJ2Skeqd6CM1EVpPYvnGar8uKMGMvI+ymONyRsCgILSn63usHzVIHY2TdhAYP7rgcEKXjj3byKKVxcNBH+gw',
            'x-twitter-active-user': 'yes',
            'x-twitter-auth-type': 'OAuth2Session',
            'x-twitter-client-language': 'vi',
            'content-type': 'application/json'
          },
          credentials: 'include'
        }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      return data
    },
    [queryEndCode, featEnCode, 'U3QTLwGF8sZCHDuWIMSAmg', accessToken, csrfToken]
  )

  console.log(data, 'dataCrawler')
}
