import { Navigate, Route, Routes } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
// Public Pages
import HomePage from "./pages/HomePage";
import NewsDetailsPage from "./pages/News/NewsDetailsPage";
import IndividualCategoryPage from "./pages/News/IndividualCategoryPage";
import SearchPage from "./pages/News/SearchPage";

// Auth Pages
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import EmailVerificationPage from "./pages/Auth/EmailVerificationPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ResendVerificationEmailPage from "./pages/Auth/ResendVerificationEmailPage";

// Private User Pages
import DashboardPage from "./pages/User/DashboardPage";

// Private Admin Pages
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/Public/Auth/LoadingSpinner";

// Universal Components
import Header from "./components/Public/Header/Header";
import Footer from "./components/Public/Footer/Footer";
import SecondaryHeader from "./components/Public/Header/HeaderCategory/SecondaryHeader";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	// if admin is authenticated, redirect to admin dashboard
	if (isAuthenticated && user.role.name === "ADMIN") {
		return <Navigate to='/admin' replace />;
	}

	if (isAuthenticated && user.isVerified && user.role.name === "USER") {
		return <Navigate to='/dashboard' replace />;
	}

	// if (isAuthenticated && !user.isVerified && user.role.name === "USER") {
	// 	return <Navigate to='/verify-email' replace />;
	// }

	return children;
};

// admin protected route
const AdminProtectedRoute = ({ children }) => {
	const { user } = useAuthStore();

	if (!user.role.name === "ADMIN") {
		return <Navigate to='/login' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div>
			<Header />
			<SecondaryHeader />
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<HomePage />} />

				<Route
					path='/news/:slug'
					element={
						<NewsDetailsPage />
					}
				/>

				<Route
					path='/category/:category'
					element={
						<IndividualCategoryPage />
					}
				/>

				<Route
					path='/search/:query'
					element={
						<SearchPage />
					}
				/>



				{/* Auth Routes */}
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/verify-email'
					element={
						<RedirectAuthenticatedUser>
							<EmailVerificationPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/resend-verification-code'
					element={
						<RedirectAuthenticatedUser>
							<ResendVerificationEmailPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				{/* User Routes */}
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>

				{/* Admin Routes */}
				<Route
					path='/admin'
					element={
						<ProtectedRoute>
							<AdminProtectedRoute>
								<AdminDashboardPage />
							</AdminProtectedRoute>
						</ProtectedRoute>
					}
				/>

				<Route
					path='/error'
					element={
						<ErrorPage />
					}
				/>

				{/* catch all routes */}
				<Route
					path='*'
					element={
						<Navigate to='/error' replace />
					}
				/>
			</Routes>
			
			<Toaster />
			<Footer />
		</div>
	);
}

export default App;
