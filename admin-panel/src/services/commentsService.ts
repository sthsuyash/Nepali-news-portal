import { api } from "@/config/index";

/**
 * Fetch paginated comments data.
 * @param page - Page number for pagination.
 * @param limit - Number of comments to fetch per page.
 * @returns {Promise} - A promise that resolves to the comments data.
 */
const fetchComments = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/comments/admin`, {
            params: { page, limit }
        });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch comments: " + error.message);
    }
};

export { fetchComments };