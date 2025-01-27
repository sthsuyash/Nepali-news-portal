import { useParams } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";

const ViewUserPage = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="bg-white rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">User Details</h2>
        </div>
        <h1>User</h1>
        <p>User ID: {id}</p>
      </div>
    </MainLayout>
  );
};

export default ViewUserPage
