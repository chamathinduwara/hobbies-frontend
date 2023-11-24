import axios from "axios";
import { HOST, PATH, PORT, SCHEMA } from "../../config/api";

const baseURL = `${SCHEMA}://${HOST}:${PORT}${PATH}`;

const client = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

const api = {
    register: async (data) => {
        const response = await client.post("/api/register", data);
        if (200 <= response.status <= 300) {
            return response.data;
        } else {
            return null;
        }
    },
    login: async (data) => {
        const response = await client.post("/api/login", data);
        if (200 <= response.status <= 300) {
            console.log(response.data);
            return response.data;
        } else {
            return null;
        }
    },
    

};

export default api;