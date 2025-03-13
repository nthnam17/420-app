import { Page } from 'puppeteer'
import { defaultFeaturesHome, IHomeQuery } from '../../types/actions'
import { encodeToJson, evaluateWithParams } from '../../helper/crawler'
import { defaultFeatures, defaultHeaders, IHeaders } from '../crawler/config'
import { favoritesTweet } from '../favorites-tweet'

export const seedingWithApi = async (page: Page): Promise<void> => {
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

  const query: IHomeQuery = {
    count: 20,
    includePromotedContent: true,
    latestControlAvailable: true,
    requestContext: 'lauch',
    withCommunity: true
  }

  const queryEndCode = encodeToJson(query)
  const featEnCode = encodeToJson(defaultFeaturesHome)

  const params = {
    variables: queryEndCode,
    features: featEnCode
  }

  const url = `https://x.com/i/api/graphql/BKPIhjmhqGsoPsQwfKrXew/HomeTimeline?variables=${params.variables}&features=${params.features}`
  defaultHeaders.Authorization = accessToken
  defaultHeaders['x-csrf-token'] = csrfToken

  console.log('Lấy thành công Access Token & CSRF Token!')

  const data: any = await evaluateWithParams(
    page,
    async function getData(url: string, header: any) {
      const response = await fetch(url, {
        method: 'GET',
        headers: header,
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      return data
    },
    [url, defaultHeaders]
  )

  if (!data) console.log('Error when get data !!')
  console.log(data)

  const tweetsDatas = data?.data?.home?.home_timeline_urt?.instructions[0]?.entries

  tweetsDatas?.forEach(async (tweet) => {
    const entryId = tweet?.entryId

    if (!entryId) return

    const tweetParts = entryId.split('-')

    if (tweetParts.length < 2) {
      console.warn(`Invalid entryId format: ${entryId}`)
      return
    }
    const [tweetType, tweetId] = tweetParts

    if (tweetType === 'tweet') {
      setTimeout(async () => await favoritesTweet(page, defaultHeaders, tweetId), 1000)
    }
  })
}
