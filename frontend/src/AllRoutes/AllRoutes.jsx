import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import AnalyticsPage from "../pages/AnalyticsPage";
// import Header from "../components/Navbar";
import CreatePosts from "../pages/CreatePosts";

const AllRoutes = () => {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/createPost" element={<CreatePosts />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
