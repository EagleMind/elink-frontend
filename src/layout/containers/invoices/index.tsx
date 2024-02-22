import React, { Fragment, useEffect, useState } from 'react'
import ViewInvoices from '../../../views/Invoices/viewInvoices'
import { InvoiceService } from '../../../services/invoices';

type Props = {}

export default function InvoicesContainer({ }: Props) {
    const [invoices, setInvoices] = useState<[]>([]);

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
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <Fragment>
            {invoices && invoices.length !== 0 ? (
                <ViewInvoices invoices={invoices}></ViewInvoices>
            ) : (
                "no data yet"
            )}

        </Fragment>
    )
}
