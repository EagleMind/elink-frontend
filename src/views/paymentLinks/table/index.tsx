import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleXmark, faEye, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { PaymentLinksService } from '../../../services/paymentLinkService';
interface TableProps {
  data: any[]; // assuming each item in data has the same structure
  columnMapping: string[]; // optional column name mapping
}

const DynamicTable: React.FC<TableProps> = ({ data, columnMapping }) => {
  const [loading, setIsLoading] = useState(false);
  if (!data || data.length === 0) {
    return <div className='bg-gray-50 text-gray-400 rounded-lg p-10 m-5'>No data available</div>;
  }
  const [isTailwindClicked, setIsTailwindClicked] = useState(false)
  const handleCopyTailWindcss = (link: string) => {
    navigator.clipboard.writeText(
      link
    )
    setIsTailwindClicked(true)

    setTimeout(() => {
      setIsTailwindClicked(false)
    }, 1000)
  }
  const paymentLinkExpirationStatus = async (id: string, isExpired: boolean) => {
    try {
      setIsLoading(true)
      await PaymentLinksService.linkStatusById(id, isExpired)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)

    }
  }
  useEffect(() => { }, [loading])
  return (
    <table className="table-auto w-full  bg-gradient-to-br from-cyan-500 to-blue-500">
      <thead>
        <tr>
          {columnMapping.map((column, index) => (
            <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white"
              key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id} className='group'>
            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.invoice_id.invoice_name}</td>
            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.invoice_id.invoice_number}</td>
            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.link_type}</td>
            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{moment(row.delivery_date).format('YYYY-MM-DD')}</td>
            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">
              <button onClick={() => handleCopyTailWindcss(row.url)} className=' items-center flex bg-blue-100 hover:bg-blue-400 text-blue-600 hover:text-white  justify-center  transition ease-in  p-3'>
                {isTailwindClicked ? <FontAwesomeIcon icon={faCheck} fontSize={20} className='cursor-pointer  px-2'></FontAwesomeIcon> : <FontAwesomeIcon icon={faLink} fontSize={20} className='cursor-pointer  px-2' />}
                Copier le lien
              </button></td>

            <td className="text-left p-6 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black ">
              <div className='flex w-full space-x-4'>
                <Link className='bg-blue-100 p-3 hover:text-white hover:bg-blue-600 text-blue-600 w-auto transition ease-in flex items-center  rounded-md'
                  to={`/getPaymentLinkDetails/${row._id}`} >
                  <FontAwesomeIcon icon={faEye} fontSize={20} /><span className='mx-2'>Consulté</span></Link>
                <button onClick={() => paymentLinkExpirationStatus(row._id, !row.isExpired)} className=' items-center flex bg-blue-100 hover:bg-blue-400 text-blue-600 hover:text-white  justify-center  transition ease-in  p-3'>
                  {row.isExpired ? <><FontAwesomeIcon icon={faGlobe} fontSize={20} className='cursor-pointer  px-2' />
                    Publier</> : <><FontAwesomeIcon icon={faCircleXmark} fontSize={20} className='cursor-pointer  px-2' /> Deactivé</>}
                </button>
              </div>

            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
};

export default DynamicTable;
