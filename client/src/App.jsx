import { Toaster } from "sonner";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

import {Navigate, Route, Routes } from "react-router-dom";
import {
	ProtectedRoute,
	AdminProtectedRoute,
	RedirectAuthenticatedUser
} from "./components/Public/Auth/AuthRoutes";

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
import DashboardLayout from "./pages/User/DashboardLayout";
import ProfilePage from "./pages/User/ProfilePage";
import EditProfilePage from "./pages/User/EditProfilePage";
import ChangePasswordPage from "./pages/User/ChangePasswordPage";

// Admin Pages
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";

// Error and Other Pages
import ErrorPage from "./pages/ErrorPage";
import LoadingSpinner from "./components/Public/Auth/LoadingSpinner";
import Header from "./components/Public/Header/Header";
import Footer from "./components/Public/Footer/Footer";
import SecondaryHeader from "./components/Public/Header/HeaderCategory/SecondaryHeader";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:slug" element={<NewsDetailsPage />} />
        <Route path="/category/:category" element={<IndividualCategoryPage />} />
        <Route path="/search/:query" element={<SearchPage />} />

        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/resend-verification-code" element={<ResendVerificationEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
      <Toaster 
        richColors
        position="bottom-right"
      />
      <Footer />
    </div>
  );
}

export default App;
