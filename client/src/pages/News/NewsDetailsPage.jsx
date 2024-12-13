import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

import Breadcrumb from "../../components/Public/Breadcrumb.jsx";
import Category from "../../components/Public/Category.jsx";
import Search from "../../components/Public/Search.jsx";
import parser from "html-react-parser";

import RelatedNews from "../../components/Public/News/RelatedNews";
import RecentNews from "../../components/Public/News/RecentNews.jsx";

import { TrashIcon, Edit2, Bookmark, BookmarkMinus } from "lucide-react";

import { BASE_API_URL } from "../../config/index.js";
import { toastWithTime } from "../../components/ui/Toaster.jsx";
import { timeAgo } from "../../utils/timeAgo";
import Modal from "../../components/ui/Modal.jsx";

const NewsDetailsPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState(""); // State for editing comment
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing modal
  const [commentToDelete, setCommentToDelete] = useState(null); // Store comment ID to be deleted
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_API_URL}/posts/${slug}`);
        const data = await res.json();
        setNews(data.data);

        if (data.data?.id) {
          const relatedRes = await fetch(`${BASE_API_URL}/posts/recommended/${data.data.id}`);
          const relatedData = await relatedRes.json();
          setRelatedNews(relatedData.data || []);
        }

        if (data.data?.id) {
          const commentsRes = await fetch(`${BASE_API_URL}/comments/${data.data.id}`);
          const commentsData = await commentsRes.json();
          setComments(commentsData.data.comments || []);
        }

        if (isAuthenticated && data.data?.id) {
          const bookmarkRes = await fetch(`${BASE_API_URL}/bookmarks/${data.data.id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const bookmarkData = await bookmarkRes.json();
          setIsBookmarked(bookmarkData.data.isBookmarked);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, isBookmarked]);

  const getUserInitials = (name) => {
    const nameParts = name?.split(" ") || [];
    return nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0]?.substring(0, 2);
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      const response = await fetch(`${BASE_API_URL}/comments/${commentToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentToDelete)
        );
        toastWithTime("success", "Comment deleted successfully!");
      } else {
        toastWithTime("error", "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toastWithTime("error", "Error deleting comment");
    } finally {
      setShowDeleteModal(false); // Close modal after deleting
      setCommentToDelete(null);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) {
      toastWithTime("error", "Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${BASE_API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: editedComment }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, content: updatedComment.data.content } : comment
          )
        );
        setEditingCommentId(null); // Reset editing mode
        setEditedComment("");
        toastWithTime("success", "Comment edited successfully!");
      } else {
        toastWithTime("error", "Failed to edit comment.");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      toastWithTime("error", "Error editing comment.");
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/bookmarks/${news.id}`, {
        method: isBookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked); // Toggle the bookmark state
        toastWithTime(
          "success",
          isBookmarked ? "News removed from bookmarks" : "News bookmarked successfully!"
        );
      } else {
        toastWithTime("error", "Failed to bookmark news.");
      }
    } catch (error) {
      console.error("Error bookmarking news:", error);
      toastWithTime("error", "Error bookmarking news.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toastWithTime("error", "You need to log in to comment");
      return;
    }

    if (!newComment.trim()) {
      toastWithTime("error", "Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${BASE_API_URL}/comments/${news.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prevComments) => [...prevComments, newCommentData.data]);
        setNewComment("");
        toastWithTime("success", "Comment added successfully!");
      } else {
        toastWithTime("error", "Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toastWithTime("error", "Error adding comment.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>No news found!</div>;
  }

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news.category.nepaliName} two={news?.title} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white rounded-md">
                  <img
                    src={news?.image}
                    alt={news?.title}
                    className="rounded-t-md"
                  />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">
                      {news?.category.nepaliName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl text-gray-700 font-bold">{news?.title}</h2>
                      <button
                        className="flex items-center gap-x-2 text-xs font-normal text-slate-600 hover:text-red-700"
                        onClick={handleBookmark} title="Bookmark"
                      >
                        {
                          isBookmarked? <BookmarkMinus /> : <Bookmark />
                        }
                      </button>
                    </div>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span>{news?.createdAt}</span>
                    </div>
                    <div>{parser(news?.description)}</div>
                  </div>
                </div>
                <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                  {isAuthenticated ? (
                    <form onSubmit={handleAddComment} className="relative mb-6">
                      <div className="relative border border-gray-300 rounded-md w-full">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          rows="3"
                          className="w-full p-2 pr-12 resize-none rounded-md"
                          style={{ paddingRight: "3rem" }}
                        ></textarea>
                        <button
                          type="submit"
                          className="absolute right-2 bottom-2 bg-red-600 text-white rounded-full hover:bg-red-700 h-8 w-20 mb-2 flex items-center justify-center"
                          title="Post Comment"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mb-6">
                      <div className="relative border border-gray-300 rounded-md w-full">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          rows="3"
                          className="w-full p-2 pr-12 resize-none rounded-md"
                        ></textarea>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">Log in to post a comment.</p>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-4">Comments</h3>

                  {/* Comments List */}
                  {comments.length === 0 ? (
                    <div>No comments yet.</div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 w-full bg-slate-100 mb-4 rounded-md shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-x-2">
                              <span
                                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm"
                                title={comment.user?.name}
                              >
                                {getUserInitials(comment.user?.name || "Anonymous")}
                              </span>
                              <p className="font-medium text-gray-800 flex text-lg items-center gap-x-2">
                                {comment.user?.name || "Anonymous"}
                                <span className="text-gray-500 text-sm">
                                  {timeAgo(comment.createdAt)}
                                </span>
                              </p>
                            </div>
                            <p className="text-gray-800 mt-2 ml-10">
                              {editingCommentId === comment.id ? (
                                <div className="flex gap-x-2">
                                  <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    rows="2"
                                    className="p-2 w-full border border-gray-300 rounded-md"
                                  />
                                  <button
                                    onClick={() => handleEditComment(comment.id)}
                                    className="ml-2 bg-blue-600 text-white rounded-full p-2"
                                    title="Save changes"
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                comment.content
                              )}
                            </p>
                          </div>

                          {/* Delete and Edit buttons */}
                          {(isAuthenticated && (user?.name === comment.user?.name || user?.role === "ADMIN")) ? (
                            <div className="flex space-x-2">
                              {(user?.name === comment.user?.name || user?.role === "ADMIN") && (
                                <button
                                  onClick={() => {
                                    setEditingCommentId(comment.id);
                                    setEditedComment(comment.content);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                  title="Edit Comment"
                                >
                                  <Edit2 />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setCommentToDelete(comment.id); // Set the comment to delete
                                  setShowDeleteModal(true); // Show modal
                                }}
                                className="text-red-600 hover:text-red-800 text-sm"
                                title="Delete Comment"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <RelatedNews news={relatedNews} type="Related news" />
          </div>
        </div>
      </div>

      {/* Modal for deleting comment */}
      {showDeleteModal && <Modal
        isOpen={showDeleteModal}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
        onConfirm={handleDeleteComment}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    }
    </div>
  );
};

export default NewsDetailsPage;
