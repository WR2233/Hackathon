import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from "../model/models.ts";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import Linkify from "linkify-react";
import ReactPlayer from "react-player";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.REACT_APP_API_URL + "/getposts";
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        const updatedPosts = await Promise.all(data.map(async (post) => {
          const likeNum = await fetchLikeNum(post.PostID, true); // IsPostをtrueに設定して投稿のLikeNumを取得
          return { ...post, LikeNum: likeNum };
        }));
        setPosts(updatedPosts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [url]);
  console.log(posts)
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          post.DeletedUser ? (
            <p key={post.PostID}>deleted User</p>
          ) : ((post.Deleted ? (
            <p key={post.PostID}>deleted Post</p>
          ):
            <li key={post.PostID} className="mb-6 border-b pb-4">
              <div className="flex items-center mb-2">
                <img src={post.Img} alt="User profile" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="text-lg font-semibold">{post.UserName}</p>
                  <p className="text-xs text-gray-500">Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
                </div>
              </div>
              <Linkify as="p" options={linkifyOptions}>
                {post.Content}
              </Linkify>
              {post.Video ? <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />:<></> }
            
              {post.ImgPost && (
                <div className="my-2">
                  <img src={post.ImgPost} alt="Post content" className="w-full h-auto" />
                </div>
              )}      
              <p>Likes: {post.LikeNum}</p>
              <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
            </li>
          )
        )))}
      </ul>
    </div>
  );
};

export default PostList;
