import { useState } from 'react';
import { changePasswordAPI } from '../../api/userDashboard';
import { toastWithTime } from "../../components/ui/Toaster.jsx";


export const usePasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to show loading indicator during API call

  const handlePasswordChange = async () => {
    // check for empty fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      toastWithTime("error", "All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastWithTime("error", "Passwords do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      toastWithTime("error", "New password cannot be the same as current password.");
      return;
    }

    setLoading(true);

    try {
      const oldPassword = currentPassword;
      const response = await changePasswordAPI(oldPassword, newPassword);
      
      if (response.success) {
        toastWithTime("success", response.message);
      } else {
        toastWithTime("error", response.message);
      }
    } catch (error) {
      toastWithTime("error", error.message);
    } finally {
      setLoading(false); 
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading, 
    handlePasswordChange
  };
};
