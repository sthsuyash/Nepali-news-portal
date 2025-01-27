import { useState, useEffect } from "react";
import { fetchComments } from "@/services/commentsService";

/**
 * Custom hook for fetching comments.
 * @param page - The current page to fetch.
 * @param limit - The number of items per page.
 * @returns {Object} - { comments, loading, error }
 */
export const useComments = (page: number, limit: number) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchComments(page, limit);
                setComments(data.comments);
            } catch (err) {
                setError("An error occurred while fetching comments");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);

    return { comments, loading, error };
};
