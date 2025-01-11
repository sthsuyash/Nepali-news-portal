import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const LogoutPage = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout); // Get the logout method from the auth store

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout(); // Call the store's logout method
                navigate("/login"); // Redirect to the Login page
            } catch (error) {
                console.error("Error during logout:", error);
            }
        };

        performLogout();
    }, [logout, navigate]);

    return null; // Render nothing while logging out
};

export default LogoutPage;
