
import { axiosInstance } from './axios';

// Define the base URL for invoices
const PAYMENT_GATEWAY_BASE_URL = '/payment/pay';

// Service to interact with invoice-related endpoints
export const paymentGatewayService = {
    // Create a new invoice
    getInvoiceDetails: async (id: string) => {
        try {
            const response = await axiosInstance.get(`${PAYMENT_GATEWAY_BASE_URL}/?secureLink=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    // send stats
    saveVisitorStats: async (performance_metrics: any,
        invoice_id: string) => {
        try {
            const response = await axiosInstance.post(`${PAYMENT_GATEWAY_BASE_URL}/stats`, { performance_metrics, invoice_id });
            return response.data;
        } catch (error) {
            throw error;
        }
    },


};
