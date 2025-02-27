import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from '@renderer/pages/home'
import UsersPage from '@renderer/pages/users'
import PostsPage from '@renderer/pages/posts'
import PrivateRoute from '@renderer/middleware/navigate'
import LoginPage from '@renderer/pages/login'
import WorkerPage from '@renderer/pages/worker'

const Menu = () => {
  return (
    <BrowserRouter>
      <nav className="bg-blue-600 p-4 w-screen fixed top-0 left-0">
        <div className="container">
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-gray-200 px-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/users" className="text-white hover:text-gray-200 px-1">
                Users
              </Link>
            </li>
            <li>
              <Link to="/posts" className="text-white hover:text-gray-200 px-1">
                Do Some Think
              </Link>
            </li>
            <li>
              <Link to="/worker" className="text-white hover:text-gray-200 px-1">
                Worker
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {' '}
              <HomePage></HomePage>{' '}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <PrivateRoute>
              {' '}
              <UsersPage></UsersPage>{' '}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              {' '}
              <PostsPage></PostsPage>{' '}
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/worker"
          element={
            <PrivateRoute>
              {' '}
              <WorkerPage></WorkerPage>{' '}
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Menu
