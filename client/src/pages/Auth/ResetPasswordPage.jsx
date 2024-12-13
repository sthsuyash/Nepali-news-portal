import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import { Lock } from "lucide-react";
import { toastWithTime } from "../../components/ui/Toaster";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, isLoading } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toastWithTime("error", "पासवर्ड मेल खाएन। कृपया फेरि प्रयास गर्नुहोस्।");
            return;
        }
        try {
            await resetPassword(token, password);

            toastWithTime("success", "पासवर्ड सफलतापूर्वक रिसेट भयो! लगइन पृष्ठमा पुनर्निर्देश गर्दैछ...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            toastWithTime("error", error.message);
        }
    };

    return (
        <div className="py-10 flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-500 to-red-600 text-transparent bg-clip-text">
                    पासवर्ड रिसेट गर्नुहोस्
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="नयाँ पासवर्ड"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="नयाँ पासवर्ड पुष्टि गर्नुहोस्"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 px-4 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? "रिसेट गर्दै..." : "नयाँ पासवर्ड सेट गर्नुहोस्"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
