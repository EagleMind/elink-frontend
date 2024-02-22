import React, { useEffect, useState } from 'react'


interface TableProps {
  data: { [key: string]: any }[]
  columns: string[]
}

const UserListTable: React.FC<TableProps> = ({ data, columns }) => {
  const [loading, setIsLoading] = useState(false)


  return (
    <div>
      {!loading && data.length === 0 ? (
        <div className='grid justify-items-center items-center md:h-2/3 '>
          <div className='flex flex-col '>
            <p className='text-[18px] font-bold'>Pas encore de données</p>
          </div>
        </div>
      ) : (
        <table className='min-w-full divide-y divide-grey2 dark:divide-grey1 table-auto'>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  className='px-6 py-3 text-left text-xs font-mulish text-grey1 capitalize md:text-[14px] '
                  key={index}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array(5)
                .fill('')
                .map((_, index) => (
                  <tr key={index}>
                    <td colSpan={7}>
                      <div className='bg-[#f0f0f0] h-12 rounded animate-pulse m-2' />
                    </td>
                  </tr>
                ))}
            {!loading &&
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      className='px-5 py-5 border-b border-grey3 bg-white text-sm '
                      key={colIndex}
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default UserListTable
