import { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PayLink from '../../../views/paymentGateway/payLink';
import { paymentGatewayService } from '../../../services/paymentGateway';


export default function CheckoutViewContainer({ }) {
    const [invoiceDetails, setInvoiceDetails] = useState<any>({})
    const [loading, setLoading] = useState<any>({})
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const secureLink = queryParams.get('secureLink');
    const getInvoiceDetails = async (id: string) => {
        setLoading(true)
        try {
            const invoice = await paymentGatewayService.getInvoiceDetails(id);
            setInvoiceDetails(invoice);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        };
    }
    if (!secureLink) {
        return "Error"
    }
    useEffect(() => {
        if (secureLink) {
            getInvoiceDetails(secureLink)
        }
    }, [])

    return (
        <Fragment>
            <PayLink invoiceDetails={invoiceDetails} loading={loading}></PayLink>
        </Fragment>
    )
}
