import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "sonner";
import Input from "../../components/Public/Auth/Input";
import { Loader, Mail } from "lucide-react";

const ResendVerificationEmailPage = () => {
	const [email, setEmail] = useState("");
	const { isLoading, resendVerificationEmail } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await resendVerificationEmail(email);
			toast.success("Verification email has been resent. Please check your inbox.");
			navigate("/verify-email");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="py-6 lg:pt-10 flex items-center justify-center">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-gray-100 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
			>
				<div className="p-8">
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-500 to-red-600 text-transparent bg-clip-text">
					प्रमाणीकरण इमेल पुन: पठाउनुहोस्
				</h2>
				<p className="text-center text-gray-600 mb-6">
					नयाँ प्रमाणीकरण कोड प्राप्त गर्नको लागि तपाईंको इमेल ठेगाना प्रविष्ट गर्नुहोस्।
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
						<Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

					<motion.button
						whileTap={{ scale: 0.95 }}
						type="submit"
						disabled={isLoading}
						className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200 hover:cursor-pointer"
						>
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "इमेल पठाउनुहोस्"}	
					</motion.button>
				</form>
				</div>
			</motion.div>
		</div>
	);
};

export default ResendVerificationEmailPage;
