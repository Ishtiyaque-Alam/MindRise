import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/pages/Home";
import AboutUs from "../components/pages/AboutUs";
import Search from "../components/pages/Search";
import Community from "../components/pages/community/Community";
import Unauthorized from "../components/error/unauthorized";
import Profile from "../components/profile/Profile";
import GroupDetail from "../components/pages/community/GroupDetail";
import TwitterFeed from "../components/pages/social/TwitterFeed";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/community" element={<Community />} />
      <Route path="*" element={<Unauthorized />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/community/group/:groupId" element={<GroupDetail />} />
      <Route path="/feed" element={<TwitterFeed />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>

    </Routes>
  );
};

export default AppRoutes;
