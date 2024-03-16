import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StatsService } from '../../services/stats';

interface ClickData {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

const LivePerformanceView: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<any[]>([]);
    const [paymentLinkData, setPaymentLinkData] = useState<any[]>([]);
    const fetchData = async () => {
        try {
            const response = await StatsService.getAll()
            const { invoices, paymentLinks } = response;
            console.log("response", response)
            console.log("invoices", invoices)
            console.log("paymentLinks", paymentLinks)
            setInvoiceData(invoices);
            setPaymentLinkData(paymentLinks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    console.log('Invoices:', invoiceData);
    console.log('Payment Links:', paymentLinkData);

    // Data processing for invoices per user chart
    const invoicesPerUser: { [key: string]: number } = {};
    invoiceData.forEach((invoice: any) => {
        const userName = invoice.invoice_name; // Assuming client_name is the user name
        invoicesPerUser[userName] = invoicesPerUser[userName] ? invoicesPerUser[userName] + 1 : 1;
    });

    // Data processing for payment link clicks chart
    const clickData: ClickData[] = paymentLinkData.map((link: any) => {
        return {
            label: link.name,
            data: link.performance_metrics.nb_clicks.map((click: any) => click.click),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
        };
    });

    console.log("invoicesPerUser", invoicesPerUser)
    console.log("clickData", clickData)
    // Register chart elements for Chart.js
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    return (
        <div>
            <h2>Charts</h2>
            <div>
                <h3>Invoices per User</h3>
                <Line data={{ labels: Object.keys(invoicesPerUser), datasets: [{ data: Object.values(invoicesPerUser) }] }} />
            </div>
            <div>
                <h3>Payment Link Clicks</h3>
                <Line data={{ labels: paymentLinkData.map((link: any) => link.name), datasets: clickData }} />
            </div>

        </div>
    );
};

export default LivePerformanceView;
