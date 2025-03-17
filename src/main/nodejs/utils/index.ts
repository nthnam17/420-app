export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const createXpath = (xpath: string): string => `xpath/${xpath}`
