import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts";
import CreateReply from "../services/CreateReply.ts";
import { Reply } from "../model/models.ts";
import getReplyByID from "../services/getReplyByID.ts";
import Linkify from "linkify-react";
import { getLikeStatus } from "../services/getLikeStatus.ts";
import ReactPlayer from "react-player";

const ReplyDetail: React.FC = () => {
  const { replyId } = useParams<{ replyId: string }>();
  const [reply, setReply] = useState<Reply | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [user] = useAuthState(fireAuth);
  const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(false)
  const navigate = useNavigate();
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchReplyDetail = async () => {
      if (replyId) {
        try {
          const replyData = await getReplyByID(parseInt(replyId));
          if (!replyData) {
            console.error("Error: replyData is undefined");
            return;
          }
          setReply(replyData);
        } catch (error) {
          console.error("Error fetching reply:", error);
        }
      }
    };

    const fetchLikeCount = async () => {
      if (replyId) {
        try {
          const likeData = await fetchLikeNum(parseInt(replyId), false);
          setLikeCount(likeData ?? 0);
        } catch (error) {
          console.error("Error fetching like count:", error);
        }
      }
    };

    const fetchLikeStatus = async () => {
      if (replyId && user) {
        try {
          const likeStatus = await getLikeStatus(replyId, user.uid, false);
          setLiked(likeStatus);
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      }
    };

    fetchReplyDetail();
    fetchLikeCount();
    fetchLikeStatus();
  }, [replyId, user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">You have to log in first</h1>
        <Link
          to="/login"
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
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
      const newLikedStatus = await toggleLike(replyId, user.uid, false);
      setLiked(newLikedStatus);
      const likeData = await fetchLikeNum(parseInt(replyId), false);
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
    if (isloading) {
      return;
    }
    try {
      setIsloading(true)
      const newReplyId = await CreateReply(parseInt(replyId), user.uid, replyContent, false);
      setReplyContent("");
      setReplyFormVisible(false);
      navigate(`/showtalk/${newReplyId}`);
    } catch (error) {
      console.error("Error creating reply:", error);
    } finally {
      setTimeout(() => {
        setIsloading(false); // 2秒後にボタンを再度有効化する
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      {reply.DeletedUser ? (
        <div>Deleted User</div>
      ) : reply.Deleted ? (
        <div>Deleted Reply</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Reply Detail</h1>
          <div className="mb-4">
            <img
              src={reply.Img}
              alt="User profile"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
          <Linkify as="p" options={linkifyOptions}>
            {reply.Content}
          </Linkify>
          {reply.Video && (
            <ReactPlayer url={reply.Video} controls={true} width="100%" height="100%" />
          )}
          {reply.ImgPost && <img src={reply.ImgPost} alt="Img of Post" />}
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
            <span className="text-sm text-gray-500 ml-2">
              {likeCount !== null ? likeCount : "Loading..."} Likes
            </span>
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
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
              >
                Submit Reply
              </button>
            </form>
          )}
          <div className="mt-6">
            <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">
              Back to Timeline
            </Link>
            <Link
              to={`/profiles?uid=${reply.PostedByID}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View User Profile
            </Link>
            <Link to={`/showtalk/${reply.ReplyID}`} className="text-blue-500 hover:text-blue-700 ml-4">
              Watch Talk
            </Link>

          </div>
        </>
      )}
    </div>
  );
};

export default ReplyDetail;
