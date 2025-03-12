import { Page } from 'puppeteer'
import { encodeToJson, evaluateWithParams } from '../../helper/crawler'
import { defaultFeatures, Features, queryId, varQuery } from './config'
import { handleXMigration } from '../../helper/utils'
import { defaultHeaders } from './config'
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { ClientTransaction } from '../../helper/transaction'

export const crawler = async (page: Page): Promise<void> => {
  const query = {
    count: 20,
    product: 'top',
    querySource: 'typed_query',
    rawQuery: 'mu'
  }

  // // Lấy nội dung response của request
  // page.on('response', async (response) => {
  //   const url = response.url()
  //   if (url.includes('https://x.com/i/api/graphql/')) {
  //     console.log('[Response URL]:', url)

  //     try {
  //       const responseBody = await response.json() // Parse JSON từ response
  //       console.log('Response Body:', responseBody)
  //     } catch (error) {
  //       console.log('Không thể parse JSON:', error)
  //     }
  //   }
  // })

  // // // search Actions
  // const SearchBtn = await page.waitForSelector('[href="/explore"]')

  // console.log(SearchBtn, 'search')

  // if (SearchBtn) SearchBtn.click()

  // await page.waitForNetworkIdle({ idleTime: 500 })

  // await page.waitForSelector('[data-testid="SearchBox_Search_Input"]')
  // await page.type('input[data-testid="SearchBox_Search_Input"]', 'mu utd', { delay: 50 })
  // await page.keyboard.press('Enter')

  let accessToken = ''
  let csrfToken = ''

  // const queryRawEncode = encodeToJson(query.rawQuery)

  const getToken = (): Promise<void> => {
    return new Promise((resolve) => {
      page.on('request', (request) => {
        if (request.url().includes('https://x.com/i/api/')) {
          const reqHeaders = request.headers()

          if (reqHeaders['authorization'] && reqHeaders['x-csrf-token']) {
            accessToken = reqHeaders['authorization']
            csrfToken = reqHeaders['x-csrf-token']
            defaultHeaders.Authorization = accessToken
            defaultHeaders['x-csrf-token'] = csrfToken

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

  console.log(defaultHeaders, 'deheader')

  const session: AxiosInstance = axios.create({
    ...({ defaultHeaders } as CreateAxiosDefaults<any>)
  })

  ;(async () => {
    try {
      const response = await handleXMigration(session)
      const method = 'POST'
      const path = '/1.1/jot/client_eventS.json'

      if (!response) {
        console.log('migration error')
        return
      }

      const ct = new ClientTransaction(response)
      const transactionId = ct.generateTransactionId(method, path)
      console.log('Transaction ID:', transactionId)
    } catch (error) {
      console.error('Error:', error)
    }
  })()
  // await page.goto(`https://x.com/search?q=${queryRawEncode}&src=typed_query&f=top`)

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
      // transactionId: string
    ) {
      const response = await fetch(
        `https://x.com/i/api/graphql/${queryId}/SearchTimeline?variables=${query}&features=${feat}`,
        {
          method: 'GET',
          headers: {
            authorization: _accessToken,
            'x-csrf-token': _csrfToken,
            referer: 'https://x.com/search?q=mu&src=typed_query&f=top',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
            // 'x-client-transaction-id': transactionId
          },
          credentials: 'include'
        }
      )
      // const response = await fetch(url)
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
