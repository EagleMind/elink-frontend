import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import invoiceReducer from "./features/invoices"
import paymentLinksSlice from "./features/paymentLinks"
const store = configureStore({
    reducer: {
        invoices: invoiceReducer,
        paymentLinks: paymentLinksSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default store;
