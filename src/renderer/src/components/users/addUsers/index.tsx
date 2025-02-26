import AddUser from '@renderer/redux/actions/userActions/addUserActions'
import UpdateUser from '@renderer/redux/actions/userActions/updateUserActions'
import { AppDispatch } from '@renderer/redux/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface userUpdateType {
  id: number
  name: string
  username: string
  password: string
  email: string
  status: number
}

interface updateProps {
  dataUser: userUpdateType
  onData: (payload: userUpdateType, type: number) => void
}

const AddUsers: React.FC<updateProps> = ({ dataUser }) => {
  const [username, setUsername] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState(0)
  const [id, setId] = useState<number>(0)

  const useAppDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (dataUser.name !== '' && dataUser.password !== '') {
      setUsername(dataUser.username)
      setName(dataUser.name)
      setPassword(dataUser.password)
      setEmail(dataUser.email)
      setStatus(dataUser.status)
      setId(dataUser?.id)
    }
  }, [dataUser])

  const statusValue = [
    { title: 'name', val: 1 },
    { title: 'nữ', val: 2 }
  ]

  const resetForm = () => {
    setUsername('')
    setName('')
    setPassword('')
    setEmail('')
    setStatus(0)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      if (id == 0) {
        const paload = {
          name: name,
          email: email,
          username: username,
          password: password,
          status: status
        }

        const res = await useAppDispatch(AddUser(paload))

        console.log(res, 'res')

        if (res) {
          resetForm()
        }
      } else {
        const paload = {
          id: id,
          name: name,
          email: email,
          username: username,
          password: password,
          status: status
        }

        const res = await useAppDispatch(UpdateUser(paload))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="w-screen shadow-md rounded-lg">
        <h3>Thêm mới bản ghi</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex justify-around">
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
              <label className="block text-gray-600">Tên</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
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
          </div>

          <div className="flex justify-around">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                placeholder="Nhập eamil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-3 pb-4">
              <label className="block text-gray-600">Trạng thái</label>
              <select
                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                onChange={(e) => setStatus(Number(e.target.value))}
                value={status}
              >
                {statusValue.map((item, index) => (
                  <option key={index} value={item.val}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button className="w-50 mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                {dataUser.name !== '' ? 'Cập nhập' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUsers
