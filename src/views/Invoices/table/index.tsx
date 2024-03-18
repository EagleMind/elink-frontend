import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEye, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { InvoiceService } from '../../../services/invoices';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteInvoice } from '../../../redux/features/invoices';
import { RootState } from '../../../redux/store';
interface TableProps {
  columnMapping: string[]; // optional column name mapping
}

const DynamicTable: React.FC<TableProps> = ({ columnMapping }) => {
  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState<string>(''); // State to hold the ID of the invoice to delete
  const [openFetchDialog, setOpenFetchDialog] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null);
  const { invoices } = useAppSelector((state: RootState) => state.invoices);

  useEffect(() => { }, [loading]);

  const handleDeleteInvoice = async () => {
    try {
      await InvoiceService.deleteById(deleteInvoiceId)
      setOpenDeleteDialog(false);
      dispatch(deleteInvoice(deleteInvoiceId))
    } catch (error) {
    }
  };

  const getInvoiceDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const invoice = await InvoiceService.getById(id);
      setInvoiceDetails(invoice);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (openFetchDialog && selectedInvoiceId) {
      getInvoiceDetails(selectedInvoiceId);
    }
  }, [openFetchDialog, selectedInvoiceId]);

  return (
    <Fragment>
      <table className="table-auto w-full  bg-white">
        <thead>
          <tr>
            {columnMapping.map((column, index) => (
              <th className={`p-5 ${column === "Actions" ? "text-center" : "text-left"} text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white`}
                key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {invoices.map((row) => (
            <tr key={row._id} className='group' >
              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.invoice_name}</td>
              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.invoice_number}</td>

              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">
                {row.payment_link_params ? (
                  row.payment_link_params.link_type) : <span>Pas de lien</span>}
              </td>

              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{row.status}</td>
              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{moment(row.delivery_date).format('YYYY-MM-DD')}</td>
              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black">{moment(row.due_date).format('YYYY-MM-DD')}</td>
              <td className="text-left p-2 border-b border-grey3 bg-white text-sm w-fit group-hover:bg-gray-100 group-hover:text-black  ">
                <div className='flex justify-left'>

                  <button
                    className='bg-blue-100 flex items-center  hover:text-white   hover:bg-blue-400  text-blue-600 w-auto transition ease-in rounded-md mx-2'
                    onClick={() => {
                      setSelectedInvoiceId(row._id);
                      setDeleteInvoiceId(row._id)
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} fontSize={20} className='cursor-pointer  px-2' />
                  </button>
                  <button
                    className='bg-blue-100 flex items-center  hover:text-white   hover:bg-blue-400 mx-2 text-blue-600 w-auto transition ease-in rounded-md '
                    onClick={() => {
                      setSelectedInvoiceId(row._id);
                      setOpenFetchDialog(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} fontSize={20} className='cursor-pointer  px-2' />
                  </button>
                  <Link className='bg-blue-100 flex items-center  hover:text-white   hover:bg-blue-400  text-blue-600 w-auto transition ease-in px-4 rounded-md' to={`/editInvoice/${row._id}`} >
                    <FontAwesomeIcon fontSize={20} className='cursor-pointer  px-2' icon={faPenToSquare} />
                  </Link>
                  {row.payment_link_params ? (
                    <div className='flex items-center'>
                      <Link className='bg-blue-100 p-3 mx-2 hover:text-white hover:bg-blue-600 text-blue-600 w-auto transition ease-in flex items-center rounded-md' to={`/getPaymentLinkDetails/${row._id}`}>
                        <FontAwesomeIcon icon={faChartLine} fontSize={20} />
                        <span className='mx-2'>Consulté le lien</span>
                      </Link>
                    </div>
                  ) :

                    <div className='flex items-center'>
                      <Link to={`/createPaymentLink/${row._id}`} className='flex items-center bg-blue-100 hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in rounded-md mx-2 p-3'>
                        <FontAwesomeIcon icon={faPlus} fontSize={20} className='cursor-pointer' />
                        <span className='ml-1'>Créer un lien</span>
                      </Link>
                    </div>}



                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Dialog */}
      <Transition.Root show={openDeleteDialog} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpenDeleteDialog}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-2 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FontAwesomeIcon icon={faTrash} className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Suprimer la facture
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Êtes-vous sûr de vouloir supprimer cette facture ? Cette action ne peut pas être annulée.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteInvoice}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenDeleteDialog(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>


      {/* Fetch Dialog */}
      <Transition.Root show={openFetchDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpenFetchDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                  {loading || !invoiceDetails ? ( // Show pulse animation while loading
                    <div className="animate-pulse  text-gray-400 rounded-lg p-10 m-5">Loading...</div>
                  ) : (
                    <div className='flex flex-col w-full'>
                      <div className="p-5 space-y-20 overflow-y-auto w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">

                        <div className="flex justify-between items-center mb-6">
                          <h1 className="text-2xl font-bold">Facture</h1>
                          <div className='flex flex-col'>
                            <div className="font-bold">Nom Facture</div>
                            <label>
                              {invoiceDetails.invoice_name}
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-between mb-6 ">
                          <div className='flex flex-col items-start space-y-4'>
                            <div className="font-bold">Recipient</div>
                            <label>
                              {invoiceDetails.vendor_name}
                            </label>
                            <div className="font-bold">Date de livraison</div>
                            <label>
                              {moment(invoiceDetails.delivery_date).format('YYYY-MM-DD')}
                            </label>
                          </div>
                          <div className='flex flex-col items-start space-y-4'>
                            <div className="font-bold ">Destinataire</div>
                            <label>
                              {invoiceDetails.client_name}
                            </label>
                            <div className="font-bold ">Date d'expiration </div>
                            <label>
                              {moment(invoiceDetails.due_date).format('YYYY-MM-DD')}
                            </label>
                          </div>
                        </div>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left py-2">Article</th>
                              <th className="text-right py-2">Somme</th>
                            </tr>
                          </thead>
                          <tbody >
                            {invoiceDetails.items.map((item: any, index: number) => (
                              <tr key={index}>
                                <td className="border-t py-2 text-left">{item.description}</td>
                                <td className="border-t text-right py-2">{item.price.toFixed(2)}</td>

                              </tr>
                            ))}


                          </tbody>
                          <tfoot>
                            <tr>
                              <td className="border-t font-bold py-2  text-left">Totale (Tous charges exclue):</td>
                              <td className="border-t font-bold text-right py-2">{invoiceDetails.total}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>


                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default DynamicTable;
