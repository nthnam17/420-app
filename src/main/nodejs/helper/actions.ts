import { Page } from 'puppeteer'
import { IHeadersMap } from '../types/actions'
import axios from 'axios'
import { defaultFeatures } from '../actions/crawler/config'

let savedHeaders: IHeadersMap = {}

export const interceptHeaders = async (page: Page) => {
  page.on('request', async (request) => {
    const url = request.url()
    if (url.includes('https://x.com/i/api/graphql/')) {
      console.log('[Request URL]:', url)

      const headers = request.headers()
      console.log(headers, 'header')

      if (!headers.authorization && !headers.cookie) {
        savedHeaders = {}
      }
      savedHeaders = {
        Authorization: headers.authorization,
        Cookie: headers.cookie,
        'Content-Type': 'application/json',
        'User-Agent': headers['user-agent'] || '',
        'x-csrf-token': headers['x-csrf-token'] || ''
      }

      console.log('Headers đã lưu:', savedHeaders)
    }
  })
  return savedHeaders
}

export const postTweetApi = async (content: string, savedHeadersApi: IHeadersMap) => {
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
