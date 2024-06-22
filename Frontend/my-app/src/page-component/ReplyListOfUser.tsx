import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Reply } from "../model/models.ts";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import getRepliesByUserID from '../services/GetRepliesByUserID.ts';
import Linkify from 'linkify-react';
import ReactPlayer from 'react-player';
import DeletePostReply from "../services/DeletePostReply.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

interface ReplyListForUserProps {
  uid: string;
}

const ReplyListOfUser: React.FC<ReplyListForUserProps> = ({ uid }) => {
  const [user] = useAuthState(fireAuth);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchRepliesByUser = async () => {
      setLoading(true);
      try {
        const replies = await getRepliesByUserID(uid);
        if (replies) {
          const likeNumPromises = replies.map(reply => fetchLikeNum(reply.ReplyID, false));
          const likeNums = await Promise.all(likeNumPromises);
          const updatedReplies = replies.map((reply, index) => ({ ...reply, LikeNum: likeNums[index] }));
          setReplies(updatedReplies);
        } else {
          setReplies([]); // If replies is null, set an empty array
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepliesByUser();
  }, [uid]);

  const handleDelete = async (replyID: number) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) {
      return;
    }

    try {
      setLoading(true);
      await DeletePostReply(replyID, false);
      setReplies(replies.filter(reply => reply.ReplyID !== replyID));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Replies</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}
      <ul>
        {replies.length > 0 ? (
          replies.map(reply =>
            reply.Deleted ? (
              <p key={`deleted-${reply.ReplyID}`}>Deleted reply</p>
            ) : (
              <li key={reply.ReplyID} className="mb-6 border-b pb-4">
                <div className="flex items-center mb-2">
                  <img src={reply.Img} alt="User profile" className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <p className="text-lg font-semibold">{reply.UserName}</p>
                    <p className="text-xs text-gray-500">Posted At: {new Date(reply.PostedAt).toLocaleString()}</p>
                  </div>
                </div>
                <Linkify as="p" options={linkifyOptions}>
                  {reply.Content}
                </Linkify>
                {reply.Video && <ReactPlayer url={reply.Video} controls={true} width="100%" height="100%" />}
                {reply.ImgPost && <img src={reply.ImgPost} alt="Img of Reply" />}
                <p className="text-xs text-gray-500">{reply.Edited ? "Edited" : "Not Edited"}</p>
                <p>Likes: {reply.LikeNum}</p>
                <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500 hover:underline">Details</Link>
                {user && user.uid === reply.PostedByID && (
                  <button
                    onClick={() => handleDelete(reply.ReplyID)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Delete
                  </button>
                )}
              </li>
            )
          )
        ) : (
          <p>No replies available.</p>
        )}
      </ul>
    </div>
  );
};

export default ReplyListOfUser;
