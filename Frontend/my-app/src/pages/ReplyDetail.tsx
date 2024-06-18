import React, {useEffect, useState} from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts"
import CreateReply from "../services/CreateReply.ts"
import { Reply } from "../model/models.ts"
import getReplyByID from "../services/getReplyByID.ts";

const ReplyDetail: React.FC = () => {
  const { replyId } = useParams<{ replyId: string }>();
  const [reply, setReply] = useState<Reply | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [user] = useAuthState(fireAuth);
  const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const navigate = useNavigate();
  
  var url = process.env.REACT_APP_API_URL ;
  
  useEffect(() => {
    const fetchReplydetail = async () => {
      if (replyId) {
        const replyData = await getReplyByID(parseInt(replyId));
        if (replyData) {
          setReply(replyData);
        }
        if (!replyData) {
          setReply(null);
        }
      }
    };
    const fetchLikeCount = async () => {
      if (replyId) {
        const likeData = await fetchLikeNum(replyId, false);
        if (likeData) {
          setLikeCount(likeData);
        }
        if (!likeData) {
          setLikeCount(0);
        }
      }
    };
    if (replyId) {
      fetchReplydetail();
    }
    fetchLikeCount();
  }, [replyId]);

  if (!user) {
    return(
      <div>
        <h1>you have to log in At first</h1>
      </div>)
  }

  if (!replyId) {
    return <div>reply ID is not provided</div>;
  }
  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      const newLikedStatus = await toggleLike(replyId!, user.uid, false);
      setLiked(newLikedStatus);
      const likeCount = await fetchLikeNum(replyId!, false);
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
    const pidNum = parseInt(replyId);
    if (isNaN(pidNum)) {
      console.error("reply ID is not a number");
      return;
    }
    // フォームからの入力を使用してリプライを作成する
    const replyID = await CreateReply (pidNum, user.uid, replyContent, false);

    // リプライが成功裏に作成されたら、フォームを非表示にする
    setReplyContent("");
    setReplyFormVisible(false);

    navigate("/reply/" + replyID)
    }catch (error) {
        console.error("Error creating reply:", error);
  }}
  
  if (!reply) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Reply Detail</h1>
        <li key={reply.ReplyID} className="mb-4">
            <p>{reply.Content}</p>
            <p>Replyed At: {new Date(reply.PostedAt).toLocaleString()}</p>
            <p>User Name: {reply.UserName}</p>
            <p>{reply.Edited ? "Edited" : "Not Edited"}</p>
            <p>Likes: {likeCount !== null ? likeCount : "Loading..."}</p>
            <button
          onClick={handleLikeToggle}
          className={`block bg-${liked ? 'red' : 'green'}-500 hover:bg-${liked ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
        >
          {liked ? 'Unlike' : 'Like'}
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
            <Link to="/" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                back to TimeLine
            </Link>
            <Link to={`/profiles?uid=${reply.UserID}`} className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View User Profile
            </Link>
            <Link to={`/showtalk/${reply.ReplyID}`} className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
             Watch Talk
            </Link>
        </li>
    </div>
  );
}

export default ReplyDetail
