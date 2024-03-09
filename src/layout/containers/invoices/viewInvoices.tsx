import { Fragment, useEffect, useState } from 'react'
import ViewInvoices from '../../../views/Invoices/viewInvoices'
import { InvoiceService } from '../../../services/invoices';
import CreateAndEditInvoice from '../../../views/Invoices/createInvoice';
import { Link, useLocation } from 'react-router-dom';


export default function ViewInvoicesContainer({ }) {
    const [invoices, setInvoices] = useState<[]>([]);
    const location = useLocation();
    const getInvoices = async () => {
        try {
            const response = await InvoiceService.getAll("reusable");
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
            <div className='flex justify-between items-center p-5'>
                <div className='flex'>
                    Filter
                </div>
                <Link to={"/createInvoice"} className="bg-blue-100 p-3 hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md">Créer une facture</Link>

            </div>
            <hr></hr>
            {renderComponent()}

        </Fragment>
    )
}
