import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/ui/Input";
import { Loader, Mail } from "lucide-react";
import { toastWithTime } from "../../components/ui/Toaster";

const ResendVerificationEmailPage = () => {
    const [email, setEmail] = useState("");
    const { isLoading, resendVerificationEmail } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resendVerificationEmail(email);
            toastWithTime("success", "Verification email has been resent. Please check your inbox.");
            navigate("/verify-email");
		} catch (error) {
			console.error(error);
            toastWithTime("error", error.message);
        }
    };

    return (
        <div className="py-10 lg:pt-10 flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-10">
                    <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-rose-500 text-transparent bg-clip-text">
                        प्रमाणीकरण इमेल पुन: पठाउनुहोस्
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        नयाँ प्रमाणीकरण कोड प्राप्त गर्नको लागि तपाईंको इमेल ठेगाना प्रविष्ट गर्नुहोस्।
                    </p>

                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin mx-auto" />
                            ) : (
                                "इमेल पठाउनुहोस्"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResendVerificationEmailPage;
