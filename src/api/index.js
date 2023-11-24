import axios from "axios";
import getAccessTokenFromCookie from "../utils/cookies";
import { HOST, PATH, PORT, SCHEMA } from "../config/api";

const baseURL = `${SCHEMA}://${HOST}:${PORT}${PATH}`;

const client = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use(
    (config) => {
        const accessToken = getAccessTokenFromCookie('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

const api = {
    users: async () => {
        const response = await client.get("/api/user");
        if (200 <= response.status <= 300) {
            return response.data;
        } else {
            return null;
        }
    },
    user: async (id) => {
        const response = await client.get(`/api/user/${id}`);
        if (200 <= response.status <= 300) {
            return response.data;
        } else {
            return null;
        }
    },
    updateUser: async (data) => {
        const response = await client.put("/api/user", data);
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
    deleteUser: async (id) => {
        const response = await client.delete(`/api/user/${id}`);
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
    currentUser: async () => {
        const response = await client.get("/api/current");
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
    logout: async () => {
        const response = await client.get("/api/logout");
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
};

export default api;