import React, { Fragment, useEffect, useState } from 'react'
import UserListTable from '../../components/table/index'
import { getAllInvoices } from '../../services/invoices'
type Props = {}

export default function ViewInvoices({ }: Props) {
    const [talents, setInvoices] = useState<[]>([])
    const getInvoices = async () => {
        const invoices = await getAllInvoices()
        setInvoices(invoices.data)
    }
    useEffect(() => {
        getInvoices()
    }, [])
    return (
        <Fragment>
            {/* <Stats StatsCubes={<StatsCubes />} Chart={<Chart></Chart>}></Stats> */}
            <UserListTable data={talents} columns={Object.keys(talents)}></UserListTable>
        </Fragment>
    )
}