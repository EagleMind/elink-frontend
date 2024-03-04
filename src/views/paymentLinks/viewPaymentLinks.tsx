import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from '../../components/table/index';

type Props = { paymentLinks: [] };

export default function ViewPaymentLinks({ paymentLinks }: Props) {


    return (
        <Fragment >
            <DynamicTable data={paymentLinks} columnMapping={{
                "invoice_name": "Invoice Name",
                "invoice_number": "N.Invoice",
                "link_type": "Link Type",
                "nb_clicks": "Number of Clicks",
                "conversion_rate": "Conversion Rate (%)",
                "time_of_clicks": "Time of Clicks",
                "abandonment_rate": "Abandonment Rate",
                "average_payment_amount": "Average Payment Amount",
                "created_at": "Creation Date",
            }} ></DynamicTable>
        </Fragment>
    );
}
