import { Browser, Page } from 'puppeteer'
import { coreClass } from '../core'
import { Users } from '../../modules/entities/users.entity'

export interface IActionData {
  xAction: coreClass
  action: Page
  account: Users
  // settings: ISettingSystem
  // config?:
  //   | IConfigSendMessage
  //   | IConfigInteraction
  //   | IConfigScanAccountFunction
  //   | IConfigPostReel
  //   | IPostInstagramConfig
  //   | IConfigScanPostFunction
  //   | IConfigScanAccountFunction
  //   | IConfigScanCommentFunction
  //   | IConfigScanInteractionFunction
  //   | IConfigSeedingFunction
  //   | IConfigChangeInfoAccount
  //   | IConfigChangeSecurityAccount
  //   | IConfigRegisterInstagram
  //   | IConfigUnfollowFunction
  actionName: IFeatureName
  browser: Browser
  // globalData?: IGlobalData
  parentPort: MessagePort
  // data: IMktBrowserOption
  // updateNote(key: string): Promise<void>
  // createNewProfile: (payload: IActionData) => Promise<IChangeFolderProfile>
  // ip?: string
  // mktFb?: MktFb
  // mktHmail: MktHmail
  // jobModel: MktJobDb
  // updateLog(key: string, jobDb: MktJobDb, mess?: string): Promise<boolean>
}

export type IFeatureName = 'login' | 'interaction'

export const implementActions = async (payload: IActionData): Promise<void> => {
  const { account, browser, action, xAction, parentPort, actionName } = payload

  switch (actionName) {
    case 'login': {
      const res = await xAction.Auth.checkLogin()
      let mess: string = 'login_success'
      if (res.success && res.message === 'login_success') mess = 'login_success'

      const status = await xAction.Auth.loginNomal()
      break
    }
    default: {
      const res = await xAction.Auth.checkLogin()
      let mess: string = 'login_success'
      if (res.success && res.message === 'login_success') mess = 'login_success'
      else if (!account.cookie) {
        mess = 'login_faild'
      } else {
        const status = await xAction.Auth.loginWithCookies(account.cookie)

        if (status.success && res.message === 'login_success') mess = 'login_success'
      }
      break
    }
  }

  if (xAction.Auth.UserData.isLoggedIn) {
  }
}
