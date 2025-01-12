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
    
        console.log(response.data.data);
        
        return response.data.data; 
    } catch (error: any) {
        console.error("Error fetching categories:", error); // Log error details
        throw new Error("Failed to fetch categories: " + error.response?.data?.message || error.message);
    }
};

export { fetchCategories };