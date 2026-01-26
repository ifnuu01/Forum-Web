import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});


axiosInstance.interceptors.request.use((config) => {
    try {
        const raw = localStorage.getItem("auth");
        if (raw) {
            const parsed = JSON.parse(raw);
            const token = parsed?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        console.error("Error parsing auth from localStorage", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;