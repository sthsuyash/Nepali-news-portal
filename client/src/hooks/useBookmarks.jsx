import { api } from "../config";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toastWithTime } from "../components/ui/Toaster";

const useBookmark = (newsId) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkBookmark = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await api.get(`/bookmarks/${newsId}`);
        setIsBookmarked(response.data.data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    };

    checkBookmark();
  }, [isAuthenticated, newsId]);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toastWithTime("error", "Log in to bookmark");
      return;
    }

    setLoading(true);

    try {
      const method = isBookmarked ? "DELETE" : "POST";
      const response = await api.request({
        url: `/bookmarks/${newsId}`,
        method: method,
      });

      if (response.status === 200 || response.status === 201) {
        setIsBookmarked(!isBookmarked);
        toastWithTime("success", isBookmarked ? "Bookmark removed" : `Bookmarked`);
      }
    } catch (error) {
      console.error("Error bookmarking:", error);
      toastWithTime("error", "Error updating bookmark.");
    } finally {
      setLoading(false);
    }
  };

  return { isBookmarked, loading, handleBookmark };
};

export default useBookmark;