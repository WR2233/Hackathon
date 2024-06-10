import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"

interface Post {
  UserID: number;
  Content: string;
  PostedAt: string;
  PostID: number;
  Edited: boolean;
  Deleted: boolean;
}

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://hackathon-7rbmfy5nyq-uc.a.run.app/getposts');
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
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.PostID} className="mb-4">
            <h2 className="text-xl font-bold">Post ID: {post.PostID}</h2>
            <p>{post.Content}</p>
            <p>Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
            <p>User ID: {post.UserID}</p>
            <p>{post.Edited ? "Edited" : "Not Edited"}</p>
            {/* 詳細ボタン */}
            <Link to={`/post/${post.PostID}`} className="text-blue-500">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};