import React, { Fragment, useEffect, useState } from 'react';
import { InvoiceService } from '../../services/invoices';
import { Link, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFileInvoice, faXmark } from '@fortawesome/free-solid-svg-icons';
import TemplateSelector, { TemplateOptionProps } from '../../components/InvoiceTemplator/templateSelector';
import TemplateDisplay from '../../components/InvoiceTemplator/templateDisplay';

interface Item {
    description: string;
    price: number;
}
export interface InvoiceDetailsState {
    vendor_name: string;
    client_name: string;
    delivery_date: Date;
    due_date: Date;
    invoice_number: string;
    total: number;
    invoice_name: string
    items: Item[]
}
interface FormState {
    [categoryName: string]: {
        fields: {
            [fieldName: string]: string;
        };
    };
}
function CreateAndEditInvoice() {
    const { invoiceId } = useParams();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([]);
    const [errorDialog, setErrorDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [invoiceResponse, setInvoiceResponse] = useState<any>();
    const [openFetchDialog, setOpenFetchDialog] = useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateOptionProps | null>(null);

    // const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemPrice, setNewItemPrice] = useState<number>(0);


    const [formData, setFormData] = useState<FormState>({});


    const handleInputChange = (categoryName: string, fieldName: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [categoryName]: {
                ...prevState[categoryName],
                fields: {
                    ...prevState[categoryName]?.fields,
                    [fieldName]: value
                }
            }
        }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, categoryName: string) => {
        event.preventDefault();
        console.log('Form submitted for category:', categoryName);
        console.log('Form data:', formData[categoryName]);
    };

    const renderFormFields = (categoryName: string) => {

        return (
            <div>
                <h2>{categoryName} Form</h2>
                <form onSubmit={(e) => handleSubmit(e, categoryName)}>
                    {selectedTemplate?.template.categories.map((category, index) => (
                        category.name === categoryName &&
                        <div key={index}>
                            {category.fields.map((field, index) => (
                                <div key={index}>
                                    <label htmlFor={field}>{field}</label>
                                    <input
                                        type="text"
                                        id={field}
                                        value={formData[field]}
                                        onChange={(e) => handleInputChange(categoryName, field, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    };


    const handleSelectTemplate = (template: TemplateOptionProps) => {
        setSelectedTemplate(template);
        console.log("selected", template)
    };
    const handleAddItem = () => {
        if (newItemName && newItemPrice) {
            const newItem: Item = {
                description: newItemName,
                price: parseFloat(newItemPrice.toString())
            };
            setItems(prevItems => [...prevItems, newItem]);
            setNewItemName('');
            setNewItemPrice(0);
            setTotal(prevTotal => prevTotal + newItem.price);
        }
    };

    const handleRemoveItem = (indexToRemove: number) => {
        setItems(prevItems => {
            const updatedItems = prevItems.filter((_, index) => index !== indexToRemove);
            const newTotal = updatedItems.reduce((total, item) => total + item.price, 0);
            setTotal(newTotal);
            return updatedItems;
        });
    };

    const handleSaveDraft = () => {
        console.log('Draft saved');
    };


    const handleCreateInvoice = async () => {
        setLoading(true)
        try {
            await InvoiceService.create(formData).then(res => {
                setInvoiceResponse(res)
                setOpenFetchDialog(true);
            })
            setLoading(false)
        } catch (error: any) {
            setErrorDialog(true)
            console.log(error.response.data)

            if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
                const errorMessages = error.response.data.errors.map((err: any) => err.msg).join("\n");
                setErrorMessage(errorMessages);
            } else {
                setErrorMessage("An error occurred while creating the invoice. Please try again later.");
            }
            setLoading(false)

        }
    };
    const getInvoiceDetails = async (invoiceId: string) => {
        const invoiceDetails = await InvoiceService.getById(invoiceId)
        setFormData(invoiceDetails)
    }


    useEffect(() => {
        let totalPrice = items.reduce((total: any, item: any) => total + item.price, 0).toFixed(3)
        setFormData(prevState => ({
            ...prevState,
            total: totalPrice
        }));
        if (invoiceId) {
            getInvoiceDetails(invoiceId)
        }

    }, [total, items]);


    return (
        <div className='bg-white rounded-lg '>
            <div className='flex  md:h-[800px]'>
                <div className=" p-5 space-y-20 overflow-y-auto w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">
                    <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                    <div className='flex flex-col space-y-10 justify-center items-center m-5 w-full rounded-md'>
                        <span className=' p-5 bg-blue-50 rounded-md text-blue-400'>Le design de cette partie est en cours</span>
                    </div>
                    {/* customize renderFormFields later */}
                    {selectedTemplate?.template.categories.map(cat => { return renderFormFields(cat.name) })}
                    <div className='flex justify-between p-5'>
                        <button disabled className='border p-3 border-blue-300 disabled:cursor-not-allowed bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleSaveDraft}>Enregistrer brouillant</button>
                        <button className='border p-3 border-blue-300 rounded-md bg-transparent hover:bg-blue-400 hover:text-white transition  ease-in' onClick={handleCreateInvoice}>Créer la facture</button>
                    </div>
                </div>
                {selectedTemplate ? <TemplateDisplay template={selectedTemplate} data={formData} /> :
                    <div className='flex flex-col space-y-10 border-2 border-blue-200 justify-center items-center m-5 w-full rounded-md'>
                        <FontAwesomeIcon icon={faFileInvoice} size='9x' color='#60a4ff' />
                        <span className=' p-5 bg-blue-50 rounded-md text-blue-400'>Votre facture sera visualisée ici lors de la sélection</span>
                    </div>}

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
                                    {loading || formData ? ( // Show pulse animation while loading
                                        <div className='flex justify-center items-center'>
                                            <div className="animate-pulse  text-gray-400 rounded-lg p-10 m-5">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-md leading-6 font-medium text-gray-900">
                                                        Votre facture a été crée
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Voulez vous crée un lien pour cette facture?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex space-x-5 py-5  '>
                                                <Link to={`/createPaymentLink/${invoiceResponse?.invoice}`} className='border text-sm p-3 rounded-md hover:text-blue-600 border-blue-200 bg-transparent hover:bg-gray-100 text-blue-600 transition  ease-in' >Créer un lien</Link>
                                            </div>
                                        </div>

                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Error Dialog */}
            <Transition.Root show={errorDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={() => setErrorDialog(false)}>
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
                                                        {errorMessage}
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
        </div>
    )
}

export default CreateAndEditInvoice;
