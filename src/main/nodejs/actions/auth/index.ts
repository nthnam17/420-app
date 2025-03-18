import { Browser } from 'puppeteer'
import { Users } from '../../../modules/entities/users.entity'

export const login = async (browser: Browser, userData: Users): Promise<any> => {
  const page = await browser.newPage()

  const pages = await browser.pages()

  if (pages && pages.length > 1) pages[0].close()

  await page.waitForNetworkIdle({ idleTime: 2000 })

  return page
}
