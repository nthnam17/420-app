import useAppDispatch from '@renderer/lib/hook/useAppDispatch'
import Login from '@renderer/redux/actions/authActions'
import { useState } from 'react'

interface loginData {
  username: string
  password: string
}

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      console.log('Email:', username)
      console.log('Password:', password)

      const dataForm = {
        username: username,
        password: password
      } as loginData
      const res: any = await dispatch(Login(dataForm))

      console.log(res, 'res')

      if (!res) {
        return
      }
    } catch (error) {
      console.log(error, 'erorr')
    }
  }
  return (
    <>
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-center text-gray-700">Đăng nhập</h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600">Username</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mt-3 pb-4">
              <label className="block text-gray-600">Mật khẩu</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <a href="#" className="text-blue-500">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
