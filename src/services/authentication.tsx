import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export type AuthData = {
    token(token: string): unknown;
    data: any;
    password: number;
    phoneNumber: number;
};

const signIn = (phoneNumber: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.1.19:3001/api/auth',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { phoneNumber, password },
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
const Register = (phoneNumber: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below

    return new Promise((resolve, reject) => {
        let data = JSON.stringify({ phoneNumber, password });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.19:3001/api/register',
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
