import React, { Fragment, useEffect, useState } from 'react';
import ViewPaymentLinks from '../../../views/paymentLinks/viewPaymentLinks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { fetchPaymentLinks } from '../../../redux/features/paymentLinks';
import CreatePaymentLink from '../../../views/paymentLinks/createPaymentLink';
import { setSearchTerm } from '../../../redux/features/paymentLinks';


export default function PaymentLinksContainer() {
    const dispatch = useAppDispatch();
    const { pageSize, page, searchTerm } = useAppSelector((state: RootState) => state.paymentLinks);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        dispatch(setSearchTerm(term));
    };
    useEffect(() => {
        dispatch(fetchPaymentLinks(page, pageSize, searchTerm));
    }, [dispatch, searchTerm]);

    const renderComponent = () => {
        if (location.pathname === '/paymentLinks') {
            return <div className='flex flex-col'>
                <div className='flex p-5 justify-between'>
                    <input
                        type="text"
                        className="p-16 bg-white focus:outline-none focus:shadow-outline border border-blue-300 rounded-md py-2 px-2 block appearance-none leading-normal"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch} />

                </div>
                <hr></hr><ViewPaymentLinks />
            </div>


        } else {
            return (
                <Fragment>
                    <CreatePaymentLink />
                </Fragment>
            );
        }
    };

    return (
        <Fragment>

            {renderComponent()}
        </Fragment>
    );
}
