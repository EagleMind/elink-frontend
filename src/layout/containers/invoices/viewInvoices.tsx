import { Fragment, useEffect, useState } from 'react'
import ViewInvoices from '../../../views/Invoices/viewInvoices'
import CreateAndEditInvoice from '../../../views/Invoices/createInvoice';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { fetchInvoices, setSearchTerm } from '../../../redux/features/invoices';


export default function ViewInvoicesContainer({ }) {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const { pageSize, page, searchTerm } = useAppSelector((state: RootState) => state.invoices);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        dispatch(setSearchTerm(term));
    };
    useEffect(() => {
        dispatch(fetchInvoices(page, pageSize, searchTerm));
    }, [dispatch, searchTerm, page, pageSize]);


    const renderComponent = () => {
        if (location.pathname === '/viewInvoices') {
            return <div className='flex flex-col'>
                <div className='flex py-5 justify-between'>
                    <input
                        type="text"
                        className=" bg-white focus:outline-none focus:shadow-outline border border-blue-300 rounded-md py-2 px-2 block appearance-none leading-normal"
                        placeholder="Chercher par attribue"
                        value={searchTerm}
                        onChange={handleSearch} />
                    <button className='bg-blue-200 p-3 hover:text-white hover:bg-blue-600 text-blue-800 w-auto h-auto transition ease-in  rounded-md'>
                        <Link to={"/createInvoice"} className="">Créer une facture</Link>

                    </button>

                </div>
                <hr></hr>
                <ViewInvoices  ></ViewInvoices>
            </div>
        } else {
            return (
                <div className='flex'>
                    <CreateAndEditInvoice ></CreateAndEditInvoice>
                </div>
            );
        }
    };
    return (
        <div className='bg-white p-3 rounded-md'>
            {renderComponent()}
        </div>
    )
}
