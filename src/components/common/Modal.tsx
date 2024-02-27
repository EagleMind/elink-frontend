import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { InvoiceService } from '../../services/invoices'
type Props = {
    invoiceId: string
}

export default function Modal({ invoiceId }: Props) {
    const [loading, setIsLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false)
    const [actionType, setAction] = useState("");
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
    function openModal(actionType: string) {
        setIsOpen(true)
        if (actionType === "delete") {
            setAction("delete")
        } else if (actionType === "view") {
            setAction("view")
        } else if (actionType === "edit") {
            setAction("edit")
        }
    }

    let modalContent;
    if (actionType === 'view') {
        modalContent = (
            <div className='w-full'>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Invoice
                </Dialog.Title>
                <div className="mt-2 ">
                    <div className="p-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex justify-between mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold">Invoice</h1>
                                    <p>1234 Main Street, City, Country</p>
                                    <p>Email: example@example.com</p>
                                </div>
                                <div>
                                    <img src="/logo.png" alt="Company Logo" className="w-24 h-24" />
                                </div>
                            </div>

                            {/* Invoice details */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
                                <p>Invoice Number: INV-001</p>
                                <p>Date: February 23, 2024</p>
                            </div>

                            {/* Customer details */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                                <p>Customer Name: John Doe</p>
                                <p>Email: john@example.com</p>
                            </div>

                            {/* Table of items */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Items</h2>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border">Description</th>
                                            <th className="py-2 px-4 border">Quantity</th>
                                            <th className="py-2 px-4 border">Price</th>
                                            <th className="py-2 px-4 border">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border">Item 1</td>
                                            <td className="py-2 px-4 border">1</td>
                                            <td className="py-2 px-4 border">$10.00</td>
                                            <td className="py-2 px-4 border">$10.00</td>
                                        </tr>
                                        {/* Add more items as needed */}
                                    </tbody>
                                </table>
                            </div>

                            {/* Total */}
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold mb-4">Total</h2>
                                <p className="text-xl font-bold">$10.00</p>
                            </div>
                        </div>
                    </div>
                </div>
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
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => deleteInvoice(invoiceId)}
                    >
                        <svg className="animate-spin " viewBox="0 0 24 24">

                        </svg>
                        Deleting...
                    </button> : <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => deleteInvoice(invoiceId)}
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
    }

    return (
        <>
            <div className=" inset-0 flex items-center justify-center space-x-2">

                <button onClick={() => openModal("view")} className='border-1 border-gray-200' ><FontAwesomeIcon icon={faEye} /></button>
                <button onClick={() => openModal("delete")} className='border-1 border-gray-200' ><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={() => openModal("edit")} className='border-1 border-gray-200'><FontAwesomeIcon icon={faPenToSquare} /></button>

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
