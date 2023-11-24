import axios from "axios";
import { HOST, PATH, PORT, SCHEMA } from "../config/api";

const baseURL = `${SCHEMA}://${HOST}:${PORT}${PATH}`;

const client = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

const api = {
    contactType: async () => {
        const response = await client.get("/api/user");
        if (200 <= response.status <= 300) {
            return response.data;
        } else {
            return null;
        }
    },
    updateUserContact: async () => {
        const response = await client.get("/users/current");
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
};

export default api;