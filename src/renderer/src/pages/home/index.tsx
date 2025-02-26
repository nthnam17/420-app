import Versions from '@renderer/components/Versions'
import electronLogo from '@renderer/assets/electron.svg'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '@renderer/redux/actions/counterSlice'
import { RootState } from '@renderer/redux/store/store'

const HomePage = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div className="bg-gray-700 h-screen w-screen pt-[100px]">
        <div className="flex flex-col items-center justify-center">
          <img alt="logo" className="w-[200px]" src={electronLogo} />
          <div className="creator">Powered by electron-vite</div>
          <div className="text">
            Build an Electron app with <span className="react">React</span>
            &nbsp;and <span className="ts">TypeScript</span>
          </div>
          <p className="tip">
            Please try pressing <code>F12</code> to open the devTool
          </p>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="actions">
            <div className="action py-2">
              <a
                href="https://electron-vite.org/"
                className="bg-green-500 p-2 m-4 rounded"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>
            </div>
            <div className="action">
              <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
                Send IPC
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-[160px] text-white">
          <h1 className="text-3xl font-bold mb-4 text-success">Counter: {count}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(increment())}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-success"
            >
              Increment
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
            >
              Decrement
            </button>
          </div>
        </div>

        <Versions></Versions>
      </div>
    </>
  )
}

export default HomePage
