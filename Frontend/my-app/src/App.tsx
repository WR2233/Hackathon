import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginForm from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ShowFollows from "./pages/ShowFollows.tsx";
import ReplyDetail from "./pages/ReplyDetail.tsx";
import ShowTalk from "./pages/ShowTalk.tsx";
import Header from "./page-component/Header.tsx"
import Search from "./pages/Searh.tsx";
import UpdatePostContent from "./page-component/UpdatePostContent.tsx";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profiles" element={<UserProfile/>} /> 
          <Route path="/followlist" element={<ShowFollows/>} />
          <Route path="/reply/:replyId" element={<ReplyDetail />} />
          <Route path="/showtalk/:replyId" element={< ShowTalk/>} />
          <Route path="/search" element={< Search/>} />
          <Route path="/updatepost/:postId" element={<UpdatePostContent/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App