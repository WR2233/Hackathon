import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"


interface Post{
	PostID :   number
	Content :    string
	PostedAt :   string 
	UserID    :  string 
	Edited     : boolean
	DeletedPost :boolean
	UserName    :string 
	DeletedUser :boolean 
}

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  var url =process.env.REACT_APP_API_URL as string
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url + "/getposts");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    console.log(posts)
    fetchPosts();
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.PostID} className="mb-4">
            <p>{post.Content}</p>
            <p>Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
            <p>User Name: {post.UserName}</p>
            <p>{post.Edited ? "Edited" : "Not Edited"}</p>
            {/* 詳細ボタン */}
            <Link to={`/post/${post.PostID}`} className="text-blue-500">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};