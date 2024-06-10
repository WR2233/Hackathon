// src/pages/PostDetail.tsx
import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";

interface Post {
    PostID: number;
    Content: string;
    PostedAt: string;
    UserID: number;
    Edited: boolean;
    Deleted: boolean;
  }

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`https://hackathon--a-7rbmfy5nyq-uc.a.run.app/getpost?pid=${postId}`);
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
        <li key={post.PostID} className="mb-4">
            <h2 className="text-xl font-bold">Post ID: {post.PostID}</h2>
            <p>{post.Content}</p>
            <p>Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
            <p>User ID: {post.UserID}</p>
            <p>{post.Edited ? "Edited" : "Not Edited"}</p>
            <Link to="/" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                back to TimeLine
            </Link>
        </li>
    </div>
  );
};

export default PostDetail;
