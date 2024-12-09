import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Public/Auth/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "sonner";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setIsSubmitted(true);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    return (
        <div className="py-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-100 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-rose-600 text-transparent bg-clip-text">
                        पासवर्ड बिर्सनु भयो?
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className="text-gray-600 mb-6 text-center">
                                तपाईंको इमेल ठेगाना प्रविष्ट गर्नुहोस् र हामी तपाईंलाई पासवर्ड रिसेट गर्नको लागि लिंक पठाउँछौं।
                            </p>
                            <Input
                                icon={Mail}
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                                type="submit"
                            >
                                {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "रिसेट लिंक पठाउनुहोस्"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <Mail className="h-8 w-8 text-white" />
                            </motion.div>
                            <p className="text-gray-700 mb-6">
                                यदि <span className="font-semibold">{email}</span> को लागि खाता अस्तित्वमा छ भने, तपाईंलाई चाँडै पासवर्ड रिसेट लिंक प्राप्त हुनेछ।
                            </p>
                        </div>
                    )}
                </div>

                <div className="px-8 py-4 bg-gray-700 bg-opacity-70 flex justify-center">
                    <Link to={"/login"} className="text-sm text-rose-200 hover:underline flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
