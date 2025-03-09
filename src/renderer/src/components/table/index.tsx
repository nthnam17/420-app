import React, { useState } from 'react'

interface TableProps {
  columns: string[]
  data: any[]
  onUpdate: (id: number) => void
  onDelete: (id: number) => void
}

const TableComponent: React.FC<TableProps> = ({ columns, data, onDelete, onUpdate }) => {
  console.log(data, 'tab')

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="py-3 px-6 text-left border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {data !== undefined && data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-black">
                    <span className="text-black">{index + 1}</span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-black">{row?.username}</span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-black">{row?.name}</span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-black">{row?.email}</span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-black">{row.status == 0 ? 'live' : 'die'}</span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-blue-500" onClick={() => onUpdate(row?.id)}>
                      Sửa
                    </span>
                  </td>
                  <td className="py-3 px-6 text-black">
                    <span className="text-red-500" onClick={() => onDelete(row?.id)}>
                      Xóa
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableComponent
