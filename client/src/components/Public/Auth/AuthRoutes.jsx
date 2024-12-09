import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role?.name !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    if (user.role.name === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.isVerified) return <Navigate to="/dashboard" replace />;
  }

  return children;
};
