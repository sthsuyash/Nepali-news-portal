import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

import Breadcrumb from "../../components/Public/Breadcrumb.jsx";
import Category from "../../components/Public/Category.jsx";
import Search from "../../components/Public/Search.jsx";
import parser from "html-react-parser";

import RelatedNews from "../../components/Public/News/RelatedNews";
import RecentNews from "../../components/Public/News/RecentNews.jsx";

import { TrashIcon, SendHorizonal, Edit2 } from "lucide-react";

import { BASE_API_URL } from "../../config/index.js";
import { toastWithTime } from "../../components/ui/Toaster.jsx";

const NewsDetailsPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // State to track the new comment
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch news data
        const res = await fetch(`${BASE_API_URL}/posts/${slug}`);
        const data = await res.json();
        setNews(data.data);

        // Fetch related news
        if (data.data?.id) {
          const relatedRes = await fetch(`${BASE_API_URL}/posts/recommended/${data.data.id}`);
          const relatedData = await relatedRes.json();
          setRelatedNews(relatedData.data || []);
        }
        
        // Fetch comments
        if (data.data?.id) {
          const commentsRes = await fetch(`${BASE_API_URL}/comments/${data.data.id}`);
          const commentsData = await commentsRes.json();
          setComments(commentsData.data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
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
      const res = await fetch(`${BASE_API_URL}/comments/${news?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.name,
          comment: newComment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) => [...prevComments, data.comment]);
        setNewComment("");  // Reset comment input
        toastWithTime("success", "Comment submitted successfully!");
      } else {
        toastWithTime("error", "Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toastWithTime("error", "Error submitting comment");
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const res = await fetch(`${BASE_API_URL}/comments/${commentId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          toastWithTime("success", "Comment deleted successfully!");
        } else {
          toastWithTime("error", "Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        toastWithTime("error", "Error deleting comment");
      }
    }
  };

  // Handle comment editing (Placeholder for actual implementation)
  const handleEditComment = (commentId) => {
    // Placeholder: You can implement an actual edit functionality here
    toastWithTime("info", "Editing comment is not implemented yet");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        const res = await fetch(`${BASE_API_URL}/posts/${slug}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("News deleted successfully");
          window.location.href = "/"; // Redirect after delete
        } else {
          alert("Failed to delete news");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Error deleting the news");
      }
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
                    <h2 className="text-3xl text-gray-700 font-bold">
                      {news?.title}
                    </h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span>{news?.createdAt}</span>
                    </div>
                    <div>{parser(news?.description)}</div>
                  </div>
                </div>
<div className="mt-8">
            {comments.length === 0 ? (
              <div>No comments yet.</div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="p-4 w-2/3 bg-white mb-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{comment.user?.name || "Anonymous"}</p>
                      <p className="text-gray-600">{comment.content}</p>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>

                    {/* Delete and Edit buttons for the comment owner or admin */}
                    {(isAuthenticated && user?.name === comment.user?.name) || user?.role === "ADMIN" ? (
                      <div className="flex space-x-2">
                        {user?.name === comment.user?.name && (
                          <button
                            onClick={() => handleEditComment(comment.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            title="Edit Comment"
                          >
                            <Edit2 />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
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

          {/* Comments Section - moved below the post */}
          <div className="pt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            

            {/* Comment input form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="relative mt-4 w-2/3">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md pr-12 resize-none"
                    style={{ paddingRight: "3rem" }}
                  ></textarea>
                  <button
                    type="submit"
                    className="absolute right-2 bottom-2 bg-red-600 text-white p-2 mb-1 rounded-full hover:bg-red-700 h-8 w-8 flex items-center justify-center"
                    title="Post Comment"
                  >
                    <SendHorizonal />
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows="3"
                  className="w-2/3 p-2 border border-gray-300 rounded-md resize-none"
                ></textarea>
                <p className="text-gray-600 text-sm mt-2">Log in to post a comment.</p>
              </div>
            )}
          </div>

          {/* Delete button for admin */}
          {user?.role === "ADMIN" && (
            <div className="pt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Delete News
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
