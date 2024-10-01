import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const LoginSignup = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post(
          "/login",
          JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Login Successful:", JSON.stringify(response?.data));
        const accesToken = response?.data?.access_token;
        localStorage.setItem("token", accesToken);

        setAuth({ user: formData.username, role: "user", accesToken });
        if (formData.username === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        // Signup API call
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match!");
          return;
        }
        const response = await axios.post("/register", {
          username: formData.username,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        });

        console.log("Signup Successful:", response.data);
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (error) {
      console.error(
        "Error during authentication:",
        error.response ? error.response.data : error.message
      );
      alert("Invalid Credentials");
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-200 shadow-md rounded-2xl p-8">
        <button onClick={handleLogo} className="text-left flex space-x-4 mb-6 ">
          <FaNewspaper className="text-teal-600 text-3xl" />
          <h1 className="text-2xl font-bold text-teal-600">KhabarCheck</h1>
        </button>

        <h2 className="text-3xl font-login text-left mb-6">
          {isLogin ? "Log in to KhabarCheck" : "Create your account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-field">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 shadow-sm bg-slate-200 rounded-md focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-teal-500"
              placeholder="Username"
              required
            />
          </div>

          {!isLogin && (
            <div className="input-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-teal-500"
                placeholder="Email"
                required
              />
            </div>
          )}
          {!isLogin && (
            <div className="input-field">
              <input
                type="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 shadow-sm bg-slate-200 rounded-md focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-teal-500"
                placeholder="Phone Number"
                required
              />
            </div>
          )}
          <div className="input-field relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-teal-500"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-2 text-gray-600"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          {!isLogin && (
            <div className="input-field">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-teal-500"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-lg text-teal-700 no-underline font-login hover:underline"
              onClick={toggleForm}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
            <button
              type="submit"
              className="w-32 bg-teal-600 text-white w-100 py-2 rounded-lg text-lg hover:bg-teal-700 transition duration-300 font-login"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
