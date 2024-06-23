import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, Reply } from "../model/models";
import Linkify from "linkify-react";
import ReactPlayer from 'react-player';

type ConversationItem = Post | Reply;

const ShowTalk: React.FC = () => {
    const { replyId } = useParams<{ replyId: string }>();
    const [posts, setPosts] = useState<ConversationItem[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [mainReply, setMainReply] = useState<Reply | null>(null);
    const url = process.env.REACT_APP_API_URL;
    const linkifyOptions = {
        className: "text-blue-400",
    };

    useEffect(() => {
        if (!replyId) {
            setError(new Error("Reply ID is undefined"));
            setLoading(false);
            return;
        }

        const fetchConversation = async () => {
            try {
                const response = await fetch(`${url}/gettalk?rid=${replyId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data: ConversationItem[] = await response.json();
                const postsData: ConversationItem[] = [];
                const repliesData: Reply[] = [];
                let mainReplyData: Reply | null = null;

                let isMainReplyScanned = false;
                data.forEach(item => {
                    if (item.ReplyID !== null && item.ReplyID === parseInt(replyId)) {
                        mainReplyData = item as Reply;
                        isMainReplyScanned = true;
                    } else if (!isMainReplyScanned && item.PostID !== null) {
                        postsData.push(item as Post);
                    } else if (!isMainReplyScanned && item.PostID === null) {
                        postsData.push(item as Reply);
                    } else {
                        repliesData.push(item as Reply);
                    }
                });

                setPosts(postsData);
                setReplies(repliesData);
                setMainReply(mainReplyData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversation();
    }, [replyId, url]);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Parent Posts</h2>
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        (!post.Deleted && !post.DeletedUser ? (
                            <div key={index} className="p-4 border rounded-lg shadow-md">
                                <div className="flex">
                                    <div>
                                        <img src={post.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto flex-1" />
                                    </div>
                                    <h3 className="text-lg font-semibold flex-2 mx-10">{post.UserName}</h3>
                                </div>
                                <Linkify as="p" className="" options={linkifyOptions}>
                                    {post.Content}
                                </Linkify>
                                {post.Video && <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />}
                                {post.ImgPost && <img src={post.ImgPost} alt="Img of Post" />}
                                <p>Replied At: {new Date(post.PostedAt).toLocaleString()}</p>
                                {post.Edited===true ? <p>Edited</p>: <></>}
                                {post.PostID && <Link to={`/post/${post.PostID}`} className="text-blue-500">To Post detail</Link>}
                                {post.PostID &&<Link to={`/profiles?uid=${post.UserID}`} className="text-blue-500 mx-4"> To Profile</Link>}

                                {post.ReplyID && <Link to={`/reply/${post.ReplyID}`} className="text-blue-500">To Reply detail</Link>}
                                {post.ReplyID && <Link to={`/profiles?uid=${post.PostedByID}`} className="text-blue-500 mx-4"> To Profile</Link>}
                            </div>): <p key={index}>deleted post</p>)))}
                </div>
            </div>
            {mainReply && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Main Reply</h2>
                    <div className="p-4 border rounded-lg shadow-md">
                        <div className="flex">
                            <div>
                                <img src={mainReply.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold mx-10">{mainReply.UserName}</h3>
                        </div>
                        <Linkify as="p" options={linkifyOptions}>
                            {mainReply.Content}
                        </Linkify>
                        {mainReply.Video && <ReactPlayer url={mainReply.Video} controls={true} width="100%" height="100%" />}
                        {mainReply.ImgPost && <img src={mainReply.ImgPost} alt="Img of Post" />}
                        <p>Replied At: {new Date(mainReply.PostedAt).toLocaleString()}</p>
                        <Link to={`/reply/${mainReply.ReplyID}`} className="text-blue-500">To Reply detail</Link>
                        <Link to={`/profiles?uid=${mainReply.PostedByID}`} className="text-blue-500 mx-4"> To Profile</Link>
                    </div>
                </div>
            )}
            <div>
                <h2 className="text-xl font-bold mb-4">Replies</h2>
                <div className="space-y-4">
                    {replies.map((reply) => (
                        !reply.Deleted && !reply.DeletedUser &&
                            <div key={reply.ReplyID} className="p-4 border rounded-lg shadow-md">
                                <div className="flex">
                                    <div>
                                        <img src={reply.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto" />
                                    </div>
                                    <h3 className="text-lg font-semibold mx-10">{reply.UserName}</h3>
                                </div>
                                <Linkify as="p" options={linkifyOptions}>
                                    {reply.Content}
                                </Linkify>
                                {reply.Video && <ReactPlayer url={reply.Video} controls={true} width="100%" height="100%" />}
                                {reply.ImgPost && <img src={reply.ImgPost} alt="Img of Post" />}
                                <p>Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
                                {reply.Edited===true && <p>Edited</p>}
                                <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500">To Reply detail</Link>
                                <Link to={`/profiles?uid=${reply.PostedByID}`} className="text-blue-500 mx-4"> To Profile</Link>
                                <Link to={`/showtalk/${reply.ReplyID}`} className="text-blue-500 mx-4"> See Talk</Link>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowTalk;
