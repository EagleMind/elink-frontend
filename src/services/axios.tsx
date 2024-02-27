import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Define the base URL where your Express server is running
const VITE_REACT_APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Update with your server details

// Define a function to create and configure the Axios instance
function createAxiosInstance(): AxiosInstance {
    const config: AxiosRequestConfig = {
        baseURL: VITE_REACT_APP_BASE_URL,
        timeout: 5000, // Adjust the timeout as per your needs
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const instance: AxiosInstance = axios.create(config);

    // Add any interceptors or default configurations if needed

    return instance;
}

// Export the configured Axios instance
export const axiosInstance: AxiosInstance = createAxiosInstance();
