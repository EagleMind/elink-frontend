import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../services/axios';
import moment from 'moment';

interface Exception {
    _id: string;
    timestamp: Date;
    userId: string;
    route: string;
    method: string;
    error: {
        message: string;
        // Add more error properties if needed
    };
}

function ExceptionList() {
    const [exceptions, setExceptions] = useState<Exception[]>([]);

    useEffect(() => {
        async function fetchExceptions() {
            try {
                const response = await axiosInstance.get("http://localhost:3000/api/v1/errorReporter/errorLog/exceptions");

                setExceptions(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchExceptions();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-left text-blue-400">Exceptions List</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr className='bg-gradient-to-br from-cyan-500 to-blue-500  '>
                        <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white">Timestamp</th>
                        <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white">User ID</th>
                        <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white">Route</th>
                        <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white">Method</th>
                        <th className="p-5 text-left text-xs font-mulish text-grey1 md:text-[14px] bg-blue-400 text-white">Error</th>
                    </tr>
                </thead>
                <tbody>
                    {exceptions.map(exception => (
                        <tr key={exception._id}>
                            <td className="text-left p-3 border-b border-grey3 bg-white text-sm w-fit">{moment(exception.timestamp).format("YYYY-MM-DD")}</td>
                            <td className="text-left p-3 border-b border-grey3 bg-white text-sm w-fit">{exception.userId ?? "No Id detected"}</td>
                            <td className="text-left p-3 border-b border-grey3 bg-white text-sm w-fit">{exception.route}</td>
                            <td className="text-left p-3 border-b border-grey3 bg-white text-sm w-fit">{exception.method}</td>
                            <td className="text-left p-3 border-b border-grey3 bg-white text-sm w-fit">{exception.error.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExceptionList;
