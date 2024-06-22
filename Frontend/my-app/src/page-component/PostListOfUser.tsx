import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from "../model/models.ts";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import getPostsByUserID from '../services/getPostsByUserID.ts';
import Linkify from 'linkify-react';
import ReactPlayer from 'react-player';
import DeletePostReply from "../services/DeletePostReply.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

interface PostListForUserProps {
  uid: string| null;
}

const PostListOfUser: React.FC<PostListForUserProps> = ({ uid }) => {
  const [user] = useAuthState(fireAuth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchPostsByUser = async () => {
      setLoading(true);
      if (loading) {
        return;
      }
      try {
        if (!uid) {
          return
        }
        const posts = await getPostsByUserID(uid);
        if (posts) {
          const likeNumPromises = posts.map(post => fetchLikeNum(post.PostID, true));
          const likeNums = await Promise.all(likeNumPromises);
          const updatedPosts = posts.map((post, index) => ({ ...post, LikeNum: likeNums[index] }));
          setPosts(updatedPosts);
        } else {
          setPosts([]); // If posts is null, set an empty array
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByUser();
  }, [uid]);

  const handleDelete = async (postID: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      setLoading(true);
      await DeletePostReply(postID, true);
      setPosts(posts.filter(post => post.PostID !== postID));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}
      <ul>
        {posts.length > 0 ? (
          posts.map(post =>
            (!post.Deleted &&
             (
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
                {post.Video && <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />}
                {post.ImgPost && <img src={post.ImgPost} alt="Img of Post" />}
                <p className="text-xs text-gray-500">{post.Edited ? "Edited" : "Not Edited"}</p>
                <p>Likes: {post.LikeNum}</p>
                <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
                {user && user.uid === post.UserID && (
                  <div>
                    <button
                      onClick={() => handleDelete(post.PostID)}
                      className="text-red-500 hover:underline "
                    >
                      Delete
                    </button>

                    <Link to={`/updatepost/${post.PostID}`} className="text-blue-500 hover:underline mx-4">update post</Link>
                  </div>
                )}
              </li>
            )
          )
        ) ): (
          <p>No posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default PostListOfUser;
