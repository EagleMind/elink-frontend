import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { PaymentLinksService } from '../../services/paymentLinkService';

interface PaymentLinksState {
    paymentLinks: PaymentLink[];
    page: number;
    pageSize: number;
    paymentLinkCount: number;
    searchTerm: string;
    loading: boolean;
    error: string | null;
}

interface PaymentLink {
    _id: string;
    name: string,
    invoice_id: {
        _id: string
        invoice_number: string
    };
    invoice_number: string;
    link_type: string;
    url: string;
    created_at: Date;
    payment_method?: string;
    currency?: string;
    delivery_date: Date,
    due_date: Date,
    performance_metrics: {
        nb_clicks: number;
        userLocation: { latitude: number; longitude: number }[];
        conversion_rate: number;
        referral_source?: string;
        device_type?: string;
        time_of_clicks: Date[];
        abandonment_rate: number;
        average_payment_amount: number;
    };
    isExpired: boolean;
}

const initialState: PaymentLinksState = {
    paymentLinks: [],
    page: 1,
    pageSize: 10,
    paymentLinkCount: 0, searchTerm: '',
    loading: false,
    error: null,
};

const paymentLinksSlice = createSlice({
    name: 'paymentLinks',
    initialState,
    reducers: {
        fetchPaymentLinksRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPaymentLinksSuccess: (state, action: PayloadAction<{ paymentLinks: any[]; paymentLinkCount: number }>) => {
            state.loading = false;
            state.paymentLinks = action.payload.paymentLinks;
            state.paymentLinkCount = action.payload.paymentLinkCount;
        },
        fetchPaymentLinksFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        togglePaymentLinkExpiration: (state, action: PayloadAction<{ id: string; invoiceId: string; isExpired: boolean }>) => {
            const { id, invoiceId, isExpired } = action.payload;
            return {
                ...state,
                paymentLinks: state.paymentLinks.map(link => {
                    if (link._id === id && link.invoice_id._id === invoiceId) {
                        return {
                            ...link,
                            isExpired: isExpired // Set isExpired to the value of isExpiring
                        };
                    }
                    return link;
                })
            };
        },
        setFilteredPaymentLinks: (state, action: PayloadAction<{ paymentLinks: any[]; paymentLinksCount: number }>) => {
            state.paymentLinks = action.payload.paymentLinks;
            state.paymentLinkCount = action.payload.paymentLinksCount;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

export const {
    fetchPaymentLinksRequest,
    fetchPaymentLinksSuccess,
    fetchPaymentLinksFailure,
    setPage,
    setPageSize,
    setFilteredPaymentLinks,
    setSearchTerm,
    togglePaymentLinkExpiration,
} = paymentLinksSlice.actions;

export const fetchPaymentLinks = (
    page: number,
    pageSize: number,
    searchTerm: string
): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(fetchPaymentLinksRequest());
        const response = await PaymentLinksService.getAll(pageSize, page, searchTerm);
        dispatch(
            fetchPaymentLinksSuccess({
                paymentLinks: response.documents,
                paymentLinkCount: response.count,
            })
        );
    } catch (error: any) {
        dispatch(fetchPaymentLinksFailure(error.message));
    }
};

export const selectPaymentLinks = (state: RootState) => state.paymentLinks;

export default paymentLinksSlice.reducer;
