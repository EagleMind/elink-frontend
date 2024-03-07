import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useParams } from 'react-router-dom';
import { PaymentLinksService } from '../../services/paymentLinkService';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement, ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
interface Item {
    description: string;
    price: number;
    _id: string;
}

interface PerformanceMetrics {
    nb_clicks: number;
    conversion_rate: number;
    time_of_clicks: any[]; // You may want to specify the type of this array
    abandonment_rate: number;
    average_payment_amount: number;
    userLocation: any[]; // You may want to specify the type of this array
}

interface ReusablePaymentLink {
    performance_metrics: PerformanceMetrics;
    _id: string;
    invoice_id: string;
    link_type: string;
    url: string;
    created_at: string;
    __v: number;
}

interface Invoice {
    _id: string;
    user_id: string;
    invoice_number: string;
    invoice_name: string;
    client_name: string;
    vendor_name: string;
    status: string;
    created_at: string;
    delivery_date: string;
    due_date: string;
    items: Item[];
    total: number;
    __v: number;
    reusable_payment_link: ReusablePaymentLink;
}

const PaymentLinkDashboard: React.FC = () => {
    const { paymentlinkId } = useParams()
    const [stats, setStats] = useState({
        labels: [],
        datasets: [
            {
                label: [],
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    });

    const getPaymentLinkDetails = async (paymentlinkId: string) => {
        try {
            const response = await PaymentLinksService.getById(paymentlinkId);
            // Process the data to extract labels and dataset values
            const labels = [
                "2024-03-01",
                "2024-03-02",
                "2024-03-03",
                "2024-03-04",
                "2024-03-05",
                "2024-03-06",
                "2024-03-07",
                "2024-03-08",
                "2024-03-09"]
            const clicksData = response.reusable_payment_link.performance_metrics.nb_clicks

            // setStats({
            //     labels: labels,
            //     datasets: [
            //         {
            //             label: 'Number of Clicks',
            //             data: clicksData,
            //             fill: false,
            //             borderColor: 'rgb(75, 192, 192)',
            //             tension: 0.1
            //         },
            //         {
            //             label: 'Conversion Rate',
            //             data: conversionRates.map(rate => rate.rate),
            //             fill: false,
            //             borderColor: 'rgb(75, 192, 192)',
            //             tension: 0.1
            //         }
            //     ],

            // });
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };
    useEffect(() => {
        getPaymentLinkDetails(paymentlinkId)

    }, [])



    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Link Dashboard</h2>
            {/* {chartData ? (
                <Line data={chartData}></Line>
            ) : (
                <div>Loading...</div>
            )} */}
        </div>
    );
};

export default PaymentLinkDashboard;
