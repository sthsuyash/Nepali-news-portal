import { api } from "@/config/index";

/**
 * Fetch paginated users data.
 * @param page - Page number for pagination.
 * @param limit - Number of users to fetch per page.
 * @param token - Authorization token for the API.
 * @returns {Promise} - A promise that resolves to the users data.
 */const fetchCategories = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/category/admin`, {
            params: { page, limit }
        });

        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching categories:", error); // Log error details
        throw new Error("Failed to fetch categories: " + error.response?.data?.message || error.message);
    }
};

/**
 * Fetch a single category by ID.
 * @param id - The ID of the category to fetch.
 * @returns {Promise} - A promise that resolves to the category data.
 */
const fetchCategory = async (id: number) => {
    try {
        const response = await api.get(`/category/admin/${id}`);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching category:", error); // Log error details
        throw new Error("Failed to fetch category: " + error.response?.data?.message || error.message);
    }
}

/**
 * Update a category by ID.
 * @param id - The category ID.
 * @param data - The data to update the category with.
 * @returns {Promise<any>} - The updated category data.
 */
const updateCategory = async (id: number, data: any) => {
    try {
        const response = await api.put(`/category/admin/${id}`, data);
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating category:", error);
        throw new Error(
            error.response?.data?.message || "Failed to update category."
        );
    }
};



export { fetchCategories, fetchCategory, updateCategory };