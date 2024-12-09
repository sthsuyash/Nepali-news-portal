import { motion } from "framer-motion";
import Input from "../../components/Public/Auth/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Public/Auth/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import toast from "sonner";

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
    <div className="py-10 lg:pt-10 flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
            नयाँ खाता बनाउनुहोस्
          </h2>

          <form onSubmit={handleSignUp}>
            {/* Full Name Input */}
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Email Address Input */}
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Input */}
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={password} />

            {/* Sign Up Button */}
            <motion.button
              className="mt-6 w-full py-3 px-4 bg-red-500 text-lg text-white font-bold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "साइन अप"}
            </motion.button>
          </form>
        </div>

        <hr className="border-gray-300 w-full" />

        <div className="px-8 py-4 flex justify-center">
          <p className="text-sm text-gray-600">
            पहिले नै खाता छ?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              लगइन गर्नुहोस्
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
