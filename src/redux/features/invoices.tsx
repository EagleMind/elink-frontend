import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { InvoiceService } from '../../services/invoices';

interface InvoicesState {
    pageSize: number;
    page: number;
    invoices: any[];
    invoicesCount: number;
    loading: boolean;
    searchTerm: string;
    error: string | null;
}

const initialState: InvoicesState = {
    pageSize: 10,
    page: 1,
    invoices: [],
    invoicesCount: 0,
    searchTerm: '',
    loading: false,
    error: null,
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        fetchInvoicesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInvoicesSuccess: (state, action: PayloadAction<{ invoices: any[]; invoicesCount: number }>) => {
            state.loading = false;
            state.invoices = action.payload.invoices;
            state.invoicesCount = action.payload.invoicesCount;
        },
        fetchInvoicesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteInvoice: (state, action: PayloadAction<string>) => {
            state.invoices = state.invoices.filter((invoice) => invoice._id !== action.payload);
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },

    },
});

export const {
    setPageSize,
    setPage,
    fetchInvoicesRequest,
    fetchInvoicesSuccess,
    fetchInvoicesFailure,
    deleteInvoice,
    setSearchTerm,
} = invoicesSlice.actions;

export const fetchInvoices = (page: number, pageSize: number, searchTerm?: string): AppThunk => async (dispatch) => {

    try {
        dispatch(fetchInvoicesRequest());
        const response = await InvoiceService.getAll(pageSize, page, searchTerm || ''); // Pass searchTerm to the backend
        dispatch(fetchInvoicesSuccess({ invoices: response.invoices, invoicesCount: response.invoicesCount }));
    } catch (error: any) {
        dispatch(fetchInvoicesFailure(error.message));
    }
};

export const selectInvoices = (state: RootState) => state.invoices;

export default invoicesSlice.reducer;
