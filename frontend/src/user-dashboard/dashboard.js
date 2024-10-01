import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus, FaNewspaper } from "react-icons/fa";
import axios from "../api/axios";

const UserDashboard = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [newsPosts, setNewsPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    sentiment: "",
  });
  const [sentimentResult, setSentimentResult] = useState("");
  const [canPost, setCanPost] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });

  // Fetch the dashboard data when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user_data, posts } = response.data;

        setUserData(user_data);
        setNewsPosts(posts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleAddNewsClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyzeSentiment = () => {
    const { content } = newPost;
    let sentiment = "Neutral";

    if (content.toLowerCase().includes("great")) {
      sentiment = "Positive";
    } else if (content.toLowerCase().includes("bad")) {
      sentiment = "Negative";
    }

    setSentimentResult(sentiment);
    setNewPost({ ...newPost, sentiment });

    setCanPost(sentiment === "Positive" || sentiment === "Neutral");
  };

  const handlePost = async () => {
    if (canPost) {
      const postPayload = {
        title: newPost.title,
        post: newPost.content,
        isPublished: true,
      };

      try {
        const response = await axios.post("/dashboard/post", postPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Add the new post to the current list of posts
        setNewsPosts([...newsPosts, newPost]);

        // Reset form
        setNewPost({ title: "", content: "", sentiment: "" });
        setSentimentResult("");
        setCanPost(false);
      } catch (error) {
        console.error("Error posting news:", error);
        alert("Failed to post news");
      }
    } else {
      alert("Cannot post news with negative sentiment");
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
  };

  const handleView = (id) => {
    // Implement view functionality here
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <nav className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-lg py-3 px-6 rounded-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <FaNewspaper className="text-teal-600 text-4xl" />
            <div className="text-teal-600 text-3xl font-semibold">
              KhabarCheck
            </div>
          </div>
          <div className="ml-auto flex space-x-4 items-center">
            <div className="text-lg mr-4">{userData.username}</div>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold mr-2">Dashboard</h2>
        </div>

        <div className="mb-6 text-right">
          <button
            onClick={handleAddNewsClick}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-600 transition duration-300"
          >
            <FaPlus />
            <span>Add News</span>
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {newsPosts.map((post, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm mb-2 text-gray-600">
                Sentiment: {post.sentiment || "Unknown"}
              </p>
              <div className="flex space-x-2">
                <button
                  className="flex items-center text-teal-600 hover:text-teal-800 hover:underline transition duration-300"
                  onClick={() => handleView(index)}
                >
                  <FaEye className="mr-1" /> View
                </button>
                <button
                  className="flex items-center text-teal-600 hover:text-teal-800 hover:underline transition duration-300"
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-600 hover:underline transition duration-300"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={formRef} className="mt-12 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Publish Article</h3>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Content:</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              required
            />
          </div>
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            onClick={handleAnalyzeSentiment}
          >
            Analyze Sentiment
          </button>
        </form>

        {sentimentResult && (
          <p
            className={`mt-4 text-lg font-semibold ${
              sentimentResult === "Positive"
                ? "text-green-600"
                : sentimentResult === "Neutral"
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            Sentiment: {sentimentResult}
          </p>
        )}

        <button
          type="button"
          className={`mt-4 px-4 py-2 rounded text-white ${
            canPost
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-gray-500 cursor-not-allowed"
          } transition duration-300`}
          onClick={handlePost}
          disabled={!canPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
