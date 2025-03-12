import path from 'path'
import { Page } from 'puppeteer'
import fs from 'fs/promises'
import { evaluateWithParams } from '../../helper/crawler'

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
    'x-twitter-client-language': 'vi',
    'content-type': 'application/json'
  }

  const url = 'https://upload.x.com/i/media/upload.json'

  const publicPath = path.join(__dirname, 'public')

  const getFile = async (
    publicPath: string,
    filename: string
  ): Promise<{ fileType: string; fileSize: number }> => {
    let fileType = ''
    let fileSize = 0
    const files = await fs.readdir(publicPath)

    const file = files.find((f) => f.startsWith(filename))

    if (file) {
      const filePath = path.join(publicPath, file)
      fileType = path.extname(file)
      fileSize = (await fs.stat(filePath)).size

      console.log('File tìm thấy:', filePath)
      console.log('Đuôi file:', fileSize)
    } else {
      console.log("Không tìm thấy file có tên 'upload1'")
    }
    return { fileSize, fileType }
  }

  const { fileSize, fileType } = await getFile(publicPath, 'upload1')

  const params = {
    command: 'INIT',
    total_bytes: fileSize,
    media_type: `image/${fileType}`,
    media_category: 'tweet_image'
  }

  const resInit = await evaluateWithParams(
    page,
    async function uploadFile(
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
          headers: {
            header
          },
          credentials: 'include'
        }
      )
      if (!response.ok) {
        console.log(response)

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

  const uploadFile = async (
    filePath: string,
    url: string,
    mediaId: string,
    debug: boolean = false,
    fileSize: number
  ) => {
    const fileStream = await fs.createReadStream(filePath, { highWaterMark: 4 * 1024 * 1024 })
    const progressBar = readline.createInterface({ input: process.stdin, output: process.stdout })

    let i = 0
    let uploadedBytes = 0

    for await (const chunk of fileStream) {
      const params = new URLSearchParams({
        command: 'APPEND',
        media_id: mediaId,
        segment_index: i.toString()
      })

      try {
        const pad = randomBytes(16).toString('hex')
        const boundary = `----WebKitFormBoundary${pad}`
        const data = Buffer.concat([
          Buffer.from(
            `--${boundary}\r\nContent-Disposition: form-data; name=\"media\"; filename=\"blob\"\r\nContent-Type: application/octet-stream\r\n\r\n`
          ),
          chunk,
          Buffer.from(`\r\n--${boundary}--\r\n`)
        ])

        await fetch(url, {
          method: 'POST',
          body: data,
          headers,
          query: params
        })
      } catch (error) {
        if (debug) console.error('Failed to upload chunk, trying alternative method:', error)
        try {
          const formData = new FormData()
          formData.append('media', new Blob([chunk]))
          await fetch(url, {
            method: 'POST',
            body: formData,
            query: params
          })
        } catch (error) {
          if (debug) console.error('Failed to upload chunk:', error)
          return
        }
      }

      uploadedBytes += chunk.length
      progressBar.write(
        `\rUploading: ${filePath} - ${((uploadedBytes / fileSize) * 100).toFixed(2)}%`
      )
      i++
    }
    progressBar.close()
  }

  queryString {
    command: FINALIZE
media_id: 1899824011422621696
original_md5: a163a41f45e6e644ccce0c35de043d07
  }
  // Đọc toàn bộ nội dung của file dưới dạng Buffer
  const fileBuffer = readFileSync(filePath)

  // Tạo hash MD5
  const md5Hash = createHash('md5').update(fileBuffer).digest('hex')
  // const checkSizeUpload = () => {}
}
