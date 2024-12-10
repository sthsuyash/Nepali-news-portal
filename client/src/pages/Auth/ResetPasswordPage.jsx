import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Public/Auth/Input";
import { Lock } from "lucide-react";
import { toast }  from "sonner";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="py-6 lg:pt-10 flex items-center justify-center k">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="bg-gray-100 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md"
			>
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-400 to-red-500 text-transparent bg-clip-text">
					Reset Your Password
				</h2>

				{/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
				{message && <p className="text-green-500 text-sm mb-4">{message}</p>}

				<form onSubmit={handleSubmit} className="space-y-6">
					<Input
						icon={Lock}
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Input
						icon={Lock}
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<motion.button
						whileTap={{ scale: 0.95 }}
						type="submit"
						className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200 hover:cursor-pointer"
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</motion.div>
		</div>
	);
};

export default ResetPasswordPage;
