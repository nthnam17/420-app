import seeding from '@renderer/redux/actions/jobActions/seedingActions'
import seedingProfile from '@renderer/redux/actions/jobActions/seedingProfileActions'
import { AppDispatch } from '@renderer/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const useAppDispatch = useDispatch<AppDispatch>()

  const seedingActions = async (): Promise<void> => {
    useAppDispatch(seeding())
  }

  const seedingProfileActions = async (): Promise<void> => {
    useAppDispatch(seedingProfile())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-screen h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 w-[700px]">

        {/* Các button */}
        <div className="flex justify-between mt-4">
          <button onClick={seedingActions} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Chạy seeding
          </button>
          <button onClick={seedingProfileActions} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Seeding Profile
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Crawler Tweets
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage
