import { Page } from 'puppeteer'
import { Users } from '../../../modules/entities/users.entity'

export const login = async (page: Page, userData: Users): Promise<void> => {
  const linkLogin = await page.waitForSelector('[data-testid="loginButton"]')

  if (linkLogin) {
    linkLogin.click()
    await page.waitForNetworkIdle({ idleTime: 3000 })
    ///////////////////////////////////////////////////////////////////////////////////`
    // Select the user input
    await page.waitForSelector('[autocomplete=username]')
    await page.type('input[autocomplete=username]', userData.username, { delay: 50 })
    // Press the Next button
    const nextBtn = await page.$$('button')
    if (nextBtn && nextBtn.length >= 3) nextBtn[2].click()
    await page.waitForNetworkIdle({ idleTime: 1500 })
    ///////////////////////////////////////////////////////////////////////////////////
    // Sometimes twitter suspect suspicious activties, so it ask for your handle/phone Number
    const extractedText = await page.content()
    if (extractedText.includes('Enter your phone number or email address')) {
      await page.waitForSelector('[autocomplete=on]')
      await page.type('input[autocomplete=on]', userData.email ?? '', { delay: 50 })
      const btnVerifi = await page.$$('button')
      if (btnVerifi && btnVerifi.length >= 2) btnVerifi[1].click()
      await page.waitForNetworkIdle({ idleTime: 1500 })
    }
    ///////////////////////////////////////////////////////////////////////////////////
    // Select the password input
    await page.waitForSelector('[autocomplete="current-password"]')
    await page.type('[autocomplete="current-password"]', userData.password ?? '123456', {
      delay: 50
    })

    const loginBtn = await page.$$('button')
    if (loginBtn && loginBtn.length >= 4) loginBtn[3].click()
    await page.waitForNetworkIdle({ idleTime: 2000 })
  }
}
