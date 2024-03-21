import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authentication';

interface AuthData {
    token: string;
    // Define other properties of AuthData if available
}

interface AuthContextData {
    signUp(phone: string, password: string): Promise<void>;
    signIn(phone: string, password: string): Promise<void>;
    authData?: AuthData;
    loading: boolean;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({
    signUp: async () => { },
    signIn: async () => { },
    loading: true,
    signOut: () => { },
});
type Props = {
    children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCookieData();
    }, []);

    function isTokenExpired(expirationTimestamp: number) {
        const expirationDateTime = expirationTimestamp * 1000;
        const currentTimestamp = Date.now();
        return expirationDateTime < currentTimestamp;
    }

    async function loadCookieData(): Promise<void> {
        try {
            const authDataSerialized: string | undefined = Cookies.get('token');
            if (authDataSerialized) {
                const jwtDecoded = jwtDecode(authDataSerialized) as { exp: number };
                const tokenValidationState: boolean = !isTokenExpired(jwtDecoded.exp);
                if (tokenValidationState) {
                    setAuthData({ token: authDataSerialized });
                }
            }
        } catch (error) {
            console.error('Error loading auth data:', error);
        } finally {
            setLoading(false);
        }
    }

    const storeData = async (value: string) => {
        try {
            Cookies.set('token', value, { path: '/' });
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const signIn = async (phone: string, password: string) => {
        try {
            // Assume authService.signIn returns AuthData upon successful sign-in
            const response = await authService.signIn(phone, password);
            if (response) {
                storeData(response.token);
                setAuthData(response);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const signUp = async (phone: string, password: string) => {
        try {
            // Call the authService.Register to sign up user
            await authService.Register(phone, password);
            // Proceed with handling sign-up success
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const signOut = async () => {
        try {
            setAuthData(undefined);
            Cookies.remove('token', { path: '/' });
        } catch (error) {
            console.error('Error signing out:', error);
        }
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
