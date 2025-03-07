import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IpcRendererAccount, IpcRendererActions } from './ipc'
import { IpcApi } from './types'

// Custom APIs for renderer
const api: IpcApi = {
  account: IpcRendererAccount,
  action: IpcRendererActions
}

// Ghi đè navigator bằng Object.defineProperties()
Object.defineProperties(navigator, {
  userAgent: {
    get: () =>
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },
  platform: {
    get: () => 'Win32'
  },
  vendor: {
    get: () => 'Google Inc.'
  }
})

// Giả mạo WebGL Renderer để tránh bị phát hiện qua GPU
const getParameter = WebGLRenderingContext.prototype.getParameter
Object.defineProperty(WebGLRenderingContext.prototype, 'getParameter', {
  value: function (parameter: number) {
    if (parameter === 37445) return 'Intel(R) UHD Graphics' // Fake GPU
    return getParameter.apply(this, [parameter])
  }
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
