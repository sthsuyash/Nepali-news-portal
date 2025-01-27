import "@/App.css";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoadingSpinner from "@/components/customUI/LoadingSpinner";

import PrivateRoute from "@/routes/PrivateRoutes";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/auth/LoginPage";

import HomePage from "@/pages/HomePage";

// Auth pages
import LogoutPage from "@/pages/auth/LogoutPage";

// User pages
import UsersPage from "@/pages/user/UsersPage";
import CreateUserPage from "@/pages/user/CreateUserPage";
import ViewUserPage from "@/pages/user/ViewUserPage";
import EditUserPage from "@/pages/user/EditUserPage";

// Post pages
import PostsPage from "@/pages/post/PostsPage";
import CreatePostPage from "@/pages/post/CreatePostPage";
import ViewPostPage from "@/pages/post/ViewPostPage";
import EditPostPage from "@/pages/post/EditPostPage";

// Category pages
import CategoriesPage from "@/pages/category/CategoriesPage";
import CreateCategoryPage from "@/pages/category/CreateCategoryPage";
import ViewCategoryPage from "@/pages/category/ViewCategoryPage";
import EditCategoryPage from "@/pages/category/EditCategoryPage";

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
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Home route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Users routes */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <PrivateRoute>
              <CreateUserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <PrivateRoute>
              <EditUserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/view"
          element={
            <PrivateRoute>
              <ViewUserPage />
            </PrivateRoute>
          }
        />

        {/* Posts routes */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/add"
          element={
            <PrivateRoute>
              <CreatePostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <PrivateRoute>
              <EditPostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id/view"
          element={
            <PrivateRoute>
              <ViewPostPage />
            </PrivateRoute>
          }
        />

        {/* Category routes */}
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/categories/add"
          element={
            <PrivateRoute>
              <CreateCategoryPage />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/categories/:id/edit"
          element={
            <PrivateRoute>
              <EditCategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/:id/view"
          element={
            <PrivateRoute>
              <ViewCategoryPage />
            </PrivateRoute>
          }
        />

        {/* 404 route */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      <Toaster richColors={true} position="top-right" />
    </>
  );
}

export default App;
