import { useState, useEffect } from "react";
import { fetchCategory } from "@/services/categoriesService";

/**
 * Custom hook for fetching categories.
 * @param id - The current page to fetch.
 * @returns {Object} - { categories, loading, error }
 */
export const useCategory = (id: string) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchCategory(id);
                setCategory(data);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching Category");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { category, loading, error };
};

