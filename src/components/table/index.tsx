import React from 'react';
import MyModal from "../common/Modal"

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

  const option = (value: any, column: string) => {
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
    return value;
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {mappedColumns.map((column, index) => (
            <th className="p-5 text-left text-xs font-mulish text-grey1 capitalize md:text-[14px] bg-gray-100"
              key={index}>{columnMapping ? columnMapping[column] : column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {mappedColumns.map((column, colIndex) => (

              <td className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit "
                key={colIndex}>
                {console.log(colIndex)}
                {column === 'actions' ? (
                  <div className='flex space-x-2'>
                    <MyModal invoiceId={row._id}></MyModal>
                  </div>
                ) : (
                  option(row[column], column)
                )}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
