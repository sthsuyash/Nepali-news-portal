import { useState, useEffect } from "react";
import { fetchPosts } from "@/services/postsService";

/**
 * Custom hook for fetching users.
 * @param page - The current page to fetch.
 * @param limit - The number of items per page.
 * @param token - Authorization token for the API.
 * @returns {Object} - { posts, loading, error }
 */
export const usePosts = (page: number, limit: number) => {
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const { posts, total } = await fetchPosts(page, limit);
                setPosts(posts);
                setTotalPosts(total);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching users");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);

    return { posts, totalPosts, loading, error };
};

