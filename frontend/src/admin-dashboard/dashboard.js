import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaNewspaper } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    // Fetch latest 5 posts and users
    setLatestPosts([
      {
        id: 1,
        title: "News 1",
        sentiment: "Positive",
        createdAt: "2024-09-19",
        updatedAt: "2024-09-20",
        postedby: "John Doe",
      },
      {
        id: 2,
        title: "News 2",
        sentiment: "Positive",
        createdAt: "2024-09-19",
        updatedAt: "2024-09-20",
        postedby: "Jane Smith",
      },
      {
        id: 3,
        title: "News 3",
        sentiment: "Positive",
        createdAt: "2024-09-19",
        updatedAt: "2024-09-20",
        postedby: "John Doe",
      },
      {
        id: 4,
        title: "News 4",
        sentiment: "Neutral",
        createdAt: "2024-09-18",
        updatedAt: "2024-09-19",
        postedby: "Jane Smith",
      },
    ]);
    setLatestUsers([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      // More mock users...
    ]);
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  const handleViewAll = () => {
    // Fetch all posts and users
    setViewAll(true);
    setAllPosts([
      // Mock data for all posts
      {
        id: 3,
        title: "News 3",
        createdAt: "2024-09-17",
        updatedAt: "2024-09-18",
      },
      // Other posts...
    ]);
    setAllUsers([
      // Mock data for all users
      { id: 3, name: "Jack White", email: "jack@example.com" },
      // Other users...
    ]);
  };

  const handleEditPost = (id) => {};
  const handleDeletePost = (id) => {};
  const handleViewPost = (id) => {};

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
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                <p
                  className={`text-sm mb-2 ${
                    post.sentiment === "Positive"
                      ? "text-green-600"
                      : post.sentiment === "Neutral"
                      ? "text-amber-950	"
                      : "text-red-600"
                  }`}
                >
                  Sentiment: {post.sentiment}
                </p>
                <p className="text-xs text-gray-600">
                  Created At: {post.createdAt}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Updated At: {post.updatedAt}
                </p>
                <div className="ml-auto text-xs text-gray-600 mb-1">
                  Posted By: {post.postedby}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      className="flex items-center text-teal-600 hover:text-teal-800 hover:underline transition duration-300"
                      onClick={() => handleViewPost(post.id)}
                    >
                      <span className="flex items-center">
                        <FaEye className="mr-1" /> View
                      </span>
                    </button>
                    <button
                      className="flex items-center text-teal-600 px-3 py-1 hover:text-teal-800 hover:underline transition duration-300"
                      onClick={() => handleEditPost(post.id)}
                    >
                      <span className="flex items-center">
                        <FaEdit className="mr-1" /> Edit
                      </span>
                    </button>
                    <button
                      className="flex items-center text-red-500 hover:text-red-600 hover:underline transition duration-300"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <span className="flex items-center">
                        <FaTrash className="mr-1" /> Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600  transition duration-300"
            onClick={handleViewAll}
          >
            View All Posts
          </button>
        </div>

        {/* Latest Users */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Latest Users</h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {latestUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-xl font-semibold mb-2">{user.name}</h4>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={handleViewAll}
          >
            View All Users
          </button>
        </div>
      </div>

      {viewAll && (
        <div className="container mt-8 p-4 bg-white rounded-lg shadow-lg">
          {/* All Posts */}
          <h3 className="text-2xl font-semibold mb-4">All Posts</h3>
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-semibold">{post.title}</h4>
              <p className="text-sm">Created At: {post.createdAt}</p>
              <p className="text-sm">Updated At: {post.updatedAt}</p>
            </div>
          ))}

          {/* All Users */}
          <h3 className="text-2xl font-semibold mt-8 mb-4">All Users</h3>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-semibold">{user.name}</h4>
              <p className="text-sm">Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
