
import { axiosInstance } from './axios';

// Define the base URL for invoices
const PAYMENTLINKS_BASE_URL = '/paymentLink';

// Service to interact with invoice-related endpoints
export const PaymentLinksService = {
    // Create a new payment link
    create: async (data: any) => {
        try {
            const response = await axiosInstance.post(PAYMENTLINKS_BASE_URL, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all payment links
    getAll: async () => {
        try {
            const response = await axiosInstance.get(PAYMENTLINKS_BASE_URL);
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get  payment link by ID
    getById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${PAYMENTLINKS_BASE_URL}/getPaymentLinkDetails/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update payment link by ID
    updateById: async (id: string, updatedData: any) => {
        try {
            const response = await axiosInstance.put(`${PAYMENTLINKS_BASE_URL}/${id}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete  payment link by ID
    deleteById: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`${PAYMENTLINKS_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
