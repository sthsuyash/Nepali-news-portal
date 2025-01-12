import { useState, useEffect } from "react";
import { fetchCategories } from "@/services/categoriesService";

/**
 * Custom hook for fetching categories.
 * @param page - The current page to fetch.
 * @param limit - The number of items per page.
 * @param token - Authorization token for the API.
 * @returns {Object} - { categories, loading, error }
 */
export const useCategories = (page: number, limit: number) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchCategories(page, limit);
                setCategories(data.categories);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching Categories");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);

    return { categories, loading, error };
};

