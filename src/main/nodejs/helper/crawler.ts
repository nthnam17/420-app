import { Page } from 'puppeteer'

export const decodeToJson = (encodedStr): JSON => {
  const decodedStr = decodeURIComponent(encodedStr)
  const array = JSON.parse(decodedStr)
  return array
}

export const encodeToJson = (obj): string => {
  const jsonStr = JSON.stringify(obj)
  const url = encodeURIComponent(jsonStr)

  return url
}

type EvaluateReturnType<T = unknown> = () => T

export async function evaluate<T>(page: Page, fn: string): Promise<Awaited<T>> {
  return page.evaluate<[], EvaluateReturnType<T>>(`(${fn.toString()})()`)
}

export function evaluateWithParams<T>(
  page: Page,
  fn: (...args: any[]) => any,
  params: unknown[]
): Promise<Awaited<T>> {
  const paramsAsString = params.map((val) => JSON.stringify(val)).join()
  return page.evaluate<[], EvaluateReturnType<T>>(`(${fn.toString()})(${paramsAsString})`)
}

//example
// await evaluate(page, 'async function getData(){ return .... }')      // Không cần truyền tham số
// await evaluateWithParams<T>(page, 'async function getData(payload1, payload2){ return .... }', [payload1, payload2]) // cần truyền tham số
