import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthData, authService } from '../services/authentication';
import { jwtDecode } from 'jwt-decode';
import { PropsWithChildren } from 'react';
import Cookies from 'js-cookie';

// Define the type for the authentication context data
type AuthContextData = {
    signUp(email: string, password: string): Promise<void>;
    signIn(email: string, password: string): Promise<void>;
    authData?: AuthData;
    loading: boolean;
    signOut(): void;
};

// Create the Auth Context with the specified data type and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => { // Added {} to PropsWithChildren
    const [authData, setAuthData] = useState<AuthData | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    function isTokenExpired(expirationTimestamp: number) {
        const expirationDateTime = expirationTimestamp * 1000;
        const currentTimestamp = Date.now();

        return expirationDateTime < currentTimestamp;
    }

    async function loadStorageData(): Promise<void> {
        try {
            const token = Cookies.get('TOKEN_KEY');

            if (token) {
                const jwtDecoded = jwtDecode(token) as { exp: number };
                const tokenValidationState = isTokenExpired(jwtDecoded.exp);

                if (!tokenValidationState) {
                    Cookies.remove('TOKEN_KEY');
                } else {
                    // Fetch user data or perform any other necessary actions
                    // Here, you might want to setAuthData with user information
                }
            }
        } catch (error) {
            console.error('Error loading storage data:', error);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        const response = await authService.signIn(email, password);
        if (response) {
            // Set expiration time to 24 hours from now
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours in milliseconds

            sessionStorage.setItem('TOKEN_KEY', response.token);
        }
    };

    const signUp = async (email: string, password: string) => {
        await authService.Register(email, password);
    };

    const signOut = () => {
        Cookies.remove('TOKEN_KEY');
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
