import { Page } from 'puppeteer'
import { defaultFeatures, Features, queryId, varQuery } from '../crawler/config'
import { encodeToJson, evaluateWithParams } from '../../helper/crawler'
import { defaultVariablesCreateTweet } from '../../helper/actions'
export const postTweet = async (page: Page): Promise<void> => {
  let csrfToken = ''
  let accessToken = ''

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

  // const queryEndCode = encodeToJson(query)
  // const featEnCode = encodeToJson(defaultFeatures)

  defaultVariablesCreateTweet.tweet_text = 'Vừa mềm mỏng vừa cứng rắn'

  const data = await evaluateWithParams(
    page,
    async function getData(
      query: varQuery,
      feat: Features,
      queryId: queryId,
      _accessToken: string,
      _csrfToken: string
    ) {
      const response = await fetch(`https://x.com/i/api/graphql/${queryId}/CreateTweet`, {
        method: 'POST',
        headers: {
          authorization: _accessToken,
          'x-csrf-token': _csrfToken,
          referer: 'https://x.com/search?q=mu&src=typed_query&f=Top',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
          'x-client-transaction-id':
            '15dvwB71HyZTVaoYSmqYEWzgqPW0QeRsqMWQ1VgB0NgA/DDSGah1yHkedcaJT45NfqY7VtSI4tXtqryqxCQ/kLkOxm1L1A',
          'x-twitter-active-user': 'yes',
          'x-twitter-auth-type': 'OAuth2Session',
          'x-twitter-client-language': 'vi',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          features: feat,
          queryId: queryId,
          variables: query
        }),
        credentials: 'include'
      })
      if (!response.ok) {
        console.log(response)

        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      return data
    },
    [defaultVariablesCreateTweet, defaultFeatures, 'UYy4T67XpYXgWKOafKXB_A', accessToken, csrfToken]
  )

  console.log(data, 'dataCrawler')
}
