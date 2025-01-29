import { api } from "@/config";

const fetchSentiments = async () => {
    try {
        const response = await api.get(`/sentiments/admin`);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching sentiments:", error);
        throw new Error("Failed to fetch sentiments: " + error.response?.data?.message || error.message);
    }
};

export { fetchSentiments };