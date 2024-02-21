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
    // Function to fetch user information
    const fetchUserInfo = async (token: any) => {
        if (token) {
            try {
                const response = await userService.UserInfos(token);
                console.log;
                setUser(response); // Set the fetched user info in the states
            } catch (error) {
                return error;
            }
        }
    };
    // Fetch user information when the component mounts
    useEffect(() => {
        loadStorageData();
        fetchUserInfo(token); // Replace with your logic to fetch the user info
    }, [token]);

    // Provide the user information to the consuming components
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
