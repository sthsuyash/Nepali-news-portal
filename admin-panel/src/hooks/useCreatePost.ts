import { useState } from "react";
import { createPost } from "@/services/postsService";
import { AxiosError } from "axios"; 

interface PostData {
    title: string;
    description: string;
    image: File;
}

export const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreatePost = async (postData: PostData) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await createPost(postData);
            return data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || "Failed to create post.");
            } else {
                setError("An unexpected error occurred.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { handleCreatePost, isLoading, error };
};
