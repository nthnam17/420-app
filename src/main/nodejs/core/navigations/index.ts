import { Page } from 'puppeteer'
import { delay } from '../../utils'
import { HOME_URL } from '../constans/navigations'

function extractProtocolAndDns(url: string): { protocol: string; dns: string } {
  const urlPattern = /^(https?):\/\/([^/]+)(\/.*)?$/
  const match = url.match(urlPattern)

  if (!match) {
    throw new Error('Invalid URL format')
  }

  const protocol = match[1] // Phần giao thức (https)
  const dns = match[2] + (match[3] || '') // Phần DNS, bao gồm cả đường dẫn

  return { protocol, dns }
}

export async function naviagteToPage(page: Page, url: string): Promise<boolean> {
  const splitUrl = extractProtocolAndDns(url)
  const urlPageHere = page.url()

  if (
    urlPageHere.includes(`${splitUrl.protocol}://${splitUrl.dns}`) ||
    urlPageHere.includes(`${splitUrl.protocol}://www.${splitUrl.dns}`)
  ) {
    return true
  } else {
    await page.goto(url, { waitUntil: ['domcontentloaded', 'load'] })
    await delay(2000)
  }
  return true
}

export async function navigateToHome(page: Page): Promise<void> {
  await naviagteToPage(page, HOME_URL)
}
