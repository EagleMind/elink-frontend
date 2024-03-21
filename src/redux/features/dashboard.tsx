import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { StatisticsServices } from '../../services/dashboard';

interface DashboardData {
    totalInvoices: number;
    averageInvoiceAmount: number;
    mostFrequentClients: any[];
    statusDistribution: any[];
    averageItemsPerInvoice: number;
    weeklyInvoices: any
    totalRevenue: number;
}

interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchDashboardDataRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardDataSuccess: (state, action: PayloadAction<DashboardData>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDashboardDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const fetchDashboardData = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchDashboardDataRequest());
        const response = await StatisticsServices.fetchInvoicesStats();

        // Log the response to check if it contains the data
        console.log('Response:', response);

        if (!response) {
            throw new Error('No data received');
        }

        // Dispatch success action with the data directly, without accessing response.data
        dispatch(fetchDashboardDataSuccess(response));
    } catch (error: any) {
        dispatch(fetchDashboardDataFailure(error.message));
    }
};

export const {
    fetchDashboardDataRequest,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure,
} = dashboardSlice.actions;

export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;
