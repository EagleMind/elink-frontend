// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: any; // Define your user type here
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        register(state, action: PayloadAction<any>) {
            // Implement your registration logic here
            // For example, you might want to update state with registered user data
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
