import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import FormInput from "@/components/customUI/FormInput";
import { useAuthStore } from "@/store/authStore";
import { toastWithTime } from "@/components/customUI/Toaster";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!email || !password) {
            toastWithTime("error", "Both fields are required");
            return;
        }

        try {
            await login(email, password);
            toastWithTime("success", "Login successful");

            // Redirect to the saved path or default to /
            const redirectPath = localStorage.getItem('redirectPath') || '/';
            localStorage.removeItem('redirectPath'); // Clean up after redirect
            navigate(redirectPath);
        } catch (error: any) {
            console.error(error);
            toastWithTime("error", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-10">
                    <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                        स्वागतम्
                    </h2>

                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <FormInput
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Password Input */}
                        <FormInput
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Forgot Password Link */}
                        <div className="flex justify-between items-center mb-6">
                            <Link to="/forgot-password" className="text-sm text-red-500 hover:underline transition duration-200">
                                पासवर्ड बिर्सनु भयो?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-4 bg-red-500 text-lg text-white font-bold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "लगइन"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
