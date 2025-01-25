import axios from "axios";
import {AuthStorage} from "./src/config/AuthStorage.ts";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = AuthStorage.getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Błąd w interceptorze żądania:", error);
        return Promise.reject(error);
    }
);