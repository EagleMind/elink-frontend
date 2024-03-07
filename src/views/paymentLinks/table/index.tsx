import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface TableProps {
  data: any[]; // assuming each item in data has the same structure
  columnMapping: { [key: string]: string }; // optional column name mapping
  feature: string
}

const DynamicTable: React.FC<TableProps> = ({ data, columnMapping, feature }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  // Extract column names from the first data item
  const columns = Object.keys(data[0]);

  // Apply column name mapping if provided and filter out columns
  let mappedColumns: string[] = [];

  if (columnMapping) {
    mappedColumns = Object.keys(columnMapping).filter(column => columns.includes(column));

    // Add actions column manually
    mappedColumns.push("actions")
    if (feature == "paymentlinks")
      // add invoice name
      mappedColumns.unshift('invoice_name');

  } else {
    mappedColumns = columns;
  }


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
          <tr className='group'>


            <td key={rowIndex} className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.invoice_id.invoice_name}</td>
            <td key={rowIndex} className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.link_type}</td>
            <td key={rowIndex} className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{moment(row.delivery_date).format('YYYY-MM-DD')}</td>
            <td key={rowIndex} className="text-left p-5 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">
              <Link className='bg-blue-100 p-3 hover:text-white hover:bg-blue-600 text-blue-600 w-auto transition ease-in  rounded-md'
                to={`/getPaymentLinkDetails/${row._id}`} >
                <FontAwesomeIcon icon={faEye} /></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
};

export default DynamicTable;
