import React, { Fragment, useEffect, useState } from 'react';
import PDFInvoice from './pdfInvoiceTemplates/defaultInvoiceTemplate';
import { PDFViewer } from '@react-pdf/renderer';
import { InvoiceService } from '../../services/invoices';
import moment from "moment"
import { Link, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

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

function CreateAndEditInvoice() {
    let { invoiceId } = useParams();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([]);
    const [errorDialog, setErrorDialog] = useState(false);
    const [invoiceResponse, setInvoiceResponse] = useState<any>();
    const [openFetchDialog, setOpenFetchDialog] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailsState>({
        vendor_name: "",
        client_name: "",
        delivery_date: "",
        due_date: "",
        invoice_number: "",
        invoice_name: "",
        items: items,
        total: total
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInvoiceDetails(prevState => ({
            ...prevState,
            [name]: name === ("delivery_date" || "due_date") ? moment(value).format('YYYY-MM-DD') : value
        }));
    };
    const [newItemName, setNewItemName] = useState<string>();
    const [newItemPrice, setNewItemPrice] = useState<number>();


    const handleAddItem = () => {

        if (newItemName && newItemPrice) {
            const newItem: Item = {
                description: newItemName,
                price: parseFloat(newItemPrice),
            };

            // Update the items state first
            const updatedItems = [...items, newItem];
            setItems(updatedItems);

            // Then update the invoice details state
            setInvoiceDetails(prevState => ({
                ...prevState,
                items: updatedItems
            }));
            setNewItemName('');
            setNewItemPrice('');
            setTotal(newItemPrice)
        }
    };

    const handleRemoveItem = (indexToRemove: number) => {
        setItems(prevItems => {
            // Create a copy of the items array
            const updatedItems = [...prevItems];
            // Remove the item at the specified index
            updatedItems.splice(indexToRemove, 1);
            setTotal(updatedItems.reduce((total: any, item: any) => total + item.price, 0).toFixed(2))
            // Return the updated items array
            return updatedItems;
        });
    };
    const handleSaveDraft = () => {
        // Add your logic to save the current state as a draft
        console.log('Draft saved');
    };

    const handleCreateInvoice = async () => {
        setLoading(true)
        try {
            await InvoiceService.create(invoiceDetails).then(res => {
                setInvoiceResponse(res)
                setOpenFetchDialog(true);
            })
            setLoading(false)
        } catch (error) {
            setErrorDialog(true)
            setLoading(false)

        }
    };
    const getInvoiceDetails = async (invoiceId: string) => {
        const invoiceDetails = await InvoiceService.getById(invoiceId)
        setInvoiceDetails(invoiceDetails)
    }
    useEffect(() => {
        let totalPrice = items.reduce((total: any, item: any) => total + item.price, 0).toFixed(3)
        setInvoiceDetails(prevState => ({
            ...prevState,
            total: totalPrice
        }));
        if (invoiceId) {
            getInvoiceDetails(invoiceId)
        }

    }, [total, items]); // Empty dependency array to fetch data only once when component mounts

    return (
        <Fragment>
            {/* Blue Theme */}
            {/* <div className='flex h-[80vh] justify-between '>
                <div className='flex flex-col w-full bg-[#005d97]'>
                    <div className=" p-5 space-y-20 overflow-y-auto w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-white">Facture</h1>
                            <div className='flex flex-col'>
                                <div className="font-bold text-white">Nom Facture</div>
                                <input
                                    className='peer text-center w-full text-white bg-transparent border-b-2 border-gray-300 placeholder:text-white placeholder:bg-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    placeholder="Event Name"
                                    value={invoiceDetails.invoice_name}
                                    name='invoice_name'
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>
                        <div className="flex justify-between mb-6 ">
                            <div className='flex flex-col items-start space-y-4'>
                                <div className="font-bold text-white">Recipient</div>
                                <input

                                    className='peer w-full text-white bg-transparent placeholder:text-white border-b-2 border-gray-300 placeholder:bg-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    placeholder="Capita"
                                    value={invoiceDetails.vendor_name}
                                    name='vendor_name'
                                    onChange={handleInputChange}
                                />
                                <div className="font-bold text-white">Date de livraison</div>

                                <input
                                    style={{
                                        colorScheme: 'dark ',
                                    }}
                                    className='peer  bg-transparent w-full border-b-2 border-gray-300  placeholder:bg-transparent placeholder:text-white text-white focus:border-gray-500 focus:outline-none'
                                    type="date"
                                    placeholder="Date"
                                    value={moment(invoiceDetails.delivery_date).format('YYYY-MM-DD')}
                                    name='delivery_date'

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col items-start space-y-4'>
                                <div className="font-bold text-white ">Destinataire</div>
                                <input
                                    className='peer bg-transparent w-full text-white placeholder:text-white border-b-2 border-gray-300   placeholder:bg-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    value={invoiceDetails.client_name}
                                    name='client_name'
                                    placeholder='Someone'
                                    onChange={handleInputChange}
                                />
                                <div className="font-bold text-white ">Date d'expiration </div>
                                <input
                                    style={{
                                        colorScheme: 'dark ',
                                    }}
                                    className='peer bg-transparent w-full text-white placeholder:text-white border-b-2 border-gray-300  placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="date"
                                    value={moment(invoiceDetails.due_date).format('YYYY-MM-DD')}
                                    name='due_date'

                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 text-white">Article</th>
                                    <th className="text-right py-2 text-white">Somme</th>
                                </tr>
                            </thead>
                            <tbody >
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-2 text-left">{item.description}</td>
                                        <td className="border-t text-right py-2">${item.price.toFixed(2)}</td>
                                        <td className="border-t py-2 text-right">
                                            <button className='border-blue-300 text-white bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleRemoveItem(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                {invoiceId && invoiceDetails.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-2 text-left">{item.description}</td>
                                        <td className="border-t text-right py-2">${item.price.toFixed(2)}</td>
                                        <td className="border-t py-2 text-right">
                                            <button className='border-blue-300 text-white bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleRemoveItem(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border-t py-2 text-left" colSpan={2}>
                                        <div className='flex justify-between'>
                                            <input
                                                type="text"
                                                placeholder="Item name"
                                                className='p-3 bg-transparent placeholder:text-white'
                                                value={newItemName}
                                                name='description'
                                                onChange={(e) => setNewItemName(e.target.value)}
                                            />
                                            <input
                                                name='price'
                                                type="number"
                                                className='p-3 bg-transparent placeholder:text-white'

                                                placeholder="Item price"
                                                value={newItemPrice}
                                                onChange={(e) => setNewItemPrice(e.target.value)}
                                            />
                                            <button className='border-blue-300 text-white bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleAddItem()}>Add</button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>


                                <tr>
                                    <td className="border-t font-bold  text-white py-2  text-left">Totale (Tous charges exclue):</td>
                                    <td className="border-t font-bold text-white text-right py-2">{total}</td>
                                </tr>
                            </tfoot>
                        </table>

                    </div>

                    <div className='flex justify-between p-5'>
                        <button disabled className='border-blue-300 text-white disabled:cursor-not-allowed bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleSaveDraft}>Enregistrer brouillant</button>
                        <button className='border-blue-300 text-white bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleCreateInvoice}>Créer la facture</button>
                    </div>
                </div>

                <div className='w-full'>
                    <PDFViewer width="100%" height="90%">
                        <PDFInvoice
                            invoiceDetails={invoiceDetails}
                            items={invoiceDetails.items}
                            newItemName={newItemName}
                            newItemPrice={newItemPrice}
                        />
                    </PDFViewer>
                </div>
            </div> */}
            {/* Blue Theme */}
            <div className='flex h-full justify-between'>
                <div className='flex flex-col w-full'>
                    <div className="p-5 space-y-20 overflow-y-auto w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Facture</h1>
                            <div className='flex flex-col'>
                                <div className="font-bold">Nom Facture</div>
                                <input
                                    className='peer text-center w-full border-b-2 border-gray-300 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    placeholder="1234 Main Street, City, Country"
                                    value={invoiceDetails.invoice_name}
                                    name='invoice_name'
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>
                        <div className="flex justify-between mb-6 ">
                            <div className='flex flex-col items-start space-y-4'>
                                <div className="font-bold">Recipient</div>
                                <input
                                    className='peer w-full border-b-2 border-gray-300 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    placeholder="1234 Main Street, City, Country"
                                    value={invoiceDetails.vendor_name}
                                    name='vendor_name'
                                    onChange={handleInputChange}
                                />
                                <div className="font-bold">Date de livraison</div>

                                <input
                                    className='peer  w-full border-b-2 border-gray-300  placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="date"
                                    placeholder="1234 Main Street, City, Country"
                                    value={moment(invoiceDetails.delivery_date).format('YYYY-MM-DD')}
                                    name='delivery_date'

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col items-start space-y-4'>
                                <div className="font-bold ">Destinataire</div>
                                <input
                                    className='peer w-full border-b-2 border-gray-300   placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="text"
                                    value={invoiceDetails.client_name}
                                    name='client_name'

                                    onChange={handleInputChange}
                                />
                                <div className="font-bold ">Date d'expiration </div>
                                <input
                                    className='peer w-full border-b-2 border-gray-300  placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                    type="date"
                                    value={moment(invoiceDetails.due_date).format('YYYY-MM-DD')}
                                    name='due_date'

                                    onChange={handleInputChange}
                                />
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
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-2 text-left">{item.description}</td>
                                        <td className="border-t text-right py-2">${item.price.toFixed(2)}</td>
                                        <td className="border-t py-2 text-right">
                                            <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleRemoveItem(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                {invoiceId && invoiceDetails.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-t py-2 text-left">{item.description}</td>
                                        <td className="border-t text-right py-2">${item.price.toFixed(2)}</td>
                                        <td className="border-t py-2 text-right">
                                            <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleRemoveItem(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border-t py-2 text-left" colSpan={2}>
                                        <div className='flex justify-between'>
                                            <input
                                                type="text"
                                                placeholder="Item name"
                                                value={newItemName}
                                                name='description'
                                                onChange={(e) => setNewItemName(e.target.value)}
                                            />
                                            <input
                                                name='price'
                                                type="number"
                                                placeholder="Item price"
                                                value={newItemPrice}
                                                onChange={(e) => setNewItemPrice(e.target.value)}
                                            />
                                            <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={() => handleAddItem()}>Add</button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>


                                <tr>
                                    <td className="border-t font-bold py-2  text-left">Totale (Tous charges exclue):</td>
                                    <td className="border-t font-bold text-right py-2">{total}</td>
                                </tr>
                            </tfoot>
                        </table>

                    </div>

                    <div className='flex justify-between p-5'>
                        <button disabled className='border-blue-300 disabled:cursor-not-allowed bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleSaveDraft}>Enregistrer brouillant</button>
                        <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleCreateInvoice}>Créer la facture</button>
                    </div>
                </div>

                <div className='w-full'>
                    <PDFViewer width="100%" height="90%">
                        <PDFInvoice
                            invoiceDetails={invoiceDetails}
                            items={invoiceDetails.items}
                            newItemName={newItemName}
                            newItemPrice={newItemPrice}
                        />
                    </PDFViewer>
                </div>
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
                                    {loading || !invoiceDetails ? ( // Show pulse animation while loading
                                        <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
                                    ) : (
                                        <div>
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                        Votre facture a été crée
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-md text-gray-500">
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
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    Error
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-md text-gray-500">
                                                        Une erreur est survenue l'or de la creation de la facture, cet erreur nous a été transmis automatiquement pour investiger le problem, merci pour votre patience!
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
    )
}

export default CreateAndEditInvoice;
