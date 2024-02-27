import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const VITE_REACT_APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL; // Update with your server details

export type AuthData = {
    token: string
    data: any;
    password: number;
    email: number;
};



const signIn = (email: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${VITE_REACT_APP_BASE_URL}/auth/login`,
        data: { email, password },
    };
    return new Promise((resolve, reject) => {
        axios
            .request(config)
            .then((response: AxiosResponse) => {
                return resolve(response.data);
            })
            .catch((error: any) => {
                return reject(error.response.data.error);
            });
    });
};
const Register = (email: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below

    return new Promise((resolve, reject) => {
        let data = JSON.stringify({ email, password });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${VITE_REACT_APP_BASE_URL}/auth/register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then(response => {
                return resolve(response.data);
            })
            .catch(error => {
                return reject(error.response.data.error);
            });
    });
};

export const authService = {
    signIn,
    Register,
};
