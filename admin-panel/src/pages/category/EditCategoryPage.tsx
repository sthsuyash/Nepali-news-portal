import { useParams } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { useCategory } from "@/hooks/category/useCategory";
import { changeDate } from "@/helpers/changeDate";
import { useState } from "react";
import { Tag, Calendar, Clock } from "lucide-react";

const EditCategoryPage = () => {
  const { id } = useParams();
  const { category, error, isLoading, refetch } = useCategory(parseInt(id));
  const [formData, setFormData] = useState({
    name: "",
    nepaliName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial form values once the category is loaded
  useState(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        nepaliName: category.nepaliName || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to update the category
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Refetch data after successful update
      await refetch();
      alert("Category updated successfully!");
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Failed to update category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-md p-4">Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-white rounded-md p-4 text-red-500">Error loading category details.</div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Update Category</h2>
        </div>
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 gap-4 p-4">
          {/* Name */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              <Tag className="inline-block mr-2 text-gray-500" />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Nepali Name */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <label htmlFor="nepaliName" className="text-sm font-medium text-gray-900">
              <Tag className="inline-block mr-2 text-gray-500" />
              Nepali Name
            </label>
            <input
              type="text"
              id="nepaliName"
              name="nepaliName"
              value={formData.nepaliName}
              onChange={handleChange}
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Created At */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Calendar className="inline-block mr-2 text-gray-500" />
              Created At
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{changeDate(category.createdAt)}</dd>
          </div>

          {/* Updated At */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Clock className="inline-block mr-2 text-gray-500" />
              Updated At
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{changeDate(category.updatedAt)}</dd>
          </div>

          {/* Submit Button */}
          <div className="py-6">
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};


export default EditCategoryPage
