import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_URL : "/api/v2";

const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: false,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post("/auth/signup", { email, password, name });

			if (response?.data.success) {
				set({
					user: response.data.data,
					isAuthenticated: true,
					isLoading: false
				});
				return response.data.message;
			}

		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error signing up",
				isLoading: false
			});
			throw error.response?.data;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post("/auth/login", { email, password });
			
			if (response?.data.success) {
				set({
					user: response.data.data,
					isAuthenticated: true,
					isLoading: false,
				});
				return response.data;
			}
		} catch (error) {
			set({
				isAuthenticated: false,
				error: error.response?.data?.message || error.message || "Error logging in",
				isLoading: false
			});
			throw error.response?.data;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post("/auth/logout");

			if (response?.data.success) {
				set({
					user: null,
					isAuthenticated: false,
					isLoading: false
				});
			}
		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error logging out",
				isLoading: false,
			});
			throw error?.response?.data;
		}
	},

	verifyEmail: async (code) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const response = await api.post("/auth/verify-email", { code });
			set({
				user: response.data.data,
				isAuthenticated: true,
				isLoading: false
			});
			return response.data;

		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error verifying email",
				isLoading: false,
			});
			throw error?.response?.data;
		}
	},

	resendVerificationEmail: async () => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const response = await api.post("/auth/resend-verification-email", {
				email: useAuthStore.getState().user.email
			});
			set({
				message: response?.data.message,
				isLoading: false
			});
		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error resending verification email",
				isLoading: false,
			});
			throw error?.response?.data;
		}
	},

	checkAuth: async () => {
		try {
			const response = await api.get("/users/me");

			if (response?.data.success) {
				set({
					user: response?.data.data,
					isAuthenticated: true,
					isCheckingAuth: false
				});
			}
		} catch (error) {
			set({
				user: null,
				isAuthenticated: false,
				isCheckingAuth: false
			});
		}
	},

	forgotPassword: async (email) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const response = await api.post("/auth/forgot-password", { email });
			set({
				message: response?.data.message,
				isLoading: false
			});
		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error sending reset email",
				isLoading: false,
			});
			throw error?.response?.data;
		}
	},

	resetPassword: async (token, password) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const response = await api.post(`/auth/reset-password/${token}`, { password });
			set({
				message: response?.data.message,
				isLoading: false
			});
		} catch (error) {
			set({
				error: error.response?.data.message || error.message || "Error resetting password",
				isLoading: false,
			});
			throw error?.response?.data;
		}
	},
}));
