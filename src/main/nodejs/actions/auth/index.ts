import { Browser } from 'puppeteer'
import { Users } from '../../../modules/entities/users.entity'

export const login = async (browser: Browser, userData: Users): Promise<any> => {
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

  const page = await browser.newPage()

  // Set cookies for the page session
  await page.setCookie(...cookiesConfig)

  await page.goto('https://x.com')

  const pages = await browser.pages()

  if (pages && pages.length > 1) pages[0].close()

  await page.waitForNetworkIdle({ idleTime: 2000 })

  const linkLogin = await page.$('[data-testid="loginButton"]')

  if (linkLogin) {
    linkLogin.click()
    await page.waitForNetworkIdle({ idleTime: 2000 })
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

    await page.waitForNetworkIdle({ idleTime: 1000 })

    // const cookies = await page.cookies()

    // const token = cookies.find((cookie) => cookie.name === 'auth_token')?.value

    // const cookie = cookies.find((cookie) => cookie.name === 'ct0')?.value

    // userData.token = token ?? ''
    // userData.cookie = cookie ?? ''
  }

  return page
}
