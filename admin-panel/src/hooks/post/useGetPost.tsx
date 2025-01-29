import { api } from "@/config";
import { useState, useCallback } from "react";

interface Post {
    id: string;
    title: string;
    description: string;
    imageUrl: string; // URL of the image
}

export const useGetPost = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPostById = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`/posts/admin/${id}`);
            setPost(response.data.data);
            return response.data.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch post");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { post, fetchPostById, isLoading, error };
};
