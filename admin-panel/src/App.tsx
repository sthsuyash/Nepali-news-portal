import "@/App.css";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoadingSpinner from "@/components/customUI/LoadingSpinner";

import PrivateRoute from "@/routes/PrivateRoutes";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";

import HomePage from "@/pages/HomePage";
import UsersPage from "@/pages/UsersPage";
import PostsPage from "@/pages/PostsPage";
import LogoutPage from "@/pages/LogoutPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CreatePost from "@/pages/createPostPage";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check authentication only once when the component mounts
    if (!isCheckingAuth && !isAuthenticated) {
      checkAuth();
    }
  }, []);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Error page if not found the page */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <Toaster richColors={true} position="top-right" />
    </>
  );
}

export default App;
