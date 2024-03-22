import React, { Fragment, useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";

const Dashboard: React.FC = () => {
    const [dataset, setDataset] = useState<any>();
    const { data, loading, error } = useAppSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        if (data && data.weeklyInvoices) {
            // Prepare data for chart
            const labels = Object.keys(data.weeklyInvoices).sort();
            const dataChart = {
                labels,
                datasets: [
                    {
                        label: 'Ditribution de totalité de factures par semaine',
                        data: labels.map(week => data.weeklyInvoices[week]),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        tension: 0,
                    }
                ]
            };
            setDataset(dataChart);
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    return (
        data && <div className="flex flex-col h-screen">
            <main className="flex-1  p-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard title="Total Invoices" value={data.totalInvoices} />
                    <DashboardCard title="Average Invoice Amount" value={data.averageInvoiceAmount} />
                    <MostFrequentClients title="Most Frequent Clients" clients={data.mostFrequentClients} />
                    <DashboardCard title="Average Items Per Invoice" value={data.averageItemsPerInvoice} />
                    <DashboardCard title="Total Revenue" value={data.totalRevenue} />
                    <StatusDistribution title="Status Distribution" distribution={data.statusDistribution} />
                    {dataset && <Line data={dataset} options={{
                        responsive: true,

                    }} />}
                </div>
            </main>

        </div>
    );
};

interface DashboardCardProps {
    title: string;
    value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h2 className="text-md font-semibold">{title}</h2>
            <p className="text-xl mt-2">{value}</p>
        </div>
    );
};

interface MostFrequentClient {
    name: string;
    frequency: number;
}

interface MostFrequentClientsProps {
    clients: MostFrequentClient[];
    title: string
}
const MostFrequentClients: React.FC<MostFrequentClientsProps> = ({ title, clients }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg border border-gray-100 p-6">
            <h2 className="text-md font-semibold">{title}</h2>
            <ul className="overflow-y-scroll">
                {clients.map((client, index) => (
                    <li key={index} className="text-xl mt-2" >
                        {client.frequency}    <strong>{client.name}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface StatusDistributionProps {
    title: string;
    distribution: { _id: string; count: number }[];
}

const StatusDistribution: React.FC<StatusDistributionProps> = ({ title, distribution }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h2 className="text-md font-semibold">{title}</h2>
            <ul className="overflow-y-scroll">
                {distribution.map((status, index) => (
                    <li key={index} className="text-xl mt-2">
                        <strong>{status._id}</strong>: {status.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
