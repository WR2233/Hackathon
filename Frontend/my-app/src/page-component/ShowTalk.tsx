import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Post, Reply } from "../model/models";
import getPostByID from "../services/getPostByID.ts";
import getReplyByID from "../services/getReplyByID.ts";
import getRepliesByParentID from "../services/getRepliesByParentID.ts";

const ShowTalk: React.FC = () => {
  const { replyId } = useParams<{ replyId: string }>();
  const [reply, setReply] = useState<Reply | null>(null);
  const [parent, setParent] = useState<Post | Reply | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  
  useEffect(() => {
    const fetchReplyDetails = async () => {
      if (!replyId) return;
      const replyDetails = await getReplyByID(Number(replyId));
      setReply(replyDetails);

      if (replyDetails.IsToPost) {
        const parentPost = await getPostByID(replyDetails.PostReplayID);
        setParent(parentPost);
      } else {
        const parentReply = await getReplyByID(replyDetails.PostReplayID);
        setParent(parentReply);
      }

      const childReplies = await getRepliesByParentID(replyDetails.ReplyID, false);
      setReplies(childReplies);
    };

    fetchReplyDetails();
  }, [replyId]);

  if (!reply) return <div>Loading...</div>;

  const renderReplies = (replies: Reply[]) => {
    return replies.map(reply => (
      <li key={reply.ReplyID}>
        <p>{reply.Content}</p>
        <p>Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
        <p>User Name: {reply.UserName}</p>
        <p>{reply.Edited ? "Edited" : "Not Edited"}</p>
        <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500">View Reply</Link>
        {replies.length > 0 && (
          <ul>
            {renderReplies(replies)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      <h1>Reply Detail</h1>
      <p>{reply.Content}</p>
      <p>Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
      <p>User Name: {reply.UserName}</p>
      <p>{reply.Edited ? "Edited" : "Not Edited"}</p>

      {parent && (
        <>
          <h2>Parent</h2>
          {reply.IsToPost ? (
            <>
              <p>{(parent as Post).Content}</p>
              <Link to={`/posts/${(parent as Post).PostID}`}>View Post</Link>
            </>
          ) : (
            <>
              <p>{(parent as Reply).Content}</p>
              <Link to={`/reply/${(parent as Reply).ReplyID}`}>View Reply</Link>
            </>
          )}
        </>
      )}

      <h2>Replies</h2>
      <ul>
        {renderReplies(replies)}
      </ul>
    </div>
  );
};

export default ShowTalk;
