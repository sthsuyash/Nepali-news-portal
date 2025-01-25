import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import { MainLayout } from "@/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { useCreatePost } from "@/hooks/useCreatePost";

const CreatePost: React.FC = () => {
  const { store } = useAuthStore();
  const editor = useRef<JoditEditor | null>(null);

  // State variables
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");

  const { handleCreatePost, isLoading } = useCreatePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        if (imgPreview) {
          URL.revokeObjectURL(imgPreview); // Cleanup previous preview
        }
        setImage(file);
        setImgPreview(URL.createObjectURL(file));
      } else {
        toast.error("Please select a valid image file.");
      }
    }
  };


  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await handleCreatePost(formData);
      toast.success(response.message);

      // Reset the form fields
      setTitle("");
      setDescription("");
      setImage(null);

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Add Post</h2>
          <Link
            className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
            to="/dashboard/posts"
          >
            Posts
          </Link>
        </div>

        <div className="p-4">
          <form onSubmit={addPost}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
                className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label
                htmlFor="image"
                className="w-full h-[240px] flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-600"
              >
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <MdCloudUpload className="text-2xl" />
                    <p>Select Image</p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="hidden"
                required
              />
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
                value={description}
                onBlur={(newContent) => setDescription(newContent)} // Explicitly set the new content
                onChange={() => { }}
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`px-3 py-[6px] rounded-sm text-white ${
                isLoading ? "bg-gray-500" : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {isLoading ? "Loading..." : "Add Post"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
