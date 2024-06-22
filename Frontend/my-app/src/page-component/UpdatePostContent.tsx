import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { Post } from "../model/models.ts";
import { useParams } from "react-router-dom";
import Linkify from "linkify-react";
import ReactPlayer from "react-player";

const UpdatePostContent: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;
        const response = await fetch(`${url}/getpost?pid=${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error: redirect to error page or show error message
      }
    };

    if (!user) {
      navigate("/login");
    }

    fetchPostDetail();
  }, [user, navigate, postId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const uid = user?.uid;
    if (!uid) {
      return;
    }

    try {
      await updatePost(content, parseInt(postId, 10));
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error: redirect to error page or show error message
    }
  };

  const updatePost = async (content: string, postId: number): Promise<number> => {
    const postData = {
      Content: content,
      PostID: postId,
    };

    const url = process.env.REACT_APP_API_URL as string;
    const response = await fetch(`${url}/updatepost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    const responseData = await response.json();
    const updatedPostId = responseData.postId;
    return updatedPostId;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      {post && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
          <div className="mb-4">
            <img src={post.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto" />
          </div>
          <Linkify as="p" options={linkifyOptions}>
            {post.Content}
          </Linkify>
          <p className="text-sm text-gray-500">Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
          <p className="text-sm text-gray-500">User Name: {post.UserName}</p>
          <p className="text-sm text-gray-500">{post.Edited ? "Edited" : "Not Edited"}</p>
          {post.Video && <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />}
          {post.ImgPost && <img src={post.ImgPost} alt="Img of Post" />}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 my-4"> Update Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full resize-none"
            rows={5}
            maxLength={200}
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Update Post
        </button>
        <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-700">Cancel</Link>
      </form>
    </div>
  );
};

export default UpdatePostContent;
