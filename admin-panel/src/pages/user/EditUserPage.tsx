import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layout/MainLayout";
import { fetchUser, updateUser } from "@/services/usersService";

const EditUserPage = () => {
  const { id } = useParams(); // Access the user ID from the route
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    isVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from API
  const fetchUserData = async (userId) => {
    try {
      const user = await fetchUser(userId); // Call the fetchUser function from the service
      setUserDetails(user);
    } catch (err) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, userDetails); // Call the updateUser function from the service
      alert("User details updated successfully!");
      navigate("/users"); // Redirect to the users list after saving
    } catch (err) {
      console.error(err);
      alert("Failed to update user details.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Loading user details...</h2>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <h2>{error}</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>Edit User</h1>
        <p style={{ marginBottom: "2rem", textAlign: "center", color: "#555" }}>
          Editing details for User ID: <strong>{id}</strong>
        </p>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="role"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={userDetails.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="isVerified"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Verified:
            </label>
            <input
              type="checkbox"
              id="isVerified"
              name="isVerified"
              checked={userDetails.isVerified}
              onChange={handleChange}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Save Changes
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditUserPage;
