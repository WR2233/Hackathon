// src/pages/Home.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { PostList } from "../page-component/PostList.tsx";

const Home: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();

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
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <Link to="/create-post" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
        Create Post
      </Link>
      <button
        onClick={handleSignOut}
        className="block w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Sign Out
      </button>

      <PostList />
    </div>
  );
};

export default Home;
