import { api } from "@/config/index";

/**
 * Fetch paginated users data.
 * @param page - Page number for pagination.
 * @param limit - Number of users to fetch per page.
 * @param token - Authorization token for the API.
 * @returns {Promise} - A promise that resolves to the users data.
 */const fetchPosts = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/posts/admin`, {
            params: { page, limit }
        });
        console.log("Full response:", response.data.data);
        return {
            posts: response.data.data.posts || [], // Array of posts
            total: response.data.data.pagination?.total || 0, // Total number of posts
        };
    } catch (error: any) {
        console.error("Error fetching posts:", error); // Log error details
        throw new Error("Failed to fetch posts: " + error.response?.data?.message || error.message);
    }
};

export const createPost = async (postData: any) => {
    const response = await api.post("/posts/admin", postData);
    return response.data.data;
};

export { fetchPosts };