import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from "../model/models.ts";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import Linkify from "linkify-react";
import ReactPlayer from "react-player";

const PostListInfinity: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const linkifyOptions = {
    className: "text-blue-400",
  };

  const fetchPosts = async (page: number) => {
    const url = `${process.env.REACT_APP_API_URL}/getpostsinf?page=${page}`;
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Post[] = await response.json();
      const updatedPosts = await Promise.all(
        data.map(async (post) => {
          const likeNum = await fetchLikeNum(post.PostID, true); // Fetch like number
          return { ...post, LikeNum: likeNum };
        })
      );
      setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
      setHasMore(data.length > 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      )
        return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map(post => (
          post.DeletedUser ? (
            <p key={post.PostID}>Deleted User</p>
          ) : (post.Deleted ? (
            <p key={post.PostID}>Deleted Post</p>
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
              {post.Video && <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />}
              {post.ImgPost && (
                <div className="my-2">
                  <img src={post.ImgPost} alt="Post content" className="w-full h-auto" />
                </div>
              )}
              <p>Likes: {post.LikeNum}</p>
              <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
              <Link to={`/profiles/?uid=${post.UserID}`} className="text-blue-500 hover:underline mx-4">User Profile</Link>
            </li>
          ))
        ))}
      </ul>
      {loading && <p className="text-blue-500">Loading more posts...</p>}
      {!hasMore && <p className="text-gray-500">No more posts</p>}
    </div>
  );
};

export default PostListInfinity;
