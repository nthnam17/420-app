export const handleXMigration = async (session: any): Promise<string | null> => {
  let homePage: string | null = null
  const migrationRedirectionRegex = new RegExp(
    /(http(?:s)?:\/\/(?:www\.)?(twitter|x){1}\.com(\/x)?\/migrate([\/?])?tok=[a-zA-Z0-9%\-_]+)+/g
  )

  const response = await session.get('https://x.com')
  homePage = response.data
  const migrationUrlMatch = homePage?.match(
    /meta\s+http-equiv=['"]refresh['"]\s+content=['"]([^'"]+)['"]/i
  )
  const migrationRedirectionUrl = migrationUrlMatch
    ? migrationRedirectionRegex.exec(migrationUrlMatch[1])
    : migrationRedirectionRegex.exec(response.data)

  if (migrationRedirectionUrl) {
    const migrationResponse = await session.get(migrationRedirectionUrl[0])
    homePage = migrationResponse.data
  }

  const formMatch =
    homePage?.match(/<form[^>]+name=['"]f['"][^>]*>([\s\S]*?)<\/form>/i) ||
    homePage?.match(/<form[^>]+action=['"]https:\/\/x.com\/x\/migrate['"][^>]*>([\s\S]*?)<\/form>/i)

  if (formMatch) {
    const actionMatch = formMatch[0].match(/action=['"]([^'"]+)['"]/i)
    const methodMatch = formMatch[0].match(/method=['"]([^'"]+)['"]/i)
    const url = actionMatch ? actionMatch[1] : 'https://x.com/x/migrate'
    const method = methodMatch ? methodMatch[1].toUpperCase() : 'POST'

    const requestPayload: Record<string, string> = {}
    const inputMatches = [...formMatch[0].matchAll(/<input[^>]+name=['"]([^'"]+)['"][^>]*>/gi)]
    inputMatches.forEach((match) => {
      const valueMatch = match[0].match(/value=['"]([^'"]*)['"]/i)
      requestPayload[match[1]] = valueMatch ? valueMatch[1] : ''
    })

    const formResponse = await session({ method, url, data: requestPayload })
    homePage = formResponse.data
  }
  return homePage
}

export const floatToHex = (x: number): string => {
  const result: string[] = []
  let quotient = Math.floor(x)
  let fraction = x - quotient

  while (quotient > 0) {
    const remainder = quotient % 16
    quotient = Math.floor(quotient / 16)
    result.unshift(remainder > 9 ? String.fromCharCode(remainder + 55) : remainder.toString())
  }

  if (fraction === 0) return result.join('')
  result.push('.')

  while (fraction > 0) {
    fraction *= 16
    const integer = Math.floor(fraction)
    fraction -= integer
    result.push(integer > 9 ? String.fromCharCode(integer + 55) : integer.toString())
  }
  return result.join('')
}

export const isOdd = (num: number): number => {
  return num % 2 ? -1.0 : 0.0
}

export const base64Encode = (input: string | Buffer): string => {
  const buffer = typeof input === 'string' ? Buffer.from(input) : input
  return buffer.toString('base64')
}

export const base64Decode = (input: string): string => {
  try {
    return Buffer.from(input, 'base64').toString('utf-8')
  } catch (e) {
    console.log(e)

    return JSON.stringify([...Buffer.from(input, 'utf-8')])
  }
}
