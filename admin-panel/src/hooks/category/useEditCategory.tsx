import { useState } from "react";
import { updateCategory } from "@/services/categoriesService";

/**
 * Custom hook for editing a category.
 * @returns {Object} - { editCategory, isSubmitting, error }
 */
export const useEditCategory = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editCategory = async (id: number, data: any) => {
        try {
            setIsSubmitting(true);
            setError(null);
            const response = await updateCategory(id, data);
            return response; // Return updated category data if needed
        } catch (err: any) {
            setError(err.message || "An error occurred while updating the category.");
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { editCategory, isSubmitting, error };
};
