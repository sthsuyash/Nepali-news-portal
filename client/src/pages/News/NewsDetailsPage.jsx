import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

import Breadcrumb from "../../components/Public/Breadcrumb.jsx";
import Category from "../../components/Public/Category.jsx";
import Search from "../../components/Public/Search.jsx";
import parser from "html-react-parser";

import RelatedNews from "../../components/Public/News/RelatedNews";
import RecentNews from "../../components/Public/News/RecentNews.jsx";

import { TrashIcon,Edit2,Bookmark } from "lucide-react";

import { BASE_API_URL } from "../../config/index.js";
import { toastWithTime } from "../../components/ui/Toaster.jsx";
import { timeAgo } from "../../utils/timeAgo";

const NewsDetailsPage = () => {
  const token = localStorage.getItem('newsToken');
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

  const getUserInitials = (name) => {
    const nameParts = name?.split(" ") || [];
    return nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]  // First letter of first and last name
        : nameParts[0]?.substring(0, 2);      // First two letters of the first name
};
  
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
      const response = await fetch(`${BASE_API_URL}/comments/${commentId}`, {
        method: "DELETE",
        // headers: {
        //   'Authorization': `Bearer ${token}` 
        // },
      });
  

        if (response.ok) {
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

  const handleEditComment = async (commentId) => {
    try {
      const response = await fetch(`${BASE_API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Ensure the token is passed here
        },
        body: JSON.stringify({ content: editedComment }),
      });
  
      if (response.ok) {
        const editedCommentData = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, ...editedCommentData.data } : comment
          )
        );
        toastWithTime("success", "Comment edited successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to edit comment:", response.status, errorText);
        toastWithTime("error", "Failed to edit comment.");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      toastWithTime("error", "Error editing comment.");
    }
  };

  const handleBookmark = async (newsId) => {
    try {
      const response = await fetch(`${BASE_API_URL}/bookmarks/${newsId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Ensure the token is passed here
        },
        body: JSON.stringify({ newsId }),
      });
  
      if (response.ok) {
        toastWithTime("success", "News bookmarked successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to bookmark news:", response.status, errorText);
        toastWithTime("error", "Failed to bookmark news.");
      }
    } catch (error) {
      console.error("Error bookmarking news:", error);
      toastWithTime("error", "Error bookmarking news.");
    }
  };
  

  const handleAddComment = async (e) => {
      // console.log("Authorization Header:", `Bearer ${token}`);
    e.preventDefault();
  
    if (!isAuthenticated) {
      toastWithTime("error", "You need to log in to comment");
      return;
    }
  
    if (!newComment.trim()) {
      toastWithTime("error", "Comment cannot be empty");
      return;
    }
  
    if (!news?.id) {
      console.error("News ID is undefined:", news);
      toastWithTime("error", "Unable to add comment. News data is not available.");
      return;
    }
  
    try {
      const response = await fetch(`${BASE_API_URL}/comments/${news.id}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`, // Ensure the token is passed here
        // },
        body: JSON.stringify({ content: newComment }),
      });
  
      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prevComments) => [...prevComments, newCommentData.data]);
        setNewComment("");
        toastWithTime("success", "Comment added successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to add comment:", response.status, errorText);
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
      <Bookmark />
    </button>
  </div>
  <div className="flex gap-x-2 text-xs font-normal text-slate-600">
    <span>{news?.createdAt}</span>
  </div>
  <div>{parser(news?.description)}</div>
</div>
                </div>
                <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                  {/* Add Comment Section */}
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
              {/* Display initials of the comment user */}
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
            <p className="text-gray-800 mt-2 ml-10">{comment.content}</p>
          </div>

          {/* Delete and Edit buttons for the comment owner or admin */}
          {(isAuthenticated && (user?.name === comment.user?.name || user?.role === "ADMIN")) ? (
  <div className="flex space-x-2">
    {(user?.name === comment.user?.name || user?.role === "ADMIN") && (
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
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
