import { api } from "@/config";
import { useState } from "react";

export const useUpdatePost = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdatePost = async (id: string, updatedData: any) => {
        setIsLoading(true);
        try {
            const response = await api.put(`/posts/admin/${id}`, updatedData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data.message;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Failed to update post");
        } finally {
            setIsLoading(false);
        }
    };

    return { handleUpdatePost, isLoading };
};
