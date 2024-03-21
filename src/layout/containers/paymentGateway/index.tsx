import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PayLink from '../../../views/paymentGateway/payLink';
import { paymentGatewayService } from '../../../services/paymentGateway';
import { isMobile } from 'mobile-device-detect';

interface PerformanceMetrics {
    userLocation: {};
    referral_source: string;
    device_type: string;
}

export default function CheckoutViewContainer({ }) {
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
        userLocation: {},
        referral_source: "",
        device_type: ""
    });
    const [invoiceDetails, setInvoiceDetails] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true); // Initial loading state
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const secureLink = queryParams.get('secureLink');

    const getUserLocation = async (): Promise<string> => {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
            const data = await response.json();
            return `${data.locality}, ${data.countryName}`;
        } catch (error) {
            console.error('Error getting user location:', error);
            return ""; // Return empty string on error
        }
    };

    const getReferralSource = (): string => {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        return utmSource || "Direct"; // If no utm_source is available, consider it direct traffic
    };

    const getDeviceType = (): string => {
        return isMobile ? "Mobile" : "Desktop";
    };

    const trackPerformanceMetrics = async () => {
        const userLocation = await getUserLocation();
        const referralSource = getReferralSource();
        const deviceType = getDeviceType();
        await paymentGatewayService.saveVisitorStats({ userLocation, referralSource, deviceType }, secureLink);

    };

    const getInvoiceDetails = async (id: string) => {
        setLoading(true);
        try {
            const invoice = await paymentGatewayService.getInvoiceDetails(id);
            setInvoiceDetails(invoice);
        } catch (error) {
            console.error('Error fetching invoice details:', error);
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    const saveStats = async () => {
        try {
            await trackPerformanceMetrics()
        } catch (error) {
            console.error('Error sending performance metrics:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (secureLink) {
                await getInvoiceDetails(secureLink);
                await saveStats();
            } else {
                console.error('Secure link not found');
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            // You might want to perform some clean-up actions here if needed
        };
    }, [secureLink]); // Trigger useEffect when secureLink changes


    return (
        <Fragment>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <PayLink loading={loading} invoiceDetails={invoiceDetails} />
            )}
        </Fragment>
    );
}
