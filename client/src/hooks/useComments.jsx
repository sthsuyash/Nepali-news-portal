import { useState, useEffect } from "react";
import { api } from "../config";
import { toastWithTime } from "../components/ui/Toaster";

const useComments = (newsId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${newsId}`);
        setComments(res.data.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toastWithTime("error", "Failed to load comments.");
      }
    };
    fetchComments();
  }, [newsId]);

  const addComment = async (newComment) => {
    try {
      setLoading(true);
      const res = await api.post(`/comments/${newsId}`, { content: newComment });
      setComments((prev) => [...prev, res.data.data]);
      toastWithTime("success", "Comment added.");
    } catch (error) {
      console.error("Error adding comment:", error);
      toastWithTime("error", "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      await api.delete(`/comments/${commentId}`);
      toastWithTime("success", "Comment deleted.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toastWithTime("error", "Failed to delete comment.");
    }
  };

  const editComment = async (commentId, newContent) => {
    try {
      const res = await api.put(`/comments/${commentId}`, { content: newContent });
      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? res.data.data : comment))
      );
      toastWithTime("success", "Comment updated.");
    } catch (error) {
      console.error("Error updating comment:", error);
      toastWithTime("error", "Failed to update comment.");
    }
  };

  return { comments, loading, addComment, deleteComment, editComment };
};

export default useComments;
