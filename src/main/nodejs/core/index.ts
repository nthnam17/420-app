import { IBrowser } from './../types/core'
import { auth } from './base/auth'

export class coreClass {
  protected auth: auth

  constructor(payload: IBrowser) {
    this.auth = new auth(payload)
  }

  public get Auth(): auth {
    return this.auth
  }
}
