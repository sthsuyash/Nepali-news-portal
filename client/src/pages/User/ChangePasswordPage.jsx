import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const ChangePasswordPage = () => {
  const { changePassword } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    changePassword(currentPassword, newPassword);
    alert("Password updated successfully!");
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-red-500 mb-6">पासवर्ड परिवर्तन गर्नुहोस्</h3> {/* Change Password in Nepali */}

        <div className="space-y-6">
          {/* Current Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">हालको पासवर्ड</label> {/* Current Password in Nepali */}
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">नयाँ पासवर्ड</label> {/* New Password in Nepali */}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">नयाँ पासवर्ड पुष्टि गर्नुहोस्</label> {/* Confirm New Password in Nepali */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Change Password Button */}
          <div>
            <button
              onClick={handlePasswordChange}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition duration-200"
            >
              पासवर्ड परिवर्तन गर्नुहोस् {/* Change Password in Nepali */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
