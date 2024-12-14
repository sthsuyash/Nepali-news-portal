import { useState } from "react";
import { Loader } from "lucide-react";

import useComments from "../../hooks/useComments";
import CommentItem from "./CommentItem";

import { toastWithTime } from "../ui/Toaster.jsx";
import { useAuthStore } from "../../store/authStore.js";

const CommentSection = ({ newsId }) => {
  const { comments, loading, addComment, deleteComment, editComment } =
    useComments(newsId);
  const { isAuthenticated } = useAuthStore();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim()) {
      toastWithTime("error", "Log in to comment or enter a valid comment.");
      return;
    }
    addComment(newComment);
    setNewComment(""); // Clear the input after submission
  };

  return (
    <div className="bg-white p-6 rounded-b-md">
      {isAuthenticated && (
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className={`mt-2 bg-red-600 text-white rounded px-4 py-2 ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? <Loader className="w-6 h-6 animate-spin" /> : "Comment"}
          </button>
        </form>
      )}
      {!isAuthenticated && <p className="text-gray-500">Log in to comment.</p>}
      <div className="mt-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
              onEdit={editComment}
            />
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
