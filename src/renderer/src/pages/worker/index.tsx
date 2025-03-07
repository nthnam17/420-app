import { useState } from 'react'

const { ipcRenderer } = window.electron

const WorkerPage = () => {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')

  const selectFile = async (): Promise<void> => {
    const path = await ipcRenderer.invoke('start_job')
    if (path) {
      setFilePath(path)
      setResult('')
    }
  }

  const processFile = async () => {
    if (!filePath) return alert('Vui lòng chọn file trước!')

    try {
      const lineCount = await ipcRenderer.invoke('process-file', filePath)
      setResult(`File có ${lineCount} dòng!`)
    } catch (error) {
      setResult(`Lỗi: ${error}`)
    }
  }

  return (
    <div className="pt-10">
      <h1 className="text-black">Đếm số dòng trong file</h1>
      <button className="text-white bg-blue-500 rounded-md p-2" onClick={selectFile}>
        Chọn file
      </button>
      {filePath && <p className="text-black">File: {filePath}</p>}
      <button
        className="text-white bg-green-500 rounded-md p-2 ml-2"
        onClick={processFile}
        disabled={!filePath}
      >
        Bắt đầu xử lý
      </button>
      <p className="text-black">{result}</p>
    </div>
  )
}

export default WorkerPage
