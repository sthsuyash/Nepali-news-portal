import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { toastWithTime } from "../../components/ui/Toaster";
import { Link } from "react-router-dom";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) newCode[i] = pastedCode[i] || "";
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toastWithTime("success", "Email verified successfully");
    } catch (error) {
      toastWithTime("error", error.message);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) handleSubmit(new Event("submit"));
  }, [code]);

  return (
    <div className="py-10 lg:pt-10 flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-10"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
          इमेल प्रमाणीकरण
        </h2>
        <p className="text-center text-gray-600 mb-8">
          तपाईंको इमेल ठेगानामा पठाइएको ६ अङ्कको कोड प्रविष्ट गर्नुहोस्
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-200 text-gray-700 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none shadow-md"
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/resend-verification-code" className="text-sm text-rose-500 hover:underline">
              प्रमाणीकरण कोड पुन: पठाउनुहोस्
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "इमेल प्रमाणित गर्नुहोस्"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
