import { Navigate } from "react-router-dom";

import {useAuthStore} from "../../store/authStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    // If we're checking authentication, show a loading spinner
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    // Show a loading spinner while checking auth
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    if (user.isVerified) return <Navigate to="/dashboard" replace />;
  }

  return children;
};
