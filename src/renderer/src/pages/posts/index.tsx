// import { ipcRenderer } from "electron/renderer";
// import { useState } from "react";

import startJob from "@renderer/redux/actions/jobActions/startJobActions"
import { AppDispatch } from "@renderer/redux/store/store"
import { useDispatch } from "react-redux"

const PostPage = () => {
  const useAppDispatch = useDispatch<AppDispatch>()

  const seeding_actions = async (): Promise<void> => {
    useAppDispatch(startJob())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-screen h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        {/* Các ô input
        <div className="space-y-10">
          <input

            type="text"
            name="input1"
            value={formData.input1}
            onChange={handleChange}
            placeholder="Nhập dữ liệu 1"
            className="w-full p-2 border rounded-lg text-black mb-2"
          />
          <input
            type="text"
            name="input2"
            value={formData.input2}
            onChange={handleChange}
            placeholder="Nhập dữ liệu 2"
            className="w-full p-2 border rounded-lg text-black mb-2"
          />
          <input
            type="text"
            name="input3"
            value={formData.input3}
            onChange={handleChange}
            placeholder="Nhập dữ liệu 3"
            className="w-full p-2 border rounded-lg text-black mb-2"
          />
          <input
            type="text"
            name="input4"
            value={formData.input4}
            onChange={handleChange}
            placeholder="Nhập dữ liệu 4"
            className="w-full p-2 border rounded-lg text-black mb-2"
          />
        </div> */}

        {/* Các button */}
        <div className="flex justify-between mt-4">
          <button onClick={seeding_actions} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Chạy seeding
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">

          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage

