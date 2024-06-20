import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from "../model/models.ts";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import getPostsByUserID from '../services/getPostsByUserID.ts';
import Linkify from 'linkify-react';

interface PostListForUserProps {
  uid: string;
}

const PostListForUser: React.FC<PostListForUserProps> = ({ uid }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const linkifyOptions = {
    className: "text-blue-400",
};

  useEffect(() => {
    const fetchPostsByUser = async () => {
      try {
        const posts = await getPostsByUserID(uid);
        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            const likeNum = await fetchLikeNum(post.PostID, true); 
            return { ...post, LikeNum: likeNum };
          })
        );
        setPosts(updatedPosts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPostsByUser();
  }, [uid]);
  console.log(posts)
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          post.DeletedUser ? (
            <p key={post.PostID}>deleted</p>
          ) : (
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
              <p className="text-xs text-gray-500">{post.Edited ? "Edited" : "Not Edited"}</p>
              <p>Likes: {post.LikeNum}</p> {/* LikeNumを表示 */}
              <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
            </li>
          )
        ))}
        
      </ul>
    </div>
  );
};

export default PostListForUser;
