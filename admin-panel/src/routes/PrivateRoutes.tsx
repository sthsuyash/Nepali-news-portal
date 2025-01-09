import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();

    // Trigger the checkAuth method if not authenticated
    useEffect(() => {
        if (!isCheckingAuth && !isAuthenticated) {
            checkAuth();
        }
    }, [isAuthenticated, isCheckingAuth, checkAuth]);

    // While checking authentication, show a loading state
    if (isCheckingAuth) {
        return <div>Loading...</div>; // or you can show a spinner component
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
