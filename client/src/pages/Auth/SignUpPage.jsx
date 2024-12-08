import { motion } from "framer-motion";
import Input from "../../components/Public/Auth/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Public/Auth/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			toast.error(error.message);
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
					<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-500 to-red-600 text-transparent bg-clip-text">
						नयाँ खाता बनाउनुहोस्
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
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
						<PasswordStrengthMeter password={password} />

						<motion.button
							className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "साइन अप"}
						</motion.button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-700 bg-opacity-70 flex justify-center">
					<p className="text-sm text-white">
						पहिले नै खाता छ?{" "}
						<Link to={"/login"} className="text-rose-200 hover:underline">
							लगइन गर्नुहोस्
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
