import { useState } from "react";
import { createPost } from "@/services/postsService";

export const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreatePost = async (postData: any) => {
        
        try {
            setIsLoading(true);
        setError(null);
            const data = await createPost(postData);
            return data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create post.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { handleCreatePost, isLoading, error };
};
