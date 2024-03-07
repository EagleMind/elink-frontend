import { Fragment, useEffect, useState } from 'react'
import ViewInvoices from '../../../views/Invoices/viewInvoices'
import { InvoiceService } from '../../../services/invoices';
import CreateAndEditInvoice from '../../../views/Invoices/createInvoice';
import { useLocation } from 'react-router-dom';


export default function ViewInvoicesContainer({ }) {
    const [invoices, setInvoices] = useState<[]>([]);
    const location = useLocation();
    console.log(location)
    const getInvoices = async () => {
        try {
            const response = await InvoiceService.getAll();
            setInvoices(response); // Directly set invoices to the response
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    useEffect(() => {
        getInvoices();

    }, [location]); // Empty dependency array to fetch data only once when component mounts
    const renderComponent = () => {
        if (location.pathname === '/viewInvoices') {
            return <ViewInvoices data={invoices} ></ViewInvoices>
        } else {
            return (
                <Fragment>
                    <CreateAndEditInvoice ></CreateAndEditInvoice>
                </Fragment>
            );
        }
    };
    return (
        <Fragment>
            {renderComponent()}

        </Fragment>
    )
}
