import React, { Fragment, useEffect, useState } from 'react';
import UserListTable from '../../components/table/index';

type Props = { invoices: [] };

export default function ViewInvoices({ invoices }: Props) {


    return (
        <Fragment >
            <UserListTable data={invoices} columns={[
                "number",
                "expired",
                "status",
                "discount",
                "total",
                "payment_method",
                "currency",
                "created_at",
            ]}></UserListTable>
        </Fragment>
    );
}
