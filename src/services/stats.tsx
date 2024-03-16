

import { axiosInstance } from './axios';

const STATS_BASE_URL = '/statistics';

export const StatsService = {

    getAll: async () => {
        try {
            const response = await axiosInstance.get(`${STATS_BASE_URL}/globalstats`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};
