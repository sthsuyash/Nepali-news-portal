import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { MainLayout } from "@/layout/MainLayout";
import { usePosts } from "@/hooks/post/usePosts";
import { useCategories } from "@/hooks/category/useCategories";
import { useState } from "react";
import { changeDate } from "@/helpers/changeDate";

const PostsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { posts, totalPosts, error: postsError } = usePosts(page, limit);
  const { categories, error: categoriesError, isLoading } = useCategories(); // Fetch categories from API
  const totalPages = Math.ceil(totalPosts / limit);

  // Search and Category Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Filtered posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || post.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Posts</h2>
          <Link
            className="px-3 py-[6px] bg-primary rounded-sm text-white hover:bg-primary/80 transition-all duration-200"
            to="/create-post"
          >
            Create Post
          </Link>
        </div>

        {/* Search and Category Filter */}
        <div className="flex items-center gap-4 p-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={isLoading || categoriesError}
          >
            <option value="">All Categories</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {categoriesError && (
          <div className="text-red-500 p-4">Failed to load categories.</div>
        )}

        <div className="relative overflow-x-auto p-4">
          {postsError && <div className="text-red-500">{postsError}</div>}

          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-7 py-3">S.N.</th>
                <th className="px-7 py-3">Title</th>
                <th className="px-7 py-3">Category</th>
                <th className="px-7 py-3">Date</th>
                <th className="px-7 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr key={post.id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {post.title.length > 50 ? `${post.title.substring(0, 100)}...` : post.title}
                  </td>
                  <td className="px-6 py-4">{post.category.name.toUpperCase()} ({post.category.nepaliName})</td>
                  <td className="px-6 py-4">{changeDate(post.createdAt, true)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start items-center gap-x-4 text-white">
                      <Link
                        to={`/posts/${post.id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/posts/edit/${post.id}`}
                        className="p-[6px] bg-blue-500 text-white rounded hover:shadow-lg hover:shadow-blue-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        to={`/posts/delete/${post.id}`}
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                      >
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between p-4">
            <button
              className="px-3 py-2 bg-gray-300 rounded disabled:bg-gray-200"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-2 bg-gray-300 rounded disabled:bg-gray-200"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>

          {/* Empty state for no results */}
          {filteredPosts.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No posts found for the given search or category.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PostsPage;
