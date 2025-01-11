import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { MainLayout } from "@/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { usePosts} from "@/hooks/usePosts";
import { useState } from "react";

const PostsPage: React.FC = () => {
    const { post } = useAuthStore(); // Access the token
    const page = 1;
    const limit = 10;

    const { posts, error } = usePosts(page, limit);

     // Search and Category Filter states
     const [searchQuery, setSearchQuery] = useState("");
     const [selectedCategory, setSelectedCategory] = useState("");
 
     // dummy data for categpries
     const categories = [
         { id: "", name: "All Categories" },
         { id: "1", name: "Technology" },
         { id: "2", name: "Health" },
         { id: "3", name: "Education" },
         { id: "4", name: "Business" },
     ];
 
     // Filtered posts based on search query and selected category
     const filteredPosts = posts.filter((post) => {
         const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
         const matchesCategory = selectedCategory === "" || post.category.id === selectedCategory;
         return matchesSearch && matchesCategory;
     });
    return (
        <MainLayout>
            <div className="bg-white rounded-md">
                <div className="flex justify-between p-4">
                    <h2 className="text-xl font-medium">Posts</h2>
                    <Link
                        className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
                        to="/posts/admin"
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
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="relative overflow-x-auto p-4">
                    {error && <div className="text-red-500">{error}</div>}

                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-7 py-3">No</th>
                                <th className="px-7 py-3">Title</th>
                                <th className="px-7 py-3">Status</th>
                                <th className="px-7 py-3">Category</th>
                                <th className="px-7 py-3">Nepali Name</th>
                                <th className="px-7 py-3">Date</th>
                    
                                <th className="px-7 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => (
                                <tr key={post.id} className="bg-white border-b">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{post.title}</td>
                                    <td className="px-6 py-4">{post.status}</td>
                                    <td className="px-6 py-4">{post.category.name}</td>
                                    <td className="px-6 py-4">{post.category.nepaliName}</td>
        
                                    <td className="px-6 py-4">
                                        {new Date(post.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-start items-center gap-x-4 text-white">
                                            <Link
                                                to={`/posts/admin/${post.id}`}
                                                className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                                            >
                                                <FaEye />
                                            </Link>
                                            <Link
                                                to={`/posts/admin/${post.id}`}
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
                </div>
            </div>
        </MainLayout>
    );
};

export default PostsPage;
