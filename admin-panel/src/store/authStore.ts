import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/config/index";

const getErrorMessage = (error) => {
	return error.response?.data?.message || error.message || "An unexpected error occurred";
};

export const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			isCheckingAuth: false,
			error: null,
			message: null,

			// Check user authentication on page load
			checkAuth: async () => {
				set({ isCheckingAuth: true });
				try {
					const response = await api.get("/users/me");
					if (response?.data?.success) {
						set({
							user: response.data.data,
							isAuthenticated: true,
							isCheckingAuth: false,
							error: null,
						});
					} else {
						set({
							user: null,
							isAuthenticated: false,
							isCheckingAuth: false,
						});
					}
				} catch (error) {
					set({
						user: null,
						isAuthenticated: false,
						isCheckingAuth: false,
						error: getErrorMessage(error),
					});
				}
			},

			// User login
			login: async (email, password) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/admin/login", { email, password });
					if (response?.data?.success) {
						set({
							user: response.data.data,
							isAuthenticated: true,
							isLoading: false,
							error: null,
						});
						return response.data.message;
					}
				} catch (error) {
					set({ error: getErrorMessage(error), isLoading: false });
					throw error.response?.data;
				}
			},

			// User logout
			logout: async () => {
				set({ isLoading: true });
				try {
					const response = await api.post("/auth/logout");
					if (response?.data?.success) {
						set({
							user: null,
							isAuthenticated: false,
							isLoading: false,
							error: null,
						});
					}
				} catch (error) {
					set({ error: getErrorMessage(error), isLoading: false });
					throw error.response?.data;
				}
			},

			// Reset password
			resetPassword: async (token, password) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post(`/auth/reset-password/${token}`, { password });
					set({
						message: response?.data.message,
						isLoading: false,
						error: null,
					});
				} catch (error) {
					set({ error: getErrorMessage(error), isLoading: false });
					throw error.response?.data;
				}
			},
		}),
		{
			name: "auth-store", // Unique name for localStorage
			partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Persist only essential state
		}
	)
);
