import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEdit, FaTrash, FaNewspaper } from "react-icons/fa";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const formRef = useRef(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/admin-dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { latest_posts } = response.data;
        setLatestPosts(latest_posts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleViewAllPosts = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setViewAll(true);
    // Fetch all posts (modify this if you need real backend fetching)
  };

  const handleViewAllUsers = () => {
    setViewAll(true);
    // Fetch all users (modify this if you need real backend fetching)
  };

  const handleEditPost = async (id) => {
    try {
      const updatedContent = {
        title: "Updated Title",
        content: "Updated Content",
      }; // Example update
      await axios.put(`/dashboard/post/${id}`, updatedContent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post updated successfully!");
      // You may want to refetch the posts or update the state
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`/dashboard/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleViewPost = (id) => {
    console.log(`Viewing post with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <nav className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-lg py-3 px-6 rounded-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <FaNewspaper className="text-teal-600 text-4xl" />
            <div className="text-teal-600 text-3xl font-semibold">
              KhabarCheck
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-bold mr-2">Dashboard</h2>
          <span>Welcome to Admin Dashboard</span>
        </div>

        {/* Latest Posts */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Latest Posts</h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts && latestPosts.length > 0 ? (
              latestPosts.map((post) => {
                const createdAt = new Date(post.created_date).toLocaleString();
                const updatedAt = post.updated_date
                  ? new Date(post.updated_date).toLocaleString()
                  : "-";

                return (
                  <div
                    key={post.title}
                    className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <h4 className="text-xl font-semibold mb-2">{post.title}</h4>

                    <p
                      className={`text-sm mb-2 ${
                        post.sentiment === "Positive"
                          ? "text-green-600"
                          : post.sentiment === "Neutral"
                          ? "text-amber-950"
                          : "text-red-600"
                      }`}
                    >
                      Sentiment: {post.sentiment || "N/A"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Created At : {createdAt}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Updated At: {updatedAt}
                    </p>
                    <p className="text-xs text-gray-600">
                      Posted by: {post.username}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          className="flex items-center text-teal-600 hover:text-teal-800 hover:underline transition duration-300"
                          onClick={() => handleViewPost(post.title)}
                        >
                          <FaEye className="mr-1" /> View
                        </button>
                        <button
                          className="flex items-center text-teal-600 px-3 py-1 hover:text-teal-800 hover:underline transition duration-300"
                          onClick={() => handleEditPost(post.title)}
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                          className="flex items-center text-red-500 hover:text-red-600 hover:underline transition duration-300"
                          onClick={() => handleDeletePost(post.title)}
                        >
                          <FaTrash className="mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600  transition duration-300"
            onClick={handleViewAllPosts}
          >
            View All Posts
          </button>
        </div>

        {/* Latest Users */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Latest Users</h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts && latestPosts.length > 0 ? (
              Array.from(new Set(latestPosts.map((user) => user.username))).map(
                (username) => {
                  const user = latestPosts.find((u) => u.username === username);

                  return (
                    <div
                      key={user.user_id}
                      className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      <h4 className="text-xl font-semibold mb-2">
                        {user.username}
                      </h4>
                      <p className="text-sm text-gray-600">Posts: 5</p>
                    </div>
                  );
                }
              )
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={handleViewAllUsers}
          >
            View All Users
          </button>
        </div>
      </div>

      {viewAll && (
        <div
          ref={formRef}
          className="container mt-8 p-4 bg-white rounded-lg shadow-lg"
        >
          {/* All Posts */}
          <h3 className="text-2xl font-semibold mb-4">All Posts</h3>
          {latestPosts && latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <div
                key={post.id}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-semibold">{post.title}</h4>
                <p
                  className={`text-sm mb-2 mt-2 ${
                    post.sentiment === "Positive"
                      ? "text-green-600"
                      : post.sentiment === "Neutral"
                      ? "text-amber-950"
                      : "text-red-600"
                  }`}
                >
                  Sentiment: {post.sentiment || "N/A"}
                </p>
                <p className="text-xs">Created At: {post.created_date}</p>
                <p className="text-xs">Updated At: {post.updatedAt || "-"}</p>
                <p className="text-xs text-gray-600 mt-2">
                  Posted by: {post.username}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      className="flex items-center text-teal-600 hover:text-teal-800 hover:underline transition duration-300"
                      onClick={() => handleViewPost(post.title)}
                    >
                      <FaEye className="mr-1" /> View
                    </button>
                    <button
                      className="flex items-center text-teal-600 px-3 py-1 hover:text-teal-800 hover:underline transition duration-300"
                      onClick={() => handleEditPost(post.title)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="flex items-center text-red-500 hover:text-red-600 hover:underline transition duration-300"
                      onClick={() => handleDeletePost(post.title)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}

          {/* All Users */}
          <h3 className="text-2xl font-semibold mt-8 mb-4">All Users</h3>
          {latestPosts && latestPosts.length > 0 ? (
            latestPosts.map((user) => (
              <div
                key={user.user_id}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-semibold">{user.username}</h4>
                <p className="text-sm">Posts: 5 </p>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
