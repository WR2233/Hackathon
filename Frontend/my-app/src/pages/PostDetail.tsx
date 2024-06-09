// src/pages/PostDetail.tsx
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";


interface Post {
    id: number;
    content: string;
    postedAt: string;
    userID: number;
    edited: boolean;
  }

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getpost/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <p>Displaying details for post ID: {postId}</p>


    <li key={post.id} className="mb-4">
    <h2 className="text-xl font-bold">Post ID: {post.id}</h2>
    <p>{post.content}</p>
    <p>Posted At: {new Date(post.postedAt).toLocaleString()}</p>
    <p>User ID: {post.userID}</p>
    <p>{post.edited ? "Edited" : "Not Edited"}</p>
    </li>
    </div>
  );
};

export default PostDetail;
