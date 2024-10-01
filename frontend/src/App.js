import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./auth/auth-form.js";
import UserDashboard from "./user-dashboard/dashboard.js";
import AdminDashboard from "./admin-dashboard/dashboard.js";
import HomePage from "./homepage/homepage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
