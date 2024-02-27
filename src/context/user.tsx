// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    // State to hold the user information
    const [user, setUser] = useState({});
    const [token, setToken] = useState({});
    async function loadStorageData(): Promise<void> {
        try {
            //Try get the data from Async Storage
            const authDataSerialized = await AsyncStorage.getItem('token');
            if (authDataSerialized) {
                //If there are data, it's converted to an Object and the state is updated.
                setToken(authDataSerialized);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch user information when the component mounts
    useEffect(() => {
        loadStorageData();
    }, [token]);

    // Provide the user information to the consuming components
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
