import { Link } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { useCategories } from "@/hooks/category/useCategories";
import { FaEye, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { changeDate } from "@/helpers/changeDate";

const CategoryPage: React.FC = () => {
    const { categories, error, loading } = useCategories();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter categories based on search query
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="bg-white rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Categories</h2>
                    {/* <Link
                        to="/categories/add"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-all duration-200"
                    >
                        Add New Category
                    </Link> */}
                </div>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Error or loading state */}
                {error && <div className="text-red-500">Failed to load categories.</div>}
                {loading && <div className="text-gray-500">Loading...</div>}

                {/* Category table */}
                {!loading && filteredCategories.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">S.N.</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Total Posts</th>
                                    <th className="px-6 py-3">Last Updated</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.map((category, index) => (
                                    <tr key={category.id} className="bg-white border-b">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            {`${category.name.toUpperCase()} (${category.nepaliName || "N/A"})`}
                                        </td>

                                        <td className="px-6 py-4">{category._count.posts}</td>
                                        <td className="px-6 py-4">{changeDate(category.updatedAt)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <Link
                                                    to={`/categories/${category.id}/view`}
                                                    className="p-2 bg-green-500 text-white rounded hover:shadow-lg hover:shadow-green-500/50"
                                                >
                                                    <FaEye />
                                                </Link>
                                                
                                                {/* <button
                                                    className="p-2 bg-red-500 text-white rounded hover:shadow-lg hover:shadow-red-500/50"
                                                    onClick={() => console.log(`Delete category: ${category.id}`)}
                                                >
                                                    <FaTrash />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty state */}
                {!loading && filteredCategories.length === 0 && (
                    <div className="text-center text-gray-500">No categories found.</div>
                )}
            </div>
        </MainLayout>
    );
};

export default CategoryPage;
