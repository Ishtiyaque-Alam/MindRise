import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/pages/Home";
import AboutUs from "../components/pages/AboutUs";
import Search from "../components/pages/Search";
import Community from "../components/pages/Community";
import Unauthorized from "../components/error/unauthorized";
import Profile from "../components/profile/Profile";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/community" element={<Community />} />
      <Route path="*" element={<Unauthorized />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
