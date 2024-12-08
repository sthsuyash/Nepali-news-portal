const BASE_API_URL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_URL : "/api/v2";

export { BASE_API_URL };
