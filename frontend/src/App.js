import React from "react";
import Header from "../src/component/common/header/Header";
import "./App.css";
import Homepages from "../src/component/home/Homepages";
import Footer from "../src/component/common/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePage from "../src/component/singlePage/SinglePage";
import Culture from "../src/component/culture/Culture";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/culture" element={<Culture />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
