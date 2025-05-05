import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Automatically add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle token expiry globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUnauthorized = error.response.status === 403;
        if (isUnauthorized) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("authToken");
            window.location.href = "/"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;