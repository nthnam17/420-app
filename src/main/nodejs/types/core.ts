import { Browser, Page } from 'puppeteer'
import { navigateToHome } from '../core/navigations'

export type IInformationInstagram = {
  bio: string
  birthday: string
  gender: number
  first_name: string
  is_email_confirmed: boolean
  is_phone_confirmed: boolean
  phone_number: string
  username: string
  email: string
  external_url: string
}

export type UserData = {
  isLoggedIn: boolean
  cookies: string
  token: string
  app_id: string
  fbidv2: string
  id_insta: string
  profile: IInformationInstagram
}

export const defaultUserData: UserData = {
  isLoggedIn: false,
  cookies: '',
  token: '',
  app_id: '',
  fbidv2: '',
  id_insta: '',
  profile: {
    bio: '',
    birthday: '',
    gender: 1,
    first_name: '',
    is_email_confirmed: false,
    is_phone_confirmed: false,
    phone_number: '',
    username: '',
    email: '',
    external_url: ''
  }
}

export interface IBrowser {
  actions: Page
  browser: Browser
}

export class baseActions {
  protected actions: Page
  protected browser: Browser
  protected userData: UserData

  constructor(payload: IBrowser, userData?: UserData) {
    this.browser = payload.browser
    this.actions = payload.actions
    this.userData = userData ?? defaultUserData
  }

  //func getters

  public get UserData(): UserData {
    return this.userData
  }

  public get Actions(): Page {
    return this.actions
  }

  // navigate &&  check login
  public async preCheck(): Promise<boolean> {
    if (this.actions) await navigateToHome(this.actions)

    return this.UserData.isLoggedIn
  }
}

export interface loginResponse {
  success: boolean
  message: string
}

export interface payloadLogin {
  username: string
  password: string
  phone?: string
  email?: string
}
