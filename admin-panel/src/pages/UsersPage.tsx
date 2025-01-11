import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MainLayout } from "@/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { useUsers } from "@/hooks/useUsers";

const UsersPage: React.FC = () => {
    const { user } = useAuthStore(); // Access the token
    const page = 1;
    const limit = 10;

    const { users, error } = useUsers(page, limit);
    return (
        <MainLayout>
            <div className="bg-white rounded-md">
                <div className="flex justify-between p-4">
                    <h2 className="text-xl font-medium">Users</h2>
                    <Link
                        className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
                        to="/dashboard/user/add"
                    >
                        Add User
                    </Link>
                </div>

                <div className="relative overflow-x-auto p-4">
                    {error && <div className="text-red-500">{error}</div>}

                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-7 py-3">No</th>
                                <th className="px-7 py-3">Name</th>
                                <th className="px-7 py-3">Email</th>
                                <th className="px-7 py-3">Phone</th>
                                <th className="px-7 py-3">Role</th>
                                <th className="px-7 py-3">Verified</th>
                                <th className="px-7 py-3">Last Login</th>
                                <th className="px-7 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="bg-white border-b">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4">{user.role.name}</td>
                                    <td className="px-6 py-4">{user.isVerified ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">
                                        {new Date(user.lastLogin).toLocaleString("en-US", {
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
                                                to={`/users/admin/${user.id}`}
                                                className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                                            >
                                                <FaEye />
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

export default UsersPage;
