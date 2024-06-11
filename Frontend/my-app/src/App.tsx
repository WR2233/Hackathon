import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm.tsx";
import Home from "./pages/Home.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import Profile from "./pages/Profile.tsx";
import UserProfile from "./pages/UserProfile.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles" element={<UserProfile/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
