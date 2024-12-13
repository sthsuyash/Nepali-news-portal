import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { toastWithTime } from '../../components/ui/Toaster';
import { updateUserAPI } from '../../api/userDashboard';

export const useUserEdit = () => {
  const { user } = useAuthStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email); // Email is read-only
  const [phone, setPhone] = useState(user.phone || '');
  const [loading, setLoading] = useState(false);

  // Synchronize state with `user` when it changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email); // Keep email synced but non-editable
    setPhone(user.phone || '');
  }, [user]);

  const handleSave = async () => {
    // Validate required fields
    if (!name.trim() || !phone.trim()) {
      toastWithTime('error', 'All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await updateUserAPI({ name: name.trim(), phone: phone.trim() });

      if (response.success) {
        toastWithTime('success', response.message || 'Profile updated successfully.');
      } else {
        toastWithTime('error', response.message || 'Failed to update profile.');
      }
    } catch (error) {
      toastWithTime('error', error.message || 'An error occurred while updating the profile.');
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email, // Read-only, so no setter is exposed
    phone,
    setPhone,
    loading,
    handleSave,
  };
};
