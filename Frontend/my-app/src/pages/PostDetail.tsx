// src/pages/PostDetail.tsx
import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import fetchLikeNum from "../services/fetchLikeNum.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { toggleLike } from "../services/toggleLike.ts"
import createReply from "../services/CreateReply.ts"

interface Post{
	PostID :   number
	Content :    string
	PostedAt :   string 
	UserID    :  string 
	Edited     : boolean
	DeletedPost :boolean
	UserName    :string 
	DeletedUser :boolean 
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [user] = useAuthState(fireAuth);
  const [replyFormVisible, setReplyFormVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  
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
        const likeData = await fetchLikeNum(postId);
        if (likeData) {
          setLikeCount(likeData);
        }
        if (!likeData) {
          setLikeCount(0);
        }
      }
    };

    fetchPostDetail();
    fetchLikeCount();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      const newLikedStatus = await toggleLike(postId!, user.uid);
      setLiked(newLikedStatus);
      const likeCount = await fetchLikeNum(postId!);
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
        // フォームからの入力を使用してリプライを作成する
        const response = await createReply (postId, user.uid, replyContent, true);
        console.log("Reply created:", response);
        // リプライが成功裏に作成されたら、フォームを非表示にする
        setReplyContent("");
        setReplyFormVisible(false);
    } catch (error) {
        console.error("Error creating reply:", error);
    }
};


  if (!post) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
        <li key={post.PostID} className="mb-4">
            <p>{post.Content}</p>
            <p>Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
            <p>User Name: {post.UserName}</p>
            <p>{post.Edited ? "Edited" : "Not Edited"}</p>
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
            <Link to={`/profiles?uid=${post.UserID}`} className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View User Profile
            </Link>
        </li>
    </div>
  );
};

export default PostDetail;
