import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

interface TableProps {
  data: { [key: string]: any }[];
  columns: string[];
}

const UserListTable: React.FC<TableProps> = ({ data, columns }) => {
  const [loading, setIsLoading] = useState(false);
  const option = (arg: any) => {
    if (Array.isArray(arg)) {
      return null
    }
    if (arg == true) {
      return <span>Yes</span>
    } else if (arg == false) {
      return <span>No</span>
    }
    return arg

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
                  className="py-3 text-left text-xs font-mulish text-grey1 capitalize md:text-[14px]"
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
                  {columns.map((column, colIndex) => (
                    <td
                      className="text-left py-5 border-b border-grey3 bg-white text-sm w-fit "
                      key={colIndex}
                    >
                      {console.log(column)}
                      {option(row[column])}

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
