import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts"
import CreateReply from "../services/CreateReply.ts"
import getRepliesByPost from "../services/getRepliesByPostID.ts";
import { Post, Reply } from "../model/models.ts"
import { getLikeStatus } from "../services/getLikeStatus.ts";
import Linkify from "linkify-react";
import ReactPlayer from "react-player"

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
  const url = process.env.REACT_APP_API_URL;
  const linkifyOptions = {
    className: "text-blue-400",
};

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${url}/getpost?pid=${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data: Post = await response.json();
        console.log(data)
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

    const fetchLikeStatus = async () => {
      if (postId && user) {
        var likestatus = await getLikeStatus(postId, user.uid, true)
      setLiked(likestatus)
      }

    }

    fetchPostDetail();
    fetchLikeStatus();
    fetchLikeCount();
    fetchReplies();
  }, [postId, url]);

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

  if (!postId || !post) {
    return <div>Loading...</div>;
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
    try {
      const pidNum = parseInt(postId);
      if (isNaN(pidNum)) {
        console.error("Post ID is not a number");
        return;
      }
      const replyID = await CreateReply(pidNum, user.uid, replyContent, true);
      setReplyContent("");
      setReplyFormVisible(false);
      navigate(`/reply/${replyID}`);
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
      <div>
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
          (post.DeletedUser ? <div>deleted User</div> :((deleted ? <div>deleted Post</div>:(
          <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
          <div className="mb-4">
            <img src={post.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto" />
          </div>
          <Linkify as="p" options={linkifyOptions}>
                {post.Content}
          </Linkify>
          <p className="text-sm text-gray-500">Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
          <p className="text-sm text-gray-500">User Name: {post.UserName}</p>
          <p className="text-sm text-gray-500">{post.Edited ? "Edited" : "Not Edited"}</p>
          {post.Video ? <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />:<></> }
          {post.ImgPost ? <img src={post.ImgPost} alt="Img of Post" />: <></>}
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
          )}))
          <div className="mt-6">
            <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">Back to Timeline</Link>
            <Link to={`/profiles?uid=${post.UserID}`} className="text-blue-500 hover:text-blue-700">View User Profile</Link>
          </div>))
          <h2 className="text-xl font-semibold mt-8">Replies</h2>
          {replies.length > 0 ? (
            <ul className="mt-4">
              {replies.map((reply) => (
                (reply.DeletedUser ? ( 
                  <div>
                    <p>deleted User</p>
                  </div>): ((reply.Deleted ? <div>deleted reply</div>:
                <li key={reply.ReplyID} className="mb-6 border-b pb-4">
                  <img src={post.Img} alt="User profile" className="w-12 h-12 rounded-full object-cover mr-4" />
                  <Linkify as="p" options={linkifyOptions}>
                    {reply.Content}
                  </Linkify>
                  {reply.Video ? <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />:<></> }
                  {reply.ImgPost ? <img src={post.ImgPost} alt="Img of Post" />: <></>}
                  <p className="text-sm text-gray-500">Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">User Name: {reply.UserName}</p>
                  <p className="text-sm text-gray-500">{reply.Edited ? "Edited" : "Not Edited"}</p>
                  <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500 hover:text-blue-700">View Reply Detail</Link>
                  <p>
                  <Link to={`/showtalk/${reply.ReplyID}`} className="text-blue-500 hover:text-blue-700">See Talk</Link>
                  </p>
                </li>
              )))))}
            </ul>
          ) : (
            <p>No replies yet</p>
          )}
        </div>;
      </div>
    )
  }

export default PostDetail;
