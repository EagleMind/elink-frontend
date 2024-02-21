import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthData, authService } from '../services/authentication';
import { jwtDecode } from 'jwt-decode';
import { PropsWithChildren } from 'react';
type AuthContextData = {
    signUp(phone: string, password: string): Promise<void>;
    signIn(phone: string, password: string): Promise<void>;
    authData?: AuthData;
    loading: boolean;
    signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    //the AuthContext start with loading equals true
    //and stay like this, until the data be load from Async Storage
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Every time the App is opened, this provider is rendered
        //and call de loadStorage function.
        loadStorageData();
    }, []);
    function isTokenExpired(expirationTimestamp: number) {
        // Convert the expiration timestamp to milliseconds
        const expirationDateTime = expirationTimestamp * 1000;

        // Get the current timestamp in milliseconds
        const currentTimestamp = Date.now();

        // Compare the expiration timestamp with the current timestamp
        console.log(expirationDateTime, currentTimestamp);
        if (expirationDateTime < currentTimestamp) {
            return false; // Token is expired
        } else {
            return true; // Token is not expired
        }
    }
    async function loadStorageData(): Promise<void> {
        interface JwtDecoded {
            exp: number;
        }

        try {
            // Try to get the data from Async Storage
            const authDataSerialized: string | null = localStorage.getItem('token');

            if (authDataSerialized) {
                const jwtDecoded: JwtDecoded = jwtDecode(authDataSerialized);
                const tokenValidationState: boolean = isTokenExpired(jwtDecoded.exp);
                setAuthData(tokenValidationState);
            }
        } catch (error) {
            // Handle error
        } finally {
            // Loading finished
            setLoading(false);
        }
    }
    const signIn = async (phone: string, password: string) => {
        const response = await authService.signIn(phone, password);
        if (response) {
            localStorage.setItem('token', response.token);
            setAuthData(response);
        }
        console.log(response);
    };
    const signUp = async (phone: string, password: string) => {
        //call the service passing credential (email and password).
        //In a real App this data will be provided by the user from some InputText components.
        await authService.Register(phone, password);
        //Set the data in the context, so the App can be notified
        //and send the user to the AuthStack
    };

    const signOut = async () => {
        //Remove data from context, so the App can be notified
        //and send the user to the AuthStack
        setAuthData(null);

        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await localStorage.removeItem('token');
    };

    return (
        //This component will be used to encapsulate the whole App,
        //so all components will have access to the Context
        <AuthContext.Provider value={{ authData, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
