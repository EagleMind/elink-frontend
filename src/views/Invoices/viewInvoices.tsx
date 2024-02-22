import React, { Fragment, useEffect, useState } from 'react';
import UserListTable from '../../components/table/index';

type Props = { invoices: [] };

export default function ViewInvoices({ invoices }: Props) {


    return (
        <Fragment >
            <UserListTable data={invoices} columns={[
                "Bill Number",
                "Expired",
                "Status",
                "Discount",
                "Total",
                "Payment Method",
                "Currency",
                "Creation Date",
            ]}></UserListTable>
        </Fragment>
    );
}
