import {IResponse} from "../types/UserTypes";
import axios from "axios";

export const baseURL = 'http://localhost:5000';

const $host = axios.create({
    withCredentials: true,
    baseURL,
});

$host.interceptors.request.use((config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$host.interceptors.response.use((config: any) => {
    return config;
}, (async (error: any) => {
    const originRequest = error.config;
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
        originRequest._isRetry = true;
        try {
            const response = await axios.get<IResponse>(`${baseURL}/api/auth/check`, {withCredentials: true});
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            return $host.request(originRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error;
}))

export {
    $host,
}