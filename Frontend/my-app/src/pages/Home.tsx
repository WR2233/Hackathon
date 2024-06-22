import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import  PostList from "../page-component/PostList.tsx";
import PostListofFollowing from "../page-component/PostListofFollowing.tsx";
import { useState } from "react";

const Home: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("allpost")

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    fireAuth.signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <Link to="/create-post" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4">
        Create Post
      </Link>
      <button onClick={handleSignOut} className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
        Sign Out
      </button>
      <div className="flex">
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "allpost" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("allpost")}
        >
          All Posts
        </button>
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "followpost" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("followpost")}
        >
          Following
        </button>
      </div>

      {activeTab === "allpost" && <PostList />}
      {activeTab === "followpost" && <PostListofFollowing />}
    </div>
  );
};

export default Home;
