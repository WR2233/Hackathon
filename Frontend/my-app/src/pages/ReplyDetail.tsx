import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts"
import CreateReply from "../services/CreateReply.ts"
import { Reply } from "../model/models.ts"
import getReplyByID from "../services/getReplyByID.ts";
import { getLikeStatus } from "../services/getLikeStatus.ts";

const ReplyDetail: React.FC = () => {
  const { replyId } = useParams<{ replyId: string }>();
  const [reply, setReply] = useState<Reply | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [user] = useAuthState(fireAuth);
  const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchReplyDetail = async () => {
      try {
        const replyData = await getReplyByID(parseInt(replyId));
        setReply(replyData);
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const likeData = await fetchLikeNum(replyId, false);
        setLikeCount(likeData ?? 0);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    const fetchLikeStatus = async () => {
      var likestatus = await getLikeStatus(replyId, user.uid, false)
      setLiked(likestatus)
    }

    if (replyId) {
      fetchReplyDetail();
      fetchLikeCount();
      fetchLikeStatus();
    }
  }, [replyId]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">You have to log in first</h1>
        <Link to="/login" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!replyId || !reply) {
    return <div>Loading...</div>;
  }

  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      const newLikedStatus = await toggleLike(replyId!, user.uid, false);
      setLiked(newLikedStatus);
      const likeData = await fetchLikeNum(replyId!, false);
      setLikeCount(likeData ?? 0);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReplyFormToggle = () => {
    setReplyFormVisible(!replyFormVisible);
  };

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newReplyId = await CreateReply(parseInt(replyId!), user.uid, replyContent, false);
      setReplyContent("");
      setReplyFormVisible(false);
      navigate(`/reply/${newReplyId}`);
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Reply Detail</h1>
      <div className="mb-4">
        <img src={reply.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto" />
      </div>
      <p className="text-lg mb-2">{reply.Content}</p>
      <p className="text-sm text-gray-500">Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
      <p className="text-sm text-gray-500">User Name: {reply.UserName}</p>
      <p className="text-sm text-gray-500">{reply.Edited ? "Edited" : "Not Edited"}</p>
      <div className="flex items-center mt-4">
        <button
          onClick={handleLikeToggle}
          className={`text-sm font-semibold px-4 py-2 rounded-md ${liked ? "text-red-500" : "text-green-500"} border border-transparent hover:bg-gray-100 focus:outline-none`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <span className="text-sm text-gray-500 ml-2">{likeCount !== null ? likeCount : "Loading..."} Likes</span>
      </div>
      <button
        onClick={handleReplyFormToggle}
        className="text-sm font-semibold bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md mt-4 focus:outline-none"
      >
        {replyFormVisible ? "Cancel Reply Form" : "Create Reply"}
      </button>
      {replyFormVisible && (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            placeholder="Enter your reply..."
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full resize-none"
            rows={5}
          />
          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none">
            Submit Reply
          </button>
        </form>
      )}
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">Back to Timeline</Link>
        <Link to={`/profiles?uid=${reply.PostedByID}`} className="text-blue-500 hover:text-blue-700">View User Profile</Link>
        <Link to={`/showtalk/${reply.ReplyID}`} className="text-blue-500 hover:text-blue-700 ml-4">Watch Talk</Link>
      </div>
    </div>
  );
}

export default ReplyDetail;
