import axios from "axios";
import useUserStore from "../store/useUserStore";

export const HTTPS_API = import.meta.env.VITE_API_URL;
const agent = axios.create({
    baseURL: HTTPS_API,
});

export interface PagedList<T> {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    items: T[];
}

agent.interceptors.request.use(
    (config) => {
        const userState = useUserStore.getState();
        const token = userState.user?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default agent;
