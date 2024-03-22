import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StatisticsServices } from '../../services/dashboard';

interface UsageTrendData {
    _id: string;
    count: number;
}

const LivePerformanceView: React.FC = () => {
    const [usageTrendData, setUsageTrendData] = useState<any>();
    const [deviceDistributionData, setDeviceDistributionData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await StatisticsServices.fetchPaymentLinkStats();
            if (!response.usageTrend || response.usageTrend.length === 0 || !response.deviceDistribution || response.deviceDistribution.length === 0) {
                return null;
            }
            const usageTrendLabels = response.usageTrend.map(entry => entry._id);
            const usageTrendCounts = response.usageTrend.map(entry => entry.count);
            const deviceDistributionLabels = response.deviceDistribution.map(entry => entry._id);
            const deviceDistributionCounts = response.deviceDistribution.map(entry => entry.count);
            const usageTrendDataset = {
                labels: usageTrendLabels,
                datasets: [
                    {
                        label: 'Usage Trend',
                        data: usageTrendCounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        tension: 0,
                    }
                ]
            };

            const deviceDistributionDataset = {
                labels: deviceDistributionLabels,
                datasets: [
                    {
                        label: 'Device Distribution',
                        data: deviceDistributionCounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }
                ]
            };
            setUsageTrendData(usageTrendDataset);
            setDeviceDistributionData(deviceDistributionDataset);
            setLoading(false);

        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <div className="animate-pulse  text-gray-400 rounded-lg p-10 m-5">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    return (
        <div className="flex flex-col py-5">
            <header className='flex justify-start'>
                <h2 className='font-semibold text-2xl px-5 pb-5'>Statistiques</h2>
            </header>
            <hr></hr>
            <div className='flex'>
                <div style={{ width: '50%' }}>

                    {usageTrendData && <Line data={usageTrendData} options={{ responsive: true }} />}
                </div>
                <div style={{ width: '50%' }}>
                    {deviceDistributionData && <Line data={deviceDistributionData} options={{ responsive: true }} />}
                </div>
            </div>

        </div>
    );
};

export default LivePerformanceView;
