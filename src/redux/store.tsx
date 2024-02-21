// store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    // Add other reducers here if you have any
});

// Create the Redux store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
