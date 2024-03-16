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
        dispatch(fetchInvoices(pageSize, page, searchTerm));
    }, [dispatch, searchTerm]);


    const renderComponent = () => {
        if (location.pathname === '/viewInvoices') {
            return <div className='flex flex-col'>
                <div className='flex p-5 justify-between'>
                    <input
                        type="text"
                        className="p-16 bg-white focus:outline-none focus:shadow-outline border border-blue-300 rounded-md py-2 px-2 block appearance-none leading-normal"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch} />
                    <Link to={"/createInvoice"} className="bg-blue-100 p-3 hover:text-white hover:bg-blue-400 text-blue-600 w-auto transition ease-in  rounded-md">Créer une facture</Link>

                </div>
                <hr></hr>
                <ViewInvoices  ></ViewInvoices>
            </div>
        } else {
            return (
                <Fragment>
                    <CreateAndEditInvoice ></CreateAndEditInvoice>
                </Fragment>
            );
        }
    };
    return (
        <Fragment>
            <div className='flex justify-between items-center'>
                {renderComponent()}

            </div>


        </Fragment>
    )
}
