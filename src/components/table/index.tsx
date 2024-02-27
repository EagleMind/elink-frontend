import React, { useEffect, useState } from 'react';
import MyModal from '../common/Modal';
interface TableProps {
  data: { [key: string]: any }[];
  columns: string[];
}


const UserListTable: React.FC<TableProps> = ({ data, columns }) => {
  const [loading, setIsLoading] = useState(false);


  const option = (value: any, column: any, id: string) => {
    console.log(id)
    if (Array.isArray(value)) {
      return null
    }
    if (value == true) {
      return <span>Yes</span>
    } else if (value == false) {
      return <span>No</span>
    }
    if (column === "actions") {
      return <div className='flex space-x-2'>
        <MyModal invoiceId={id}></MyModal>
      </div>
    }
    return value

  }
  useEffect(() => {

  }, [data]);

  return (
    <div>


      {!loading && data.length === 0 ? (
        <div className="grid justify-items-center items-center w-full overflow-hidden">
          <div className="flex flex-col">
            <p className="text-[18px] font-bold">Pas encore de données</p>
          </div>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  className="p-5 text-left text-xs font-mulish text-grey1 capitalize md:text-[14px] bg-gray-100"
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
                    <td colSpan={columns.length}>
                      <div className="flex items-center">
                        <div className="bg-gray-300 h-4 w-4 rounded-full mr-2 animate-pulse" />
                        <div className="bg-gray-300 h-4 w-4 rounded-full mr-2 animate-pulse" />
                        <div className="bg-gray-300 h-4 w-4 rounded-full mr-2 animate-pulse" />
                        <div className="bg-gray-300 h-4 w-4 rounded-full animate-pulse" />
                      </div>
                    </td>
                  </tr>
                ))}
            {!loading &&
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {[
                    "number",
                    "expired",
                    "status",
                    "discount",
                    "total",
                    "payment_method",
                    "currency",
                    "created_at",
                    "actions"
                  ].map((column, colIndex) => (
                    <td
                      className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit "
                      key={colIndex}
                    >
                      {option(row[column], column, row._id)}

                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListTable;
