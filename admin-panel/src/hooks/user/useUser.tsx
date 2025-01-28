import { useState, useEffect } from "react";
import { fetchUser } from "@/services/usersService";

/**
 * Custom hook for fetching users.
 * @param page - The current page to fetch.
 * @param limit - The number of items per page.
 * @param token - Authorization token for the API.
 * @returns {Object} - { users, loading, error }
 */
export const useUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUser();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, loading, error };
};
