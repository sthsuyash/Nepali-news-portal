import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_URL : "/api/v2";
const TRANSLATE_API_URL = import.meta.env.VITE_TRANSLATE_API_URL || "";
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";

const api = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const translateApi = axios.create({
    baseURL: TRANSLATE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export {
    api,
    translateApi,
    OPENWEATHER_API_KEY,
};
