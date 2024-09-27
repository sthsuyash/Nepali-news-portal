import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./user-auth/auth-form.js";
import NewsCrud from "./crud-page/postings.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/news-crud" element={<NewsCrud />} NewsCrud />
      </Routes>
    </Router>
  );
}

export default App;
