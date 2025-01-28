
import { api } from "@/config/index";

/**
 * Fetch paginated users data.
 * @param page - Page number for pagination.
 * @param limit - Number of users to fetch per page.
 * @param token - Authorization token for the API.
 * @returns {Promise} - A promise that resolves to the users data.
 */const fetchUsers = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/users/admin`, {
            params: { page, limit }
        });
        console.log("Full response:", response.data.data);
        return response.data.data; // Corrected path to fetch users
    } catch (error: any) {
        console.error("Error fetching users:", error); // Log error details
        throw new Error("Failed to fetch users: " + error.response?.data?.message || error.message);
    }
};

const fetchUser = async (id: number) => {
    try {
        const response = await api.get(`/users/admin/${id}`);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching user:", error); // Log error details
        throw new Error("Failed to fetch user: " + error.response?.data?.message || error.message);
    }
}

const deleteUser = async (id: number) => {
    try {
        const response = await api.delete(`/users/admin/${id}`);
        return response.data.data;
    } catch (error: any) {
        console.error("Error deleting user:", error); // Log error details
        throw new Error("Failed to delete user: " + error.response?.data?.message || error.message);
    }
};

const updateUser = async (id: number, data: any) => {
    try {
        const response = await api.put(`/users/admin/${id}`, data);
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating user:", error); // Log error details
        throw new Error("Failed to update user: " + error.response?.data?.message || error.message);
    }
};

export { fetchUsers, deleteUser , updateUser, fetchUser };