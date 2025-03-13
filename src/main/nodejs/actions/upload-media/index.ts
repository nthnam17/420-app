import path from 'path'
import { Page } from 'puppeteer'
import fs from 'fs'
import { evaluateWithParams } from '../../helper/crawler'
import { createHash, randomBytes } from 'crypto'
import { IMediaResponseInit } from '../../types/actions'

export const uploadMedia = async (page: Page): Promise<void> => {
  let accessToken = ''
  let csrfToken = ''
  const getToken = (): Promise<void> => {
    return new Promise((resolve) => {
      page.on('request', (request) => {
        if (request.url().includes('https://x.com/i/api/')) {
          const reqHeaders = request.headers()

          if (reqHeaders['authorization'] && reqHeaders['x-csrf-token']) {
            accessToken = reqHeaders['authorization']
            csrfToken = reqHeaders['x-csrf-token']

            console.log('Access Token:', accessToken)
            console.log('CSRF Token:', csrfToken)
          }
          if (accessToken && csrfToken) {
            page.removeAllListeners('request')
            resolve()
          }
        }
      })
    })
  }

  await getToken()

  const headerUpdate = {
    authorization: accessToken,
    'x-csrf-token': csrfToken,
    referer: 'https://x.com/',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'x-client-transaction-id':
      '15dvwB71HyZTVaoYSmqYEWzgqPW0QeRsqMWQ1VgB0NgA/DDSGah1yHkedcaJT45NfqY7VtSI4tXtqryqxCQ/kLkOxm1L1A',
    'x-twitter-active-user': 'yes',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-twitter-client-language': 'vi'
  }

  const url = 'https://upload.x.com/i/media/upload.json'

  const publicPath = path.join(__dirname, '../../resources')

  const getFile = async (
    publicPath: string,
    filename: string
  ): Promise<{ fileType: string; fileSize: number; filePath: string }> => {
    let fileType = ''
    let fileSize = 0
    let filePath = ''
    const files = fs.readdirSync(publicPath)

    const file = files.find((f) => f.startsWith(filename))

    if (file) {
      filePath = path.join(publicPath, file)
      const _fileType = path.extname(file)
      fileSize = fs.statSync(filePath).size

      fileType = _fileType.replace(/\./g, '')
    } else {
      console.log("Không tìm thấy file có tên 'upload1'")
    }
    return { fileSize, fileType, filePath }
  }

  const { fileSize, fileType, filePath } = await getFile(publicPath, 'upload1')

  const params = {
    command: 'INIT',
    total_bytes: fileSize,
    media_type: `image/${fileType}`,
    media_category: 'tweet_image'
  }

  const resInit: IMediaResponseInit = await evaluateWithParams(
    page,
    async function uploadInit(
      url: string,
      params: {
        command: string
        total_bytes: number
        media_type: string
        media_category: string
      },
      header: any
    ) {
      const response = await fetch(
        `${url}?command=${params.command}&total_bytes=${params.total_bytes}&media_type=${params.media_type}&media_category=${params.media_category}`,
        {
          method: 'POST',
          headers: header,
          credentials: 'include'
        }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      return data
    },
    [url, params, headerUpdate]
  )

  if (!resInit) {
    console.log('Upload Command Init Erorr!!!')
    return
  }

  const prepareFileChunks = async (filePath: string) => {
    const fileStream = fs.createReadStream(filePath, { highWaterMark: 4 * 1024 * 1024 })
    const chunks: Buffer[] = []

    for await (const chunk of fileStream) {
      chunks.push(chunk)
    }

    return chunks
  }

  const hashMedia = async (filePath: string): Promise<string> => {
    const fileBuffer = fs.readFileSync(filePath)

    const md5Hash = createHash('md5').update(fileBuffer).digest('hex')

    return md5Hash
  }

  const chunks = await prepareFileChunks(filePath)

  await evaluateWithParams(
    page,
    async function uploadChunks(chunks: Buffer[], url: string, mediaId: string, header: any) {
      let i = 0
      for (const chunk of chunks) {
        const params = new URLSearchParams({
          command: 'APPEND',
          media_id: mediaId,
          segment_index: i.toString()
        })

        try {
          const formData = new FormData()
          formData.append('media', new Blob([chunk]))
          await fetch(`${url}?${params}`, {
            method: 'POST',
            body: formData,
            headers: header,
            credentials: 'include'
          })
        } catch (error) {
          console.error('Failed to upload chunk', error)
        }

        i++
      }
    },
    [chunks, url, resInit.media_id_string, headerUpdate]
  )

  const codeHashed = await hashMedia(filePath)

  const resFinalize = await evaluateWithParams(
    page,
    async function uploadFinalize(mediaId: string, url: string, header: any, md5Hash: string) {
      const params = new URLSearchParams({
        command: 'FINALIZE',
        media_id: mediaId,
        original_md5: md5Hash
      })

      const res = await fetch(`${url}?${params}`, {
        method: 'POST',
        headers: header,
        credentials: 'include'
      })

      if (!res.ok) {
        console.log(`Upload Finalize error code: ${res.status}`)
      }

      const data = res.json()

      return data
    },
    [resInit.media_id_string, url, headerUpdate, codeHashed]
  )

  console.log(resFinalize, 'finaly')
}
