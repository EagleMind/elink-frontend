import axios, { AxiosResponse } from 'axios';
// VITE_REACT_APP_BASE_URL is normally localhost:port/api/v1
// Define the base URL where your Express server is running
const VITE_REACT_APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Update with your server details

interface Invoice {
    seller_id: string;
    customer_id: string;
    number: string;
    expired: boolean;
    status: string;
    due_date: string;
    items: {
        description: string;
        quantity: number;
        unit_price: number;
        total_price: number;
    }[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    payment_method: string;
    currency: string;
}

import { axiosInstance } from './axios';

// Define the base URL for invoices
const INVOICES_BASE_URL = '/statistics/invoice-statistics';


export const StatisticsServices = {
    fetchInvoicesStats: async () => {
        try {
            const response = await axiosInstance.get(INVOICES_BASE_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    },


};
