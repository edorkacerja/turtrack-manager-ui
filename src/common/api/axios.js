import axios from 'axios';
import { store } from "@/store/store.js";
import { logout } from "../../features/auth/redux/authSlice.jsx";
import { API_BASE_URL } from "@/common/util/constants.js";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Global error handling
api.interceptors.response.use(
    response => response,
    error => {
        // SSL Certificate error
        if (error.code === 'ERR_CERT_AUTHORITY_INVALID') {
            console.error('SSL Certificate Error. Please check your API configuration.');
            return Promise.reject('Failed to connect to server securely. Please contact support.');
        }

        // Authentication error
        if (error.response?.status === 401) {
            store.dispatch(logout());
            window.location.href = '/login';
        }

        // Network error
        if (error.code === 'ERR_NETWORK') {
            return Promise.reject('Unable to connect to server. Please check your internet connection.');
        }

        return Promise.reject(error.response?.data?.message || error.message);
    }
);

export default api;