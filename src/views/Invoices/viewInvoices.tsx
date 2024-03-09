import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import BottomNav from '../../components/common/bottomNav';
type Props = {
    data: any
}

export default function ViewInvoices({ data }: Props) {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.invoicesCount);
    const [loading, setLoading] = useState(true); // Add loading state
    useEffect(() => {
        data ? setLoading(false) : setLoading(true)
    }, [loading, pageSize, page]);
    return (

        <Fragment >
            {loading ? (
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
            ) : (
                <Fragment>
                    {data && data.length !== 0 ? (
                        <DynamicTable data={data.invoices} columnMapping={[
                            "Nom de facture",
                            "Réference",
                            "Status",
                            "Date de creation",
                            "Date d'éxpiration",
                            "Actions"]}>
                        </DynamicTable>
                    ) : (
                        <div className='bg-gray-50 text-gray-400 rounded-lg p-10 m-5 '>No data available</div>
                    )}
                    <BottomNav totalPages={totalPages} page={page} pageSize={pageSize} setPageSize={setPageSize} setPage={setPage}></BottomNav>
                </Fragment>
            )}
        </Fragment>
    );
}
