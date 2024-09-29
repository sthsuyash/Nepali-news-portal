import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging Details:", formData);
      navigate("/user/dashboard");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log("Signing Details:", formData);
      setIsLogin(true);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-950">
      <div className="bg-white w-full max-w-2xl">
        {" "}
        <div className="text-left ml-8 py-3">
          <h1 className="text-2xl font-bold text-indigo-600">KhabarCheck</h1>
        </div>
      </div>
      <div className="bg-slate-200 shadow-md p-8 max-w-2xl w-full">
        {" "}
        <h2 className="text-3xl font-login text-left mb-6">
          {isLogin ? "Login required" : "Create your account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="input-field">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 shadow-sm bg-slate-200 focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-indigo-500"
                placeholder="Username"
                required
              />
            </div>
          )}
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-200 shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-indigo-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-field relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-200 shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-indigo-500"
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
                className="w-full px-3 py-2 bg-slate-200 shadow-sm focus:outline-none focus:ring-0 border-b-2 border-gray-400 focus:border-indigo-500"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-lg text-indigo-700 no-underline font-login hover:underline"
              onClick={toggleForm}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
            <button
              type="submit"
              className="w-1/3 bg-indigo-600 text-white w-100 py-2 rounded-lg text-lg hover:bg-indigo-700 transition duration-300 font-login"
            >
              {isLogin ? "Login to your account" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
