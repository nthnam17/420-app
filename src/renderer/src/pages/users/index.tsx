import TableComponent from '@renderer/components/table'
import AddUsers from '@renderer/components/users/addUsers'
import { useDebounce } from '@renderer/lib/hook/useDebounce'
import DeleteUser from '@renderer/redux/actions/userActions/deleteUserActions'
import FetchUsers from '@renderer/redux/actions/userActions/fetchUserActions'
import { AppDispatch, RootState } from '@renderer/redux/store/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface user {
  name: string
  username: string
  password: string
  email: string
  status: number
}

interface userUpdateType {
  id: number
  name: string
  username: string
  password: string
  email: string
  status: number
}

const UsersPage = () => {
  const useAppDispatch = useDispatch<AppDispatch>()
  const listUsers: any = useSelector((state: RootState) => state.user.listUser)
  const [params, setParams] = useState('')
  const [oneUser, setOneUser] = useState<userUpdateType>({
    id: 0,
    name: '',
    username: '',
    password: '',
    email: '',
    status: 0
  })

  // Reset dữ liệu
  const handleReset = () => {
    setParams('')
  }

  useDebounce(params, 500)

  useEffect(() => {
    handleFetchUsers(params)
  }, [params])

  const columns = ['STT', 'Tên đăng nhập', 'Tên', 'Email', 'Trạng thái', 'Hành động', 'Hành động']
  const handleFetchUsers = async (param) => {
    try {
      const res = await useAppDispatch(FetchUsers(param))

      if (!res) {
        console.log('Lỗi không xác định vui lòng thử lại sau !!!')
      }
    } catch (e) {
      console.log(e, 'error')
      return
    }
  }

  const handleUpdate = (id: number) => {
    const dataOne = listUsers.find((val) => val?.id === id)
    setOneUser(dataOne)
  }

  const handleDelete = async (id: number) => {
    const res = await useAppDispatch(DeleteUser(id))

    if (!res) {
      console.log('Có lỗi xảy ra vui lòng thử lại !')
    }
  }

  const handlePostData = () => {}
  return (
    <>
      <div className="h-screen w-screen pt-15">
        {/* Thanh tìm kiếm */}
        <div className="flex px-5">
          <input
            type="text"
            placeholder="🔍 Nhập để tìm kiếm..."
            value={params}
            onChange={(e) => setParams(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleReset}
            className="px-4 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
        <TableComponent
          columns={columns}
          data={listUsers}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        ></TableComponent>
        <AddUsers onData={handlePostData} dataUser={oneUser}></AddUsers>
      </div>
    </>
  )
}

export default UsersPage
