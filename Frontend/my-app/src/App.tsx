import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm.tsx";
import Home from "./pages/Home.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import Profile from "./pages/MyProfile.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ShowFollows from "./pages/ShowFollows.tsx";
import ToHome from "./page-component/ToHome.tsx"
import ToProfile from "./page-component/ToProfile.tsx";
import ReplyDetail from "./pages/ReplyDetail.tsx";
import ShowTalk from "./pages/ShowTalk.tsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiles" element={<UserProfile/>} /> 
          <Route path="/followlist" element={<ShowFollows/>} />
          <Route path="/reply/:replyId" element={<ReplyDetail />} />
          <Route path="/showtalk/:replyId" element={< ShowTalk/>} />
        </Routes>
        < ToHome />
        < ToProfile />
      </Router>
    </div>
  );
};

export default App;
