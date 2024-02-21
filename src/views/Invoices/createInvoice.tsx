import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DynamicForm from '../../components/common/dynInput';
// import { createInvoice } from './redux/actions'; // Make sure you have your action creators defined



function InvoiceForm() {

    const [parentState, setParentState] = useState<any>({});

    // Function to update the state in the parent component
    const updateParentState = (data: any) => {
        setParentState(data);
        console.log(parentState)
    };

    //   const dispatch = useDispatch();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch action to create invoice
        // dispatch(createInvoice(formData));
    };
    const inputConfigs = [
        { name: "sellerName", label: "Vendor/Seller Name", type: "text" },
        { name: "sellerAddress", label: "Vendor/Seller Address", type: "text" },
        { name: "sellerCity", label: "Vendor/Seller City", type: "text" },
        { name: "sellerZipCode", label: "Vendor/Seller Zip Code", type: "text" },
        { name: "sellerCountry", label: "Vendor/Seller Country", type: "text" },
        { name: "clientName", label: "Vendor/Seller Name", type: "text" },
        { name: "clientAddress", label: "Vendor/Seller Address", type: "text" },
        { name: "clientCity", label: "Vendor/Seller City", type: "text" },
        { name: "clientZipCode", label: "Vendor/Seller Zip Code", type: "text" },
        { name: "clientCountry", label: "Vendor/Seller Country", type: "text" },
        { name: "invoiceDate", label: "Invoice Date", type: "date" },
        { name: "dueDate", label: "Invoice Date", type: "date" },
        { name: "items", label: "Itemized List", type: "array" },
    ]

    return (
        <div>
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit}>

                {/* Add other input fields based on the schema */}
                {/* Due Date is set from backend, removed from form */}
                {/* Iterate over items */}
                <DynamicForm inputConfigs={inputConfigs} updateParentState={updateParentState} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default InvoiceForm;
