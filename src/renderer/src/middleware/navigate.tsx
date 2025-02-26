import { RootState } from '@renderer/redux/store/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((state: RootState) => state.auth)
  return auth ? children : <Navigate to="/login" />
}

export default PrivateRoute
