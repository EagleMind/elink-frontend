import { Fragment, useEffect, useState } from 'react';
import DynamicTable from './table/index';
import BottomNav from '../../components/common/bottomNav';

type Props = {
    data: any
}

export default function ViewPaymentLinks({ data }: Props) {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // Add loading state
    const totalPages = Math.ceil(data.reusablePaymentLinksCount);


    useEffect(() => {
        data ? setLoading(false) : setLoading(true)
    }, [loading, pageSize, page]);

    return (
        <Fragment >
            {loading ? ( // Show pulse animation while loading
                <div className="animate-pulse bg-gray-200 text-gray-400 rounded-lg p-10 m-5">Loading...</div>
            ) : (
                <Fragment>
                    {totalPages != 0 ? (
                        <DynamicTable data={data.links} columnMapping={["Nom de facture", "Réference de Facture", "Type de lien", "Date de creation", "Lien de paiment", "Actions"]} ></DynamicTable>
                    ) : (
                        <div className='bg-gray-50 text-gray-400 rounded-lg p-10 m-5 '>Vous n'avais aucun lien de paiment pour le moment.</div>
                    )}
                    <BottomNav totalPages={totalPages} page={page} pageSize={pageSize} setPageSize={setPageSize} setPage={setPage}></BottomNav>
                </Fragment>
            )}
        </Fragment>
    );
}
