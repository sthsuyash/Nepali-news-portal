import { useParams } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { useCategory } from "@/hooks/category/useCategory";
import { useEditCategory } from "@/hooks/category/useEditCategory";
import { changeDate } from "@/helpers/changeDate";
import { Tag, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toastWithTime } from "@/components/customUI/Toaster";

const ViewCategoryPage = () => {
  const { id } = useParams();
  const { category, error, isLoading } = useCategory(parseInt(id));
  const { editCategory, isSubmitting } = useEditCategory();
  const [formData, setFormData] = useState({
    name: "",
    nepaliName: "",
  });

  // Set form data once category is loaded
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        nepaliName: category.nepaliName || "",
      });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editCategory(parseInt(id), formData);
      toastWithTime("success", "Category updated successfully!");
    } catch (err: any) {
      console.error("Failed to update category:", err);
      toastWithTime("error", err.message || "Failed to update category.");
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
        <div className="bg-white rounded-md p-4 text-red-500">
          Error loading category details.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Edit Category</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <dl className="divide-y divide-gray-200 gap-4 p-4">
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
              <label
                htmlFor="nepaliName"
                className="text-sm font-medium text-gray-900"
              >
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
              />
            </div>

            {/* Created At */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">
                <Calendar className="inline-block mr-2 text-gray-500" />
                Created At
              </dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {changeDate(category.createdAt)}
              </dd>
            </div>

            {/* Updated At */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">
                <Clock className="inline-block mr-2 text-gray-500" />
                Updated At
              </dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {changeDate(category.updatedAt)}
              </dd>
            </div>
          </dl>

          {/* Submit Button */}
          <div className="py-6 px-4">
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

export default ViewCategoryPage;
