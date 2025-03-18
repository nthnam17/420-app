import {
  checkExitsElement,
  convertCookies,
  getCookieString,
  getCsrfTokenFromCookie
} from './../../utils/index'
import { baseActions, IBrowser, loginResponse, payloadLogin } from '../../types/core'
import { navigateToHome, navigateToLogin } from '../navigations'
import { Cookie, Page } from 'puppeteer'

export class auth extends baseActions {
  constructor(payload: IBrowser) {
    super(payload)
  }

  public async loginNomal(
    data: payloadLogin,
    updateMessage?: (message?: string) => Promise<boolean>
  ): Promise<loginResponse> {
    await navigateToHome(this.actions)

    const res = await this.checkLogin()

    if (res.success) {
      if (updateMessage) updateMessage(res.message)
      return res
    } else if (!res.success && res.message === 'login_fail') {
      if (updateMessage) updateMessage(res.message)
      return res
    }

    await navigateToLogin(this.actions)

    ///////////////////////////////////////////////////////////////////////////////////`
    // Select the user input
    await this.actions.waitForSelector('[autocomplete=username]')
    await this.actions.type('input[autocomplete=username]', data.username, { delay: 50 })
    // Press the Next button
    const nextBtn = await this.actions.$$('button')
    if (nextBtn && nextBtn.length >= 3) nextBtn[2].click()

    await this.checkVerify(this.actions, data)

    ///////////////////////////////////////////////////////////////////////////////////
    // Select the password input
    await this.actions.waitForSelector('[autocomplete="current-password"]')
    await this.actions.type('[autocomplete="current-password"]', data.password ?? '123456', {
      delay: 50
    })

    const loginBtn = await this.actions.$$('button')
    if (loginBtn && loginBtn.length >= 4) loginBtn[3].click()

    return await this.checkLogin()
  }

  public async loginWithCookies(cookies: string | Cookie[]): Promise<loginResponse> {
    await navigateToHome(this.actions)

    const res = await this.checkLogin()

    if (res.success) {
      return res
    }

    if (!cookies || cookies.length === 0) {
      throw new Error('Cookies is require field !!!')
    }

    if (typeof cookies === 'string') {
      cookies = convertCookies(cookies)
    }

    this.browser.setCookie(...cookies)
    this.actions.reload()
    return await this.checkLogin()
  }

  public async updateAuthData(): Promise<void> {
    this.userData.cookies = getCookieString((await this.browser.cookies()) as Cookie[])
    this.UserData.token = getCsrfTokenFromCookie(this.userData.cookies)
  }

  public async checkLogin(): Promise<loginResponse> {
    await navigateToHome(this.actions)

    const status: loginResponse = {
      success: false,
      message: 'login_fail'
    }

    const eleHome = await checkExitsElement(this.actions, '[aria-label="Home"]')

    if (eleHome) this.userData.isLoggedIn = typeof eleHome === 'boolean'

    if (!this.userData.isLoggedIn) {
      const cookies = (await this.browser.cookies()) as Cookie[]
      this.userData.isLoggedIn = cookies.some(
        (cookie) => cookie.name === 'cto' && cookie.domain === 'x.com'
      )
    }

    if (this.userData.isLoggedIn) {
      status.message = 'login_success'
      status.success = true

      this.updateAuthData()
    }

    return status
  }

  private async checkVerify(page: Page, userData: payloadLogin): Promise<void> {
    const extractedText = await page.content()
    if (extractedText.includes('Enter your phone number or email address')) {
      await page.waitForSelector('[autocomplete=on]')
      await page.type('input[autocomplete=on]', userData.email ?? userData.phone ?? '', {
        delay: 50
      })
      const btnVerifi = await page.$$('button')
      if (btnVerifi && btnVerifi.length >= 2) btnVerifi[1].click()
      await page.waitForNetworkIdle({ idleTime: 1500 })
    }
  }
}
