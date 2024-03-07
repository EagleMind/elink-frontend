import React from 'react';
import MyModal from "../../../components/common/Modal"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface TableProps {
  data: any[]; // assuming each item in data has the same structure
  columnMapping: { [key: string]: string }; // optional column name mapping
}

const DynamicTable: React.FC<TableProps> = ({ data, columnMapping }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract column names from the first data item
  const columns = Object.keys(data[0]);

  // Apply column name mapping if provided and filter out columns
  let mappedColumns: string[] = [];

  if (columnMapping) {
    mappedColumns = Object.keys(columnMapping).filter(column => columns.includes(column));
    console.log("mappedColumns", mappedColumns)

    // Add actions column manually
    mappedColumns.push("actions")
  } else {
    mappedColumns = columns;
  }

  const option = (value: any, column: string, id) => {
    if (Array.isArray(value)) {
      return null;
    }
    if (value === true) {
      return <span>Yes</span>;
    } else if (value === false) {
      return <span>No</span>;
    }

    if (column === "expired") {
      return value ? "Yes" : "No";
    }
    if (column === "actions") {
      return <div className='flex'>
        <Link className='bg-blue-100 flex items-center  hover:text-white   hover:bg-blue-400  text-blue-600 w-auto transition ease-in px-4 rounded-md' to={`/editInvoice/${id}`} >
          <FontAwesomeIcon size='lg' icon={faPenToSquare} />
        </Link>
        <MyModal id={id} feature='invoices'></MyModal>
      </div>
    }
    return value;
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {mappedColumns.map((column, index) => (
            <th className="p-5 text-left text-xs font-mulish text-grey1 capitalize md:text-[14px] bg-blue-400 text-white"
              key={index}>{columnMapping ? columnMapping[column] : column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className='group'>
            {mappedColumns.map((column, colIndex) => (

              <td className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black"
                key={colIndex}>
                {
                  option(row[column], column, row._id)
                }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;