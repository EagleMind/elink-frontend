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
const INVOICES_BASE_URL = '/invoices';

// Service to interact with invoice-related endpoints
export const InvoiceService = {
    // Create a new invoice
    create: async (invoiceData: any) => {
        try {
            const response = await axiosInstance.post(INVOICES_BASE_URL, invoiceData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all invoices
    getAll: async (query: string) => {
        try {
            const response = await axiosInstance.get(`${INVOICES_BASE_URL}/?link_type=${query}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get an invoice by ID
    getById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${INVOICES_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update an invoice by ID
    updateById: async (id: string, updatedData: any) => {
        try {
            const response = await axiosInstance.put(`${INVOICES_BASE_URL}/${id}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete an invoice by ID
    deleteById: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${INVOICES_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
