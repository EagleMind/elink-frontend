import React, { Fragment, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { PaymentLinksService } from '../../services/paymentLinkService';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck, faCross, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';


interface FormFieldProps {
    label: string;
    id: string;
    type?: string;
    value?: string; // Make value and onChange optional
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string; // Make name optional
    children?: React.ReactNode;
}

interface RadioButtonProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type = 'text', value, onChange, name, children }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-semibold text-left text-gray-500 '>
            {label}
        </label>
        {children ? (
            <div className='flex space-x-3  ease-in my-3'>{children}</div>
        ) : (
            <div className='flex my-2'>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="p-16 bg-white focus:outline-none focus:shadow-outline border border-blue-300 rounded-md py-2 px-2 block appearance-none leading-normal"
                    name={name}
                />
            </div>
        )}
    </div>
);

const RadioButton: React.FC<RadioButtonProps> = ({ id, name, value, checked, onChange }) => {
    const handleInputChange = () => {
        onChange && onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <label
            htmlFor={id}
            className={`flex shadow-md rounded-lg p-2 cursor-pointer hover:border-2 hover:border-blue-400 w-1/4 transition ease-in  ${checked ? 'border-2 border-blue-400' : 'border-gray-300'}`}
        >
            <input
                type='radio'
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={handleInputChange}
                className='sr-only'
            />
            <div className='flex flex-col items-start py-1'>
                <span className='text-sm font-bold text-blue-400 cursor-pointer '>
                    {value === 'single' && 'Lien Simple'}
                    {value === 'events' && 'Lien Permanent'}
                </span>
                <span className='text-xs text-left py-1'>
                    {value === 'single' && <p>Ce type de lien propose un lien de paiement utilisable une seule fois favorable pour les freelances</p>}
                    {value === 'events' && <p>Ce type de lien offre un lien de paiement permanent avec une date d'expiration idéale pour les événements</p>}
                </span>
            </div>
        </label>
    );
};


const CreatePaymentLink: React.FC = () => {
    const params = useParams()
    const [isTailwindClicked, setIsTailwindClicked] = useState(false);
    const [paymentLinkDetails, setPaymentLinkDetails] = useState({
        invoiceId: params.id,
        name: '',
        linkType: '',
        sendVia: '',
        vendorNote: '',
    });
    const [openFetchDialog, setOpenFetchDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentLink, setPaymentLink] = useState<string>("");
    const handleCopyTailWindcss = (link: string) => {
        navigator.clipboard.writeText(link);
        setIsTailwindClicked(true);

        setTimeout(() => {
            setIsTailwindClicked(false);
        }, 1000);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setPaymentLinkDetails(prevState => ({
            ...prevState,
            [name]: newValue
        }));

    };
    const createPaymentLink = async () => {
        console.log(paymentLinkDetails)

        try {
            const PaymentLink = await PaymentLinksService.createLinkPayment(paymentLinkDetails);
            setOpenFetchDialog(true)
            setPaymentLink(PaymentLink.url)
        } catch (error: any) {
            setErrorDialog(true)
        }
    };
    return (
        <Fragment>
            <div className='space-y-4 p-5'>
                <FormField label='Nom/Tag' id='name' type='text' value={paymentLinkDetails.name} onChange={handleInputChange} name='name' />
                <FormField label='Type du lien' id='link_type'>
                    <RadioButton id='single' name='linkType' value='single' checked={paymentLinkDetails.linkType === 'single'} onChange={handleInputChange} />
                    <RadioButton id='events' name='linkType' value='events' checked={paymentLinkDetails.linkType === 'events'} onChange={handleInputChange} />
                </FormField>
                <FormField label='Envoyer Via' id='sendViaInput' type='text' value={paymentLinkDetails.sendVia} onChange={handleInputChange} name='sendVia' />
                <FormField label='Note pour le client' id='vendorNoteInput' type='text' value={paymentLinkDetails.vendorNote} onChange={handleInputChange} name='vendorNote' />
                <button onClick={createPaymentLink} type='submit' className='flex  px-4 py-2 border border-transparent text-base text-sm font-medium rounded-md text-blue-500 hover:text-white shadow-md hover:bg-blue-500 hover:border-none border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Create Payment Link
                </button>
            </div>
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
                                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {loading ? ( // Show pulse animation while loading
                                        <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Lien en cours de creation...</div>
                                    ) : (
                                        <div>
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-md leading-6 font-medium text-gray-900">
                                                        Votre lien a été crée
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Clicker sur le boutton <span className='strong'>Copier</span> pour pouvoir utilisé le lien
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex space-x-5 py-5  '>
                                                <button onClick={() => handleCopyTailWindcss(paymentLink)} className='items-center flex bg-blue-100 hover:bg-blue-400 text-blue-600 hover:text-white justify-center transition ease-in p-3'>
                                                    {isTailwindClicked ? (
                                                        <FontAwesomeIcon icon={faCheck} fontSize={20} className='cursor-pointer px-2'></FontAwesomeIcon>
                                                    ) : (
                                                        <FontAwesomeIcon icon={faLink} fontSize={20} className='cursor-pointer px-2' />
                                                    )}
                                                    Copier le lien
                                                </button>
                                            </div>
                                        </div>

                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Errpr Dialog */}
            <Transition.Root show={errorDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={setErrorDialog}>
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

                                    <div>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <FontAwesomeIcon icon={faXmark} className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-md leading-6 font-medium text-gray-900">
                                                    Error
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Une erreur est survenue l'or de la creation du lien, cet erreur nous a été transmis automatiquement pour investiger le problem, merci pour votre patience!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex space-x-5 py-5  '>
                                            <button onClick={() => setErrorDialog(false)} className='items-center flex bg-blue-100 hover:bg-blue-400 text-blue-600 hover:text-white justify-center transition ease-in p-3'>
                                                Fermer
                                            </button>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Fragment>
    );
};

export default CreatePaymentLink;
