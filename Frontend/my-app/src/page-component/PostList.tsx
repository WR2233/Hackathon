import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from "../model/models.ts";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.REACT_APP_API_URL + "/getposts";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [url]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.PostID} className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              <img src={post.Img} alt="User profile" className="w-12 h-12 rounded-full object-cover mr-4" />
              <div>
                <p className="text-lg font-semibold">{post.UserName}</p>
                <p className="text-xs text-gray-500">Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="mb-2">{post.Content}</p>
            <p className="text-xs text-gray-500">{post.Edited ? "Edited" : "Not Edited"}</p>
            <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;