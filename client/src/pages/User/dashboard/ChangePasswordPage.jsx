import { usePasswordChange } from '../../../hooks/profile/usePasswordChange';
import FormInput from '../../../components/ui/FormInput';
import FormButton from '../../../components/ui/FormButton';

const ChangePasswordPage = () => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handlePasswordChange,
    loading
  } = usePasswordChange();

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-red-500 mb-6">पासवर्ड परिवर्तन गर्नुहोस्</h3>

        <div className="space-y-6">
          <FormInput
            label="हालको पासवर्ड"
            value={currentPassword}
            type='password'
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          
          <FormInput
            label="नयाँ पासवर्ड"
            value={newPassword}
            type='password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          
          <FormInput
            label="नयाँ पासवर्ड पुष्टि गर्नुहोस्"
            value={confirmPassword}
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormButton
            onClick={handlePasswordChange}
            label={loading ? "प्रोसेसिंग..." : "पासवर्ड परिवर्तन गर्नुहोस्"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
