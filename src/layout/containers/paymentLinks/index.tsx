import React, { Fragment, useEffect, useState } from 'react'
import ViewPaymentLinks from '../../../views/paymentLinks/viewPaymentLinks'
import { PaymentLinksService } from '../../../services/paymentLinkService';

type Props = {}

export default function PaymentLinksContainer({ }: Props) {
    const [paymentlink, setPaymentLinks] = useState<[]>([]);
    const getPaymentLinks = async () => {
        try {
            const response = await PaymentLinksService.getAll();
            console.log(response)
            setPaymentLinks(response); // Directly set invoices to the response
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    useEffect(() => {
        getPaymentLinks();
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <Fragment>
            {paymentlink && paymentlink.length !== 0 ? (
                <ViewPaymentLinks paymentLinks={paymentlink}></ViewPaymentLinks>
            ) : (
                "no data yet"
            )}

        </Fragment>
    )
}
