import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import { MainLayout } from "@/layout/MainLayout";
import { useGetPost } from "@/hooks/post/useGetPost"; // Hook to fetch post data
import { useUpdatePost } from "@/hooks/post/useUpdatePost"; // Hook to update post
import { useCategories } from "@/hooks/category/useCategories";
import { useSentiments } from "@/hooks/sentiment/useSentiments";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get post ID from URL
  const navigate = useNavigate();

  const editor = useRef<JoditEditor | null>(null);

  // State variables
  const [postData, setPostData] = useState<any>(null); // Store the current form data
  const [originalData, setOriginalData] = useState<any>(null); // Store the original data from API
  const [imgPreview, setImgPreview] = useState<string>("");

  const { categories, loading, error } = useCategories(); // Fetch categories
  const { sentiments, loading: sentimentLoading, error: sentimentError } = useSentiments(); // Fetch sentiments

  const { fetchPostById, isLoading: isFetching } = useGetPost();
  const { handleUpdatePost, isLoading: isUpdating } = useUpdatePost();

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const data = await fetchPostById(id);
          setPostData(data); // Set form data
          setOriginalData(data); // Store original data
          setImgPreview(data.image); // Assuming API returns an `imageUrl`
        } catch (error: any) {
          toast.error("Failed to fetch post details.");
        }
      }
    };
    fetchPost();
  }, [id, fetchPostById]);

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: Record<string, any> = {};

    // Compare and only send changed fields
    if (postData.title !== originalData.title) {
      updatedFields.title = postData.title;
    }
    if (postData.description !== originalData.description) {
      updatedFields.description = postData.description;
    }
    if (postData.summary !== originalData.summary) {
      updatedFields.summary = postData.summary;
    }
    if (postData.categoryId !== originalData.categoryId) {
      updatedFields.categoryId = postData.categoryId;
    }
    if (postData.sentimentId !== originalData.sentimentId) {
      updatedFields.sentimentId = postData.sentimentId;
    }

    // If no fields were updated, prevent unnecessary API call
    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    try {
      console.log("Updated Fields:", updatedFields); // Debugging
      const response = await handleUpdatePost(id, updatedFields);
      toast.success(response);
      navigate("/posts"); // Redirect to posts list
    } catch (error: any) {
      toast.error(error.message || "Failed to update post.");
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isFetching) {
    return <p>Loading post...</p>;
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Edit Post</h2>
          <Link
            className="px-3 py-[6px] bg-primary rounded-sm text-white hover:bg-primary/60 transition-all duration-200"
            to="/posts"
          >
            Posts
          </Link>
        </div>

        <div className="p-4">
          <form onSubmit={handleEditPost}>
            {/* Title Input */}
            <div className="flex flex-col gap-y-2 mb-6">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={postData?.title || ""}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500"
              />
            </div>
            {/* Image Display (Non-editable) */}
            <div className="mb-6">
              <div
                className="w-full h-[240px] flex items-center justify-center border-2 border-dashed rounded text-gray-600 relative"
                title="Image cannot be changed"
              >
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="Post Image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400">No image available</p>
                )}
              </div>
            </div>


            {/* Description */}
            <div className="flex flex-col gap-y-2 mb-6">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="description"
              >
                Description
              </label>
              <JoditEditor
                ref={editor}
                value={postData?.description || ""}
                onBlur={(newContent) => {
                  setPostData((prevData: any) => ({
                    ...prevData,
                    description: newContent,
                  }));
                }}
                onChange={() => { }}
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-y-2 mb-6">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="categoryId"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={postData?.categoryId || ""}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nepaliName}
                  </option>
                ))}
              </select>
            </div>

            {/* Sentiment Dropdown */}
            <div className="flex flex-col gap-y-2 mb-6">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="sentimentId"
              >
                Sentiment
              </label>
              <select
                id="sentimentId"
                name="sentimentId"
                value={postData?.sentimentId || ""}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500"
              >
                {sentiments.map((sentiment) => (
                  <option key={sentiment.id} value={sentiment.id}>
                    {sentiment.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary Input */}
            <div className="flex flex-col gap-y-2 mb-6">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="summary"
              >
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={postData?.summary || ""}
                onChange={handleInputChange}
                placeholder="Enter summary"
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-3 py-[6px] rounded-sm text-white ${isUpdating
                ? "bg-gray-500"
                : "bg-blue-600 hover:bg-blue-500 transition-all duration-200"
                }`}
            >
              {isUpdating ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditPost;