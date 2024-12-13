import { Toaster } from "sonner";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import {
  ProtectedRoute,
  RedirectAuthenticatedUser
} from "./components/auth/AuthRoutes";

// Public Pages
import HomePage from "./pages/HomePage";
import NewsDetailsPage from "./pages/News/NewsDetailsPage";
import IndividualCategoryPage from "./pages/News/IndividualCategoryPage";
import SearchPage from "./pages/News/SearchPage";

// Auth Pages
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ResendVerificationEmailPage from "./pages/auth/ResendVerificationEmailPage";

// Private User Pages
import BookMarksPage from "./pages/user/BookmarksPage"; 

// Private User Dashboard Pages
import DashboardLayout from "./pages/user/dashboard/DashboardLayout";
import ProfilePage from "./pages/user/dashboard/ProfilePage";
import EditProfilePage from "./pages/user/dashboard/EditProfilePage";
import ChangePasswordPage from "./pages/user/dashboard/ChangePasswordPage";

// Error Page
import ErrorPage from "./pages/ErrorPage";

// Components
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SecondaryHeader from "./components/header/headercategory/SecondaryHeader";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  // Ensure checkAuth is called once on mount
  useEffect(() => {
    if (!isCheckingAuth) checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    // Show a loading spinner or placeholder before authentication status is known
    return <LoadingSpinner />;
  }

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

        {/* User Routes */}
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookMarksPage />
            </ProtectedRoute>
          }
        />
        
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
