import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from '../../components/table/index';

type Props = { invoices: [] };

export default function ViewInvoices({ invoices }: Props) {


    return (
        <Fragment >
            <div className='flex flex-col'>
                <div className='flex justify-between items-center p-5'>
                    <div className='flex'>
                        Filter
                    </div>
                    <button className="bg-blue-600 text-white w-auto  rounded-md">Créer une facture</button>

                </div>
                <DynamicTable data={invoices} columnMapping={{
                    "invoice_name": "Invoice Name",
                    "invoice_number": "Bill Number",
                    "status": "Status",
                    "total": "Total",
                    "currency": "Currency",
                    "created_at": "Creation Date",
                    "actions": "Actions"
                }}>
                </DynamicTable>
            </div>

        </Fragment>
    );
}
