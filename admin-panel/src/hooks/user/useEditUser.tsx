import { updateUser } from "@/services/usersService";
import { useState } from "react";

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editUser = async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      await updateUser(id, data);
    } catch (err: any) {
      setError(err.message || "An error occurred while editing user");
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error };
};
