import { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import BottomNav from '../../components/common/bottomNav';
import { fetchInvoices, setPage, setPageSize, setSearchTerm } from '../../redux/features/invoices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export default function ViewInvoices() {
    const dispatch = useAppDispatch();
    const { pageSize, page, invoices, invoicesCount, searchTerm, loading } = useAppSelector((state: RootState) => state.invoices);
    const handlePageSizeChange = (size: number) => {
        dispatch(setPageSize(size));
    };

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    };


    useEffect(() => {
        dispatch(fetchInvoices(page, pageSize, searchTerm));
    }, [dispatch]);

    const totalPages = Math.ceil(invoicesCount);

    return (
        <Fragment >

            {!invoices || loading ? (
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
            ) : (
                <Fragment>

                    {invoices && invoices.length !== 0 ? (
                        <DynamicTable columnMapping={[
                            "Nom de facture",
                            "Réference",
                            "Type de lien",
                            "Status",
                            "Date de creation",
                            "Date d'éxpiration",
                            "Actions"]}>
                        </DynamicTable>
                    ) : (
                        <div className='bg-gray-50 text-gray-400 rounded-lg p-10 m-5 '>Vous n'avais encore crée aucune facture</div>
                    )}
                    <BottomNav
                        totalPages={totalPages}
                        page={page}
                        pageSize={pageSize}
                        setPageSize={handlePageSizeChange}
                        setPage={handlePageChange}
                    />
                </Fragment>
            )}
        </Fragment>
    );
}
