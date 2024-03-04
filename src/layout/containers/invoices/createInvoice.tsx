import React, { Fragment, useEffect, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import PDFInvoice from './pdfInvoiceTemplates/defaultInvoiceTemplate';
interface Item {
    name: string;
    price: number;
}
interface InvoiceDetailsState {
    vendorName: string;
    clientName: string;
    deliveryDate: Date;
    dueDate: Date;
}
export default function CreateInvoiceContainer({ }) {

    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailsState>({
        vendorName: "",
        clientName: "",
        deliveryDate: "", // Year, month (zero-based), day
        dueDate: "" // Year, month (zero-based), day
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInvoiceDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [items, setItems] = useState<Item[]>([]);
    const [newItemName, setNewItemName] = useState<string>();
    const [newItemPrice, setNewItemPrice] = useState<number>();
    const [total, setTotal] = useState<number>(0);

    const handleAddItem = () => {

        if (newItemName && newItemPrice) {
            const newItem: Item = {
                name: newItemName,
                price: parseFloat(newItemPrice),
            };
            setItems([...items, newItem]);
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

    const handleCreateInvoice = () => {
        // Add your logic to create the invoice
        console.log('Invoice created');
    };
    useEffect(() => {
        let totalPRice = items.reduce((total: any, item: any) => total + item.price, 0).toFixed(3)
        setTotal(totalPRice)
    }, [total]); // Empty dependency array to fetch data only once when component mounts

    return (
        <Fragment>

            <div className='flex h-[80vh]'>
                <div className="w-2/4 p-5 space-y-20 ">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Invoice</h1>
                        <div className="text-gray-600">Invoice #001</div>
                    </div>
                    <div className="flex justify-between mb-6 ">
                        <div className='flex flex-col items-start space-y-4'>
                            <div className="font-bold">Recipient</div>
                            <input
                                className='peer w-full border-b-2 border-gray-300 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                type="text"
                                placeholder="1234 Main Street, City, Country"
                                value={invoiceDetails.vendorName}
                                name='vendorName'
                                onChange={handleInputChange}
                            />
                            <div className="font-bold">Date de livraison</div>
                            <input
                                className='peer  w-full border-b-2 border-gray-300  placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                type="date"
                                placeholder="1234 Main Street, City, Country"
                                value={invoiceDetails.deliveryDate}
                                name='deliveryDate'

                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-col items-start space-y-4'>
                            <div className="font-bold ">Destinataire</div>
                            <input
                                className='peer w-full border-b-2 border-gray-300   placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                type="text"
                                placeholder="1234 Main Street, City, Country"
                                value={invoiceDetails.clientName}
                                name='clientName'

                                onChange={handleInputChange}
                            />
                            <div className="font-bold ">Date d'expiration </div>
                            <input
                                className='peer w-full border-b-2 border-gray-300  placeholder:text-transparent focus:border-gray-500 focus:outline-none'
                                type="date"
                                placeholder="1234 Main Street, City, Country"
                                value={invoiceDetails.dueDate}
                                name='dueDate'

                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left py-2">Description</th>
                                <th className="text-right py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody >
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-t py-2 text-left">{item.name}</td>
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
                                            onChange={(e) => setNewItemName(e.target.value)}
                                        />
                                        <input
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
                                <td className="border-t font-bold py-2  text-left">Total:</td>
                                <td className="border-t font-bold text-right py-2">{total}</td>
                            </tr>

                        </tfoot>
                    </table>
                    <div className='flex justify-between'>
                        <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleSaveDraft}>Save Draft</button>
                        <button className='border-blue-300 bg-transparent hover:bg-gray-100 transition  ease-in' onClick={handleCreateInvoice}>Create Invoice</button>
                    </div>
                </div>
                <div className='w-2/4'>
                    <PDFViewer width="100%" height="90%">
                        <PDFInvoice
                            invoiceDetails={invoiceDetails}
                            items={items}
                            newItemName={newItemName}
                            newItemPrice={newItemPrice}
                            total={total}
                        />
                    </PDFViewer>
                </div>
            </div>
        </Fragment>
    )
}
