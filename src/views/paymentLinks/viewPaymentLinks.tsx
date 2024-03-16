import { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import BottomNav from '../../components/common/bottomNav';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { fetchPaymentLinks, setPage, setPageSize } from '../../redux/features/paymentLinks';
import { setSearchTerm } from '../../redux/features/invoices';

export default function ViewPaymentLinks() {
    const dispatch = useAppDispatch();

    const { paymentLinks, paymentLinkCount, pageSize, page, searchTerm, loading } = useAppSelector((state: RootState) => state.paymentLinks);


    const handlePageSizeChange = (size: number) => {
        dispatch(setPageSize(size));
    };

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    };

    useEffect(() => {
        dispatch(fetchPaymentLinks(page, pageSize, searchTerm)); // Dispatch the action with current searchTerm
    }, [searchTerm, dispatch]);
    const totalPages = Math.ceil(paymentLinkCount);

    return (
        <Fragment >

            {!paymentLinks || loading ? ( // Show pulse animation while loading
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
            ) : (
                <Fragment>

                    {paymentLinks.length != 0 ? (
                        <DynamicTable data={paymentLinks} columnMapping={["Nom de facture", "Réference de Facture", "Date de creation", "Date d'éxpiration", "Actions"]} ></DynamicTable>
                    ) : (
                        <div className='bg-gray-50 text-gray-400 rounded-lg p-10 m-5 '>Vous n'avais aucun lien de paiment pour le moment.</div>
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
