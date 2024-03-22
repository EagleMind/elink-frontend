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

export default function Modal({ id, feature }: Props) {
    const [loading, setIsLoading] = useState(false);

    let [isOpen, setIsOpen] = useState(false)
    const [actionType, setAction] = useState("");


    useEffect(() => {

    }, [id])
    // Inputs states //
    function closeModal() {
        setIsOpen(false)
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
        if (actionType === "deactivate") {
            setAction("deactivate")
        }
    }

    let modalContent;

    if (actionType === 'deactivate') {
        modalContent = (
            <>
                <Dialog.Title
                    as="h3"
                    className="text-md font-medium leading-6 text-gray-900"
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
