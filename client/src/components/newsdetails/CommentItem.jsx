import { Edit2Icon, TrashIcon, SaveIcon, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { timeAgo } from "../../utils/timeAgo";
import Modal from "../ui/Modal";

const CommentItem = ({ comment, onEdit, onDelete }) => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const getUserInitials = (name) => {
    const nameParts = name?.split(" ") || [];
    return nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0]?.substring(0, 2);
  };

  const handleSave = () => {
    if (editContent.trim()) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(comment.id); // Perform the deletion
    setIsModalOpen(false); // Close the modal after deletion
  };

  return (
    <div className="p-4 bg-slate-100 mb-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <span
            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm"
            title={comment.user?.name}
          >
            {getUserInitials(comment.user.name) || "U"}
          </span>
          <div>
            <p className="text-sm font-semibold">{comment.user.name}</p>
            <p className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</p>
          </div>
        </div>

        {user?.id === comment.user.id && (
          <div className="flex gap-x-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-800"
                aria-label="Save Comment"
              >
                <SaveIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-800"
                aria-label="Edit Comment"
              >
                <Edit2Icon className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)} // Open the modal on delete button click
              className="text-red-600 hover:text-red-800"
              aria-label="Delete Comment"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-2 border rounded mt-2"
          rows="2"
        ></textarea>
      ) : (
        <p className="mt-2 text-gray-700">{comment.content}</p>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  के तपाईं यो टिप्पणी हटाउन चाहनुहुन्छ?
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  यो कार्य पूर्ववत गर्न सकिँदैन।
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  handleDelete();
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500"
              >
                हटाउनुहोस्
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-900 border rounded-md hover:bg-gray-100"
              >
                रद्द गर्नुहोस्
              </button>
            </div>
      </Modal>
    </div>
  );
};

export default CommentItem;
