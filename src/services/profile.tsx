import axios, { AxiosResponse } from 'axios';
// VITE_REACT_APP_BASE_URL is normally localhost:port/api/v1
// Define the base URL where your Express server is running
const VITE_REACT_APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Update with your server details

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    bio: string;
    profilePicture: string;
    social_media_links: { [key: string]: string };
}

import { axiosInstance } from './axios';

// Define the base URL for invoices
const PROFILE_BASE_URL = '/auth';


export const ProfileServices = {
    fetchProfileInfos: async () => {
        try {
            const response = await axiosInstance.get<Profile>(`${PROFILE_BASE_URL}/profile`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateProfile: async (data: any) => {
        try {
            const response = await axiosInstance.put<Profile>(`${PROFILE_BASE_URL}/update`, data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },


};
