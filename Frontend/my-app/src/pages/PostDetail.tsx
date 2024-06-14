// src/pages/PostDetail.tsx
import React, {useEffect, useState} from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts"
import CreateReply from "../services/CreateReply.ts"
import getRepliesByPost from "../services/getRepliesByPostID.ts";
import {Post, Reply} from "../model/models.ts"

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [user] = useAuthState(fireAuth);
  const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const navigate = useNavigate();
  const [replies, setReplies] = useState<Reply[]>([]);
  var url = process.env.REACT_APP_API_URL ;

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(url + `/getpost?pid=${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchLikeCount = async () => {
      if (postId) {
        const likeData = await fetchLikeNum(postId, true);
        if (likeData) {
          setLikeCount(likeData);
        }
        if (!likeData) {
          setLikeCount(0);
        }
      }
    };

    const fetchReplies = async () => {
      try {
          const data = await getRepliesByPost(postId!);
          setReplies(data)
      } catch (error) {
          console.error("Error fetching replies:", error);
      }
  };

    fetchPostDetail();
    fetchLikeCount();
    fetchReplies();
  }, [postId]);
  
  if (!user) {
    return(
      <div>
        <h1>you have to log in At first</h1>
      </div>)
  }
  if (!postId) {
    return <div>Post ID is not provided</div>;
  }

  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      const newLikedStatus = await toggleLike(postId!, user.uid, true);
      setLiked(newLikedStatus);
      const likeCount = await fetchLikeNum(postId!, true);
      setLikeCount(likeCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReplyFormToggle = () => {
    setReplyFormVisible(!replyFormVisible);
  };

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
    const pidNum = parseInt(postId);
    if (isNaN(pidNum)) {
      console.error("Post ID is not a number");
      return;
    }
    // フォームからの入力を使用してリプライを作成する
    const replyID = await CreateReply (pidNum, user.uid, replyContent, true);

    // リプライが成功裏に作成されたら、フォームを非表示にする
    setReplyContent("");
    setReplyFormVisible(false);

    navigate("/reply/" + replyID)
    }catch (error) {
        console.error("Error creating reply:", error);
  }}
  


  if (!post) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <ul> 
        <li key={post.PostID} className="mb-4">
          <p>{post.Content}</p>
          <p>Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
          <p>User Name: {post.UserName}</p>
          <p>{post.Edited ? "Edited" : "Not Edited"}</p>
          <p>Likes: {likeCount !== null ? likeCount : "Loading..."}</p>
          <button
            onClick={handleLikeToggle}
            className={`block bg-${
              liked ? "red" : "green"
            }-500 hover:bg-${liked ? "red" : "green"}-700 text-white font-bold py-2 px-4 rounded`}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <button
            onClick={handleReplyFormToggle}
            className="block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            {replyFormVisible ? "Cancel Reply Form" : "Create Reply"}
          </button>
          {replyFormVisible && (
            <form onSubmit={handleReplySubmit}>
              <textarea
                placeholder="Enter your reply..."
                value={replyContent}
                onChange={(event) => setReplyContent(event.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </li>
      </ul>
      <Link
        to="/"
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Back to Timeline
      </Link>
      <Link
        to={`/profiles?uid=${post.UserID}`}
        className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        View User Profile
      </Link>
      <h2 className="text-xl font-bold mt-4">Replies</h2>
      <ul > 
      {replies.length > 0 ? (
              replies.map((reply) => (
                <li key={reply.ReplyID} className="mb-4">
                  <p>{reply.Content}</p>
                  <p>Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
                  <p>User Name: {reply.UserName}</p>
                  <p>{reply.Edited ? "Edited" : "Not Edited"}</p>
                  <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500">
                    To Reply detail
                  </Link>
                </li>
              ))
            ) : (
              <p>No replies yet</p>
            )}
      </ul>
    </div>
  );
}

export default PostDetail
