import React, { useState, useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [Posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get("/home");
        const { posts } = response.data;
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchHomePageData();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-lg py-3 px-6 rounded-lg w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <FaNewspaper className="text-teal-600 text-4xl" />
            <div className="text-teal-600 text-3xl font-semibold">
              KhabarCheck
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="container mt-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full flex justify-center items-center mb-4">
          <h2 className="text-3xl font-bold text-bold text-center">
            Latest News
          </h2>
        </div>

        {/* Latest Posts */}
        <div className="mb-6">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Posts && Posts.length > 0 ? (
              Posts.map((post) => (
                <div
                  key={post.title}
                  className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h4 className="text-xl font-semibold mb-2">{post.title}</h4>

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
                  <p className="text-xs text-gray-600 mb-2">
                    posted by : John Doe
                  </p>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
