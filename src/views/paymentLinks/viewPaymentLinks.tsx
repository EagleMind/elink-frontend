import { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import BottomNav from '../../components/common/bottomNav';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setPage, setPageSize } from '../../redux/features/paymentLinks';

export default function ViewPaymentLinks() {


    const dispatch = useAppDispatch();

    const { paymentLinks, paymentLinkCount, pageSize, page, loading } = useAppSelector((state: RootState) => state.paymentLinks);


    const handlePageSizeChange = (size: number) => {
        dispatch(setPageSize(size));
    };

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    };

    useEffect(() => {

    }, [dispatch]);

    const totalPages = Math.ceil(paymentLinkCount / pageSize);

    return (
        <Fragment >

            {!paymentLinks || loading ? (
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
            ) : (
                <Fragment>

                    {paymentLinks.length != 0 ? (
                        <DynamicTable data={paymentLinks} columnMapping={["Nom/tag de Lien", "Réference de Facture", "Date de creation", "Date d'éxpiration", "Actions"]} ></DynamicTable>
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
