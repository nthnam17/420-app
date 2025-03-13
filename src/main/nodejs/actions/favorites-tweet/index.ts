import { Page } from 'puppeteer'
import { evaluateWithParams } from '../../helper/crawler'
import { defaultHeaders } from '../crawler/config'

export const favoritesTweet = async (page: Page) => {
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
  const body = {
    tweet_id: '1899582512340390187'
  }

  defaultHeaders.Authorization = accessToken
  defaultHeaders['x-csrf-token'] = csrfToken
  const url = `https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet`

  await evaluateWithParams(
    page,
    async function getData(url: string, header: any, params: any, _queryId: string) {
      const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ queryId: _queryId, variables: params }),
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error(`HTTPS error!: ${response}`)
      }
      const data = await response.json()
      return data
    },
    [url, defaultHeaders, body]
  )
}
