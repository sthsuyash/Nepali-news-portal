import { useState, useEffect } from "react";
import { fetchSentiments } from "@/services/sentimentService";

/**
 * Custom hook for fetching sentiments.
 */
export const useSentiments = () => {
    const [sentiments, setSentiments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchSentiments();
                setSentiments(data);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching Sentiments");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { sentiments, loading, error };
};

