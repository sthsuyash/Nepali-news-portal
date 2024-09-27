import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewsCrud = () => {
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
    <div className="container mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">News History</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">S.N</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Sentiment</th>
              <th className="py-2 px-4 border">Created At</th>
              <th className="py-2 px-4 border">Updated At</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsPosts.map((post, index) => (
              <tr key={post.id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{post.title}</td>
                <td
                  className={`py-2 px-4 border ${
                    post.sentiment === "Positive"
                      ? "text-green-600"
                      : post.sentiment === "Neutral"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  {post.sentiment}
                </td>
                <td className="py-2 px-4 border">{post.createdAt}</td>
                <td className="py-2 px-4 border">{post.updatedAt}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleView(post.id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form for new news posting */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Publish Article </h3>
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
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
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
          }`}
          onClick={handlePost}
          disabled={!canPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewsCrud;
