import { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
type Props = {
    data: any
}

export default function ViewPaymentLinks({ data }: Props) {

    useEffect(() => {
    }, [data]);

    return (
        <Fragment >
            {data && data.length !== 0 ? (
                <DynamicTable feature='paymentlinks' data={data} columnMapping={{
                    "invoice_name": "Invoice Name",
                    "link_type": "Link Type",
                    "created_at": "Creation Date",
                    "actions": "Actions"
                }} ></DynamicTable>
            ) : (
                "no data yet"
            )}


        </Fragment>
    );
}
