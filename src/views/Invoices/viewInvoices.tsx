import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import { Link } from 'react-router-dom';
import { InvoiceService } from '../../services/invoices';
type Props = {
    data: any
}

export default function ViewInvoices({ data }: Props) {
    console.log("data", data)
    return (
        <Fragment >
            <div className='flex flex-col'>
                <div className='flex justify-between items-center p-5'>
                    <div className='flex'>
                        Filter
                    </div>
                    <Link to={"/createInvoice"} className="bg-blue-100 p-3 hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md">Créer une facture</Link>

                </div>
                <DynamicTable data={data} feature='invoices' columnMapping={{
                    "invoice_name": "Invoice Name",
                    "invoice_number": "Bill Number",
                    "status": "Status",
                    "created_at": "Creation Date",
                    "actions": "Actions"
                }}>
                </DynamicTable>
            </div>

        </Fragment>
    );
}
