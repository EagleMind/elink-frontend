import { faBan, faEdit, faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { InvoiceService } from '../../services/invoices'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { PaymentLinksService } from '../../services/paymentLinkService'
type Props = {
    id: string
    feature: string;
    invoiceData: {}
}

type ActionType = 'view' | 'delete' | 'edit' | 'deactivate';

export default function Modal({ id, feature, invoiceData }: Props) {
    const [loading, setIsLoading] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState<any>({});

    let [isOpen, setIsOpen] = useState(false)
    const [actionType, setAction] = useState("");

    const getInvoiceDetails = async (id: string) => {
        setIsLoading(true)
        const invoice = await InvoiceService.getById(id)
        console.log("invoice", invoice)
        setInvoiceDetails(invoice)
        setIsLoading(false)
    }

    useEffect(() => {
        if (id && actionType === 'view' && feature === "invoices") {
            console.log(true)
            getInvoiceDetails(id)
        }
    }, [id, feature])
    // Inputs states //
    function closeModal() {
        setIsOpen(false)
    }
    const deleteInvoice = async (invoiceId: string) => {
        try {
            setIsLoading(true)
            await InvoiceService.deleteById(invoiceId)
            closeModal()
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            closeModal()
            setIsLoading(false)

        }
    }
    const deactivatePaymentLink = async (id: string, isExpired: boolean) => {
        try {
            setIsLoading(true)
            await PaymentLinksService.linkStatusById(id, isExpired)
            closeModal()
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            closeModal()
            setIsLoading(false)

        }
    }

    const openModal = (actionType: ActionType) => {
        setIsOpen(true)
        if (actionType === "delete") {
            setAction("delete")
        } else if (actionType === "view") {
            setAction("view")
        } else if (actionType === "edit") {
            setAction("edit")
        } else if (actionType === "deactivate") {
            setAction("deactivate")
        }
    }

    let modalContent;

    if (actionType === 'view') {

        let contentToRender;

        // Render paragraph tags for viewing mode
        contentToRender = (
            loading || !invoiceDetails ? ( // Show pulse animation while loading
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
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
                                {console.log(invoiceDetails.items)}
                                {/* {invoiceDetails.items.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td className="border-t py-2 text-left">{item.description}</td>
                                        <td className="border-t text-right py-2">{item.price.toFixed(2)}</td>

                                    </tr>
                                ))} */}


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
            )

        );

        modalContent = (
            <div className='w-full'>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Invoice
                </Dialog.Title>
                <div className="mt-2 ">{contentToRender}</div>
                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    } else if (actionType === 'delete') {
        modalContent = (
            <>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Delete Invoice
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Invoice View
                    </p>
                </div>
                <div className="mt-4 space-x-2">
                    {loading ? <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => deleteInvoice(id)}
                    >
                        <svg className="animate-spin " viewBox="0 0 24 24">

                        </svg>
                        Deleting...
                    </button> : <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => deleteInvoice(id)}
                    >

                        Delete
                    </button>}

                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </>
        );
    } else if (actionType === 'deactivate') {
        modalContent = (
            <>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Désactivé le lien
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Cette action fera expirer le lien et le rendra inaccessible au public
                    </p>
                </div>
                <div className="mt-4 space-x-2">
                    {loading ? <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                        <svg className="animate-spin " viewBox="0 0 24 24">

                        </svg>
                        Desactivation en cours...
                    </button> : <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => deactivatePaymentLink(id, true)}
                    >
                        Désactivé
                    </button>}

                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className=" inset-0 flex items-center justify-center ">
                {feature === "invoices" &&
                    <div>
                        <button onClick={() => openModal("view")} className='bg-blue-100  hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md mx-1' ><FontAwesomeIcon size='lg' className='cursor-pointer  px-2' icon={faEye} /> Consulté</button>
                        <button onClick={() => openModal("delete")} className='bg-blue-100  hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md ' ><FontAwesomeIcon size='lg' icon={faTrash} className='cursor-pointer  px-2' /> Suprimer</button>
                    </div>}
                {feature === "paymentlinks" && actionType === "view" &&
                    <div className='flex'>
                        <button onClick={() => openModal("view")} className='bg-blue-100  hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md mx-1' ><FontAwesomeIcon size='lg' className='cursor-pointer  px-2' icon={faEye} /> Consulté</button>
                        <button onClick={() => openModal("deactivate")} className='bg-blue-100 p-3 hover:text-white hover:bg-blue-600 text-blue-600 w-auto transition ease-in  rounded-md mx-2' ><FontAwesomeIcon size='lg' icon={faBan} /><span className='mx-2'>Désactivé</span></button>
                    </div>
                }

            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
                                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {modalContent}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
