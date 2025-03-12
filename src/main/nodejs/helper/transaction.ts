import * as crypto from 'crypto'
import axios from 'axios'

const ON_DEMAND_FILE_REGEX = /['|"]{1}ondemand\.s['|"]{1}:\s*['|"]{1}([\w]*)['|"]{1}/gm
const INDICES_REGEX = /(\(\w{1}\[(\d{1,2})\],\s*16\))+/gm

export class ClientTransaction {
  private static ADDITIONAL_RANDOM_NUMBER = 3
  private static DEFAULT_KEYWORD = 'obfiowerehiring'
  private DEFAULT_ROW_INDEX: number
  private DEFAULT_KEY_BYTES_INDICES: number[]
  private key: string
  private keyBytes: number[]
  private animationKey: string

  constructor(private homePageResponse: string) {
    this.initialize()
  }

  private async initialize(): Promise<void> {
    const { rowIndex, keyBytesIndices } = await this.getIndices(this.homePageResponse)
    this.DEFAULT_ROW_INDEX = rowIndex
    this.DEFAULT_KEY_BYTES_INDICES = keyBytesIndices
    this.key = this.getKey(this.homePageResponse)
    this.keyBytes = this.getKeyBytes(this.key)
    this.animationKey = this.getAnimationKey(this.keyBytes, this.homePageResponse)
  }

  private async getIndices(
    homePageResponse: string
  ): Promise<{ rowIndex: number; keyBytesIndices: number[] }> {
    const keyByteIndices: number[] = []
    const onDemandMatch = ON_DEMAND_FILE_REGEX.exec(homePageResponse)
    if (onDemandMatch) {
      const onDemandFileUrl = `https://abs.twimg.com/responsive-web/client-web/ondemand.s.${onDemandMatch[1]}a.js`
      const { data } = await axios.get(onDemandFileUrl)
      const matches = data.matchAll(INDICES_REGEX)
      for (const match of matches) {
        keyByteIndices.push(parseInt(match[2], 10))
      }
    }
    if (!keyByteIndices.length) throw new Error("Couldn't get KEY_BYTE indices")
    return { rowIndex: keyByteIndices[0], keyBytesIndices: keyByteIndices.slice(1) }
  }

  private getKey(response: string): string {
    const match = response.match(/<meta name='twitter-site-verification' content=['"](.*?)['"]/)
    if (!match) throw new Error("Couldn't get key from the page source")
    return match[1]
  }

  private getKeyBytes(key: string): number[] {
    return Array.from(Buffer.from(key, 'utf-8'))
  }

  private getAnimationKey(keyBytes: number[], response: string): string {
    const total_time = 4096
    const rowIndex = keyBytes[this.DEFAULT_ROW_INDEX] % 16
    const frameTime = this.DEFAULT_KEY_BYTES_INDICES.reduce(
      (acc, index) => acc * (keyBytes[index] % 16),
      1
    )
    const targetTime = frameTime / total_time
    return this.animate(targetTime)
  }

  private animate(targetTime: number): string {
    return crypto.createHash('sha256').update(targetTime.toString()).digest('hex')
  }

  public generateTransactionId(
    method: string,
    path: string,
    timeNow: number = Math.floor((Date.now() - 1682924400000) / 1000)
  ): string {
    const timeNowBytes = [
      timeNow & 0xff,
      (timeNow >> 8) & 0xff,
      (timeNow >> 16) & 0xff,
      (timeNow >> 24) & 0xff
    ]
    const hashVal = crypto
      .createHash('sha256')
      .update(
        `${method}!${path}!${timeNow}${ClientTransaction.DEFAULT_KEYWORD}${this.animationKey}`
      )
      .digest()
    const hashBytes = Array.from(hashVal)
    const randomNum = Math.floor(Math.random() * 256)
    const bytesArr = [
      ...this.keyBytes,
      ...timeNowBytes,
      ...hashBytes.slice(0, 16),
      ClientTransaction.ADDITIONAL_RANDOM_NUMBER
    ]
    const out = [randomNum, ...bytesArr.map((byte) => byte ^ randomNum)]
    return Buffer.from(out).toString('hex')
  }
}
