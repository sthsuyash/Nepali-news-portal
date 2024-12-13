import { useUserEdit } from '../../../hooks/profile/useUserEdit';
import FormInput from '../../../components/ui/FormInput';
import FormButton from '../../../components/ui/FormButton';

const EditProfilePage = () => {
  const {
    name,
    setName,
    email,
    phone,
    setPhone,
    loading,
    handleSave
  } = useUserEdit();

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-red-500 mb-6">प्रोफाइल सम्पादन गर्नुहोस्</h3>

        <div className="space-y-6">
          {/* Name Input */}
          <FormInput
            label="पुरा नाम"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          {/* Email (Read-Only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">इमेल</label> {/* Email in Nepali */}
            <FormInput
              type="email"
              value={email}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 cursor-not-allowed"
              readOnly
            />
          </div>
          
          {/* Phone Input */}
          <FormInput
            label="फोन नम्बर"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <FormButton
            onClick={handleSave}
            label={loading ? "प्रोसेसिंग..." : "प्रोफाइल सेभ गर्नुहोस्"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
