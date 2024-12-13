import { api } from "../config";

export const changePasswordAPI = async (oldPassword, newPassword) => {
    try {
        const response = await api.put('/users/me/password', { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserAPI = async (userData) => {
    try {
        const response = await api.put('/users/me', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
