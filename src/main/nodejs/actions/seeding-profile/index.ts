import { Page } from 'puppeteer'

export const seedingProfile = async (page: Page): Promise<void> => {
  const articleTag = await page.$$('article[role="article"]')
  if (articleTag && articleTag.length >= 1) {
    const linkProfile = await articleTag[0].$$('a[role="link"]')
    if (linkProfile && linkProfile.length >= 1) {
      linkProfile[0].click()
    }
  }
}
