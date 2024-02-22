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


// Function to create an invoice
async function createInvoice(invoiceData: Invoice, token: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.post(`${VITE_REACT_APP_BASE_URL}/invoices`, invoiceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// Function to get all invoices
async function getAllInvoices(): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.get(`${VITE_REACT_APP_BASE_URL}/invoices`);
        return response;
    } catch (error) {
        throw error;
    }
}

// Function to get an invoice by ID
async function getInvoiceById(id: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.get(`${VITE_REACT_APP_BASE_URL}/invoices/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

// Function to update an invoice by ID
async function updateInvoiceById(id: string, updatedData: any, token: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.put(`${VITE_REACT_APP_BASE_URL}/invoices/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// Function to delete an invoice by ID
async function deleteInvoiceById(id: string, token: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.delete(`${VITE_REACT_APP_BASE_URL}/invoices/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export { createInvoice, getAllInvoices, getInvoiceById, updateInvoiceById, deleteInvoiceById }