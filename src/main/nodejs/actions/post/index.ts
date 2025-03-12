import { Page } from 'puppeteer'
// import { interceptHeaders, postTweetApi } from './helper'
// import { defaultFeatures } from '../crawler/config'
// import axios from 'axios'

export const postTweet = async (page: Page): Promise<void> => {
  //   let savedHeaders = {}
  //   page.on('request', async (request) => {
  //     const url = request.url()
  //     if (url.includes('https://x.com/i/api/graphql/')) {
  //       console.log('[Request URL]:', url)
  //       const headers = request.headers()
  //       console.log(headers, 'header')
  //       savedHeaders = headers
  //     }
  //   })
  //   await page.waitForNetworkIdle({ idleTime: 2000 })
  //   const apiUrl = 'https://x.com/i/api/graphql/UYy4T67XpYXgWKOafKXB_A'
  //   const postData = {
  //     queryId: 'UYy4T67XpYXgWKOafKXB_A',
  //     variables: {
  //       tweet_text: '123456dfsad',
  //       dark_request: false
  //     },
  //     features: defaultFeatures
  //   }
  //   try {
  //     const response = await axios.post(apiUrl, postData, { headers: savedHeaders })
  //     console.log('Tweet thành công:', response.data)
  //   } catch (error) {
  //     console.error('Lỗi khi đăng tweet:', error)
  //   }
}
