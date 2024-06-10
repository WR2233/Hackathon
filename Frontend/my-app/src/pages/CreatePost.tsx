import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../services/createPost.ts"
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

const CreatePost: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return;
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const uid = user.uid;

    try {
      await createPost(content, uid);
      console.log("Post created:", { content, uid});
      setContent("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
      <Link to="/" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
        cancel
      </Link>
    </div>
  );
};

export default CreatePost;
