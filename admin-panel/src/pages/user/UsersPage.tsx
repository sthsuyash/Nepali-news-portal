import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MainLayout } from "@/layout/MainLayout";
import { useUsers } from "@/hooks/user/useUsers";
import { useState } from "react";
import { changeDate } from "@/helpers/changeDate";

const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { users, totalUsers, error, isLoading } = useUsers(page, limit);
  const totalPages = Math.ceil(totalUsers / limit);

  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-md">
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-medium">Users</h2>
          <Link
            className="px-3 py-[6px] bg-primary rounded-sm text-white hover:bg-primary/80 transition-all duration-200"
            to="/users/add"
          >
            Add User
          </Link>
        </div>
        <div className="flex items-center gap-4 p-4">
          <input
            type="text"
            placeholder="Search User..."
            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative overflow-x-auto p-4">
          {isLoading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}

          <table className="min-w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-7 py-3">No</th>
                <th className="px-7 py-3">Name</th>
                <th className="px-7 py-3">Email</th>
                <th className="px-7 py-3">Role</th>
                <th className="px-7 py-3">Verified</th>
                <th className="px-7 py-3">Last Login</th>
                <th className="px-7 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role.name}</td>
                  <td className="px-6 py-4">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4">
                    {changeDate(user.lastLogin, true)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start items-center gap-x-4 text-white">
                      <Link
                        to={`/users/${user.id}/edit`}
                        className="p-[6px] bg-blue-500 text-white rounded hover:shadow-lg hover:shadow-blue-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </button>
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

          {/* Empty State */}
          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 mt-4">
              No users found for the given search query.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UsersPage;
