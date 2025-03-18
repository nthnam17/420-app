import { Cookie, Page } from 'puppeteer'

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const createXpath = (xpath: string): string => `xpath/${xpath}`

export const checkExitsElement = async (page: Page, selector: string): Promise<boolean> => {
  const element = await page.$$(`${selector}`)
  if (!element) return false
  return true
}

export function getCookieString(cookies: Cookie[]): string {
  return cookies
    .map((cookie) => {
      return `${cookie.name}=${cookie.value}`
    })
    .filter(Boolean)
    .join(';')
}

export function getCsrfTokenFromCookie(cookies: string): string {
  const match = cookies.match(/csrftoken=([^;]+)/)
  return match ? match[1] : ''
}

export function convertCookies(cookieString: string): Cookie[] {
  const cookieArray = cookieString?.split(';').filter((cookie) => cookie?.trim() !== '')
  return cookieArray.map((cookie) => {
    const [name, value] = cookie.split('=')
    return {
      name: name?.trim(),
      value: value?.trim()
    } as Cookie
  })
}

export const clickForXpathAndReject = async (page, xpath): Promise<boolean> => {
  try {
    const [element] = await page.$x(`//${xpath}`)
    if (!element) {
      throw new Error(`Element with XPath "${xpath}" not found`)
    }
    await element.click()
    return true
  } catch (error) {
    throw new Error(`${error}`)
  }
}
