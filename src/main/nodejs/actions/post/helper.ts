import { Page } from 'puppeteer'
import axios from 'axios'
import { IHeadersMap } from '../../types/actions'
import { defaultFeatures } from '../crawler/config'

let savedHeaders: IHeadersMap = {}

export const interceptHeaders = async (page: Page) => {
  const cookiesConfig = [
    {
      name: 'ct0',
      value:
        'e0bfc636189736b5c80337e96aba313a5073b3c40f3c32fe54a83c930965f1aee7617006abf7a1185f06604091080c376f48ed56f2ef69f7207e5a2a45d243238842023ee19554ab9d6e78e4f87cb1f2',
      domain: '.x.com',
      path: '/',
      expires: 1775655357.935068,
      size: 163,
      httpOnly: false,
      secure: true,
      session: false
    },
    {
      name: 'auth_token',
      value: '4b5b9d9f1b8020b613a8aa397c5a2a1b0a09f39f',
      domain: '.x.com',
      path: '/',
      expires: 1775655357.62032,
      size: 50,
      httpOnly: true,
      secure: true,
      session: false
    }
  ]

  page.on('request', async (request) => {
    const url = request.url()
    if (url.includes('https://x.com/i/api/graphql/')) {
      console.log('[Request URL]:', url)

      const headers = request.headers()

      console.log(headers, 'header')

      // if (!headers.authorization && !headers.cookie) {
      //   savedHeaders = {}
      // }
      // savedHeaders = {
      //   Authorization: headers.authorization,
      //   // Cookie: headers.cookie ?? cookiesConfig,
      //   'Content-Type': 'application/json',
      //   'User-Agent': headers['user-agent'] || '',
      //   'x-csrf-token': headers['x-csrf-token'] || ''
      // }

      savedHeaders = headers

      console.log('Headers đã lưu:', savedHeaders)
    }
  })
  return savedHeaders
}

export const postTweetApi = async (content: string, savedHeadersApi) => {
  const apiUrl = 'https://x.com/i/api/graphql/UYy4T67XpYXgWKOafKXB_A'
  const postData = {
    queryId: 'UYy4T67XpYXgWKOafKXB_A',
    variables: {
      tweet_text: content,
      dark_request: false
    },
    features: defaultFeatures
  }

  try {
    const response = await axios.post(apiUrl, postData, { headers: savedHeadersApi })
    console.log('Tweet thành công:', response.data)
  } catch (error) {
    console.error('Lỗi khi đăng tweet:', error)
  }
}
