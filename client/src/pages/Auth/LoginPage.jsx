import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/Public/Auth/Input";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useAuthStore();

    const handleLogin = async (e) => {
		e.preventDefault();
		
		// check if email and password are provided
		if (!email || !password) {
			toast.error("Both fields are required");
			return;
		}

		try{
			await login(email, password);
			toast.success("Login successful");
		} catch (error) {
			toast.error(error.message);
		}
    };

    return (
        <div className="py-6 lg:pt-10 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-100 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-rose-500 text-transparent bg-clip-text">
                        स्वागतम्
                    </h2>

                    <form onSubmit={handleLogin}>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex items-center mb-6">
                            <Link to="/forgot-password" className="text-sm text-red-500 hover:underline transition duration-200">
                                पासवर्ड बिर्सनु भयो?
                            </Link>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-red-600 text-lg text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "लगइन"}
                        </motion.button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-500 bg-opacity-70 flex justify-center">
                    <p className="text-sm text-white">
                        तपाईंको खाता छैन?{" "}
                        <Link to="/signup" className="text-rose-200 hover:underline">
                            साइन अप गर्नुहोस्
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
