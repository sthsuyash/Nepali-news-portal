import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const EditProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || ''); // Default to empty if no phone exists

  const handleSave = () => {
    updateUser({ name, email, phone });
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-red-500 mb-6">प्रोफाइल सम्पादन गर्नुहोस्</h3> {/* Edit Profile in Nepali */}

        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">पुरा नाम</label> {/* Name in Nepali */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">इमेल</label> {/* Email in Nepali */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">फोन नम्बर</label> {/* Phone in Nepali */}
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition duration-200"
            >
              परिवर्तन सुरक्षित गर्नुहोस्
            </button> {/* Save Changes in Nepali */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
