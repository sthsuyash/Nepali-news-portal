import { create } from "zustand";
import { persist } from "zustand/middleware"; // For state persistence
import { api } from "../config";

// Utility function for error messages
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

			// User signup
			signup: async (email, password, name) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/signup", { email, password, name });
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

			// User login
			login: async (email, password) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/login", { email, password });
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

			// Verify email
			verifyEmail: async (code) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/verify-email", { code });
					set({
						user: response.data.data,
						isAuthenticated: true,
						isLoading: false,
						error: null,
					});
					return response.data;
				} catch (error) {
					set({ error: getErrorMessage(error), isLoading: false });
					throw error.response?.data;
				}
			},

			// Resend verification email
			resendVerificationEmail: async () => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/resend-verification-email", {
						email: get().user?.email,
					});
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

			// Forgot password
			forgotPassword: async (email) => {
				set({ isLoading: true, error: null });
				try {
					const response = await api.post("/auth/forgot-password", { email });
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
