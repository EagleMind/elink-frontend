import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useLocation hook
import ViewPaymentLinks from '../../../views/paymentLinks/viewPaymentLinks';
import { PaymentLinksService } from '../../../services/paymentLinkService';
import PaymentLinkPerformance from '../../../views/paymentLinks/linkPerformanceView';

type Props = {};

interface PaymentLink {
    _id: string;
    invoice_id: string;
    link_type: string;
    url: string;
    created_at: Date;
    payment_method?: string;
    currency?: string;
    performance_metrics: {
        nb_clicks: number;
        userLocation: { latitude: number; longitude: number }[];
        conversion_rate: number;
        referral_source?: string;
        device_type?: string;
        time_of_clicks: Date[];
        abandonment_rate: number;
        average_payment_amount: number;
    };
    isExpired: boolean;
}
export default function PaymentLinksContainer({ }: Props) {
    const [paymentlink, setPaymentLinks] = useState<PaymentLink[]>([]);




    const getPaymentLinks = async () => {
        try {
            const response = await PaymentLinksService.getAll();
            setPaymentLinks(response);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    useEffect(() => {
        getPaymentLinks();

    }, []);


    return (
        <Fragment>
            <ViewPaymentLinks data={paymentlink} />
        </Fragment>
    );
}
