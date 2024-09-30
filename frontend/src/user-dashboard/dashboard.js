import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus, FaNewspaper } from "react-icons/fa";
import { useRef } from "react";

const UserDashboard = () => {
  const formRef = useRef(null); // Create a ref for the form
  const handleAddNewsClick = () => {
    // Scroll to the form when the button is clicked
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [newsPosts, setNewsPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    sentiment: "",
  });

  const navigate = useNavigate();
  const [sentimentResult, setSentimentResult] = useState("");
  const [canPost, setCanPost] = useState(false);

  useEffect(() => {
    // Fetch user's news posts from backend
    setNewsPosts([
      {
        id: 1,
        title: "News 1",
        sentiment: "Positive",
        createdAt: "2024-09-19",
        updatedAt: "2024-09-20",
      },
      {
        id: 2,
        title: "News 2",
        sentiment: "Neutral",
        createdAt: "2024-09-18",
        updatedAt: "2024-09-19",
      },
    ]);
  }, []);

  const handleEdit = (id) => {};

  const handleDelete = (id) => {};

  const handleView = (id) => {};

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyzeSentiment = () => {
    // Temporary sentiment analysis logic
    const { content } = newPost;
    let sentiment = "Neutral";

    // Mock analysis based on some keywords
    if (content.toLowerCase().includes("great")) {
      sentiment = "Positive";
    } else if (content.toLowerCase().includes("bad")) {
      sentiment = "Negative";
    }

    setSentimentResult(sentiment);
    setNewPost({ ...newPost, sentiment });

    // Enable posting if sentiment is Positive or Neutral
    setCanPost(sentiment === "Positive" || sentiment === "Neutral");
  };

  const handlePost = () => {
    if (canPost) {
      console.log("Posting news:", newPost);
      setNewsPosts([...newsPosts, newPost]);

      // Reset form
      setNewPost({ title: "", content: "", sentiment: "" });
      setSentimentResult("");
      setCanPost(false);
    } else {
      alert("Cannot post news with negative sentiment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-indigo-100 p-6">
      <nav className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-lg py-3 px-6 rounded-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <FaNewspaper className="text-indigo-600 text-4xl" />
            <div className="text-indigo-600 text-3xl font-semibold">
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
          <span>Welcome to User Dashboard</span>
        </div>

        {/* Add New News Button */}
        <div className="mb-6 text-right">
          <button
            onClick={handleAddNewsClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-300"
          >
            <FaPlus />
            <span>Add News</span>
          </button>
        </div>

        {/* News Overview */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {newsPosts.map((post, index) => (
            <div
              key={post.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
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
              <div className="flex space-x-2">
                <button
                  className="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
                  onClick={() => handleView(post.id)}
                >
                  <span className="flex items-center">
                    <FaEye className="mr-1" /> View
                  </span>
                </button>
                <button
                  className="flex items-center text-indigo-600 px-3 py-1 hover:text-indigo-800 hover:underline transition duration-300"
                  onClick={() => handleEdit(post.id)}
                >
                  <span className="flex items-center">
                    <FaEdit className="mr-1" /> Edit
                  </span>
                </button>
                <button
                  className="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
                  onClick={() => handleDelete(post.id)}
                >
                  <span className="flex items-center">
                    <FaTrash className="mr-1" /> Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form for new news posting */}
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
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Content:</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              required
            />
          </div>
          <button
            type="button"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
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
              ? "bg-green-500 hover:bg-green-600"
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