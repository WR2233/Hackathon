import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, Reply } from "../model/models"


type ConversationItem = Post | Reply;

const ShowTalk: React.FC = () => {
    const { replyId } = useParams<{ replyId: string }>();
    const [posts, setPosts] = useState<(Post | Reply)[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [mainReply, setMainReply] = useState<Reply | null>(null);
    const url = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (!replyId) {
            setError(new Error("Reply ID is undefined"));
            setLoading(false);
            return;
        }

        const fetchConversation = async () => {
            try {
                const response = await fetch(url + `/gettalk?rid=${replyId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data: ConversationItem[] = await response.json(); // JSONとして解析
                console.log(data)
                // 親とmainリプライと子に分ける
                const postsData: (Post | Reply)[] = [];
                const repliesData: Reply[] = [];
                let mainReplyData: Reply | null = null;
                
                var IsScanedMain =0
                data.forEach(item => {
                    if ((item as Reply).ReplyID === parseInt(replyId)) {
                        mainReplyData = item as Reply; 
                        IsScanedMain = 1 
                    } else if (IsScanedMain == 0 && (item as Post).PostID !== undefined) {
                        postsData.push(item as Post);
                    } else if (IsScanedMain ==0){
                        postsData.push(item as Reply);
                    } else {
                        repliesData.push(item as Reply)
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
    }, [replyId]);

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
                    <div key={index} className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{post.UserName}</h3>
                        <p>{post.Content}</p>
                        <p>Replied At: {new Date(post.PostedAt).toLocaleString()}</p>
                        <p>{post.Edited ? "Edited" : ""}</p>
                        {post.PostID!==undefined && (
                             <Link to={`/post/${post.PostID}`} className="text-blue-500">
                             To Post detail
                            </Link>
                        )}
                        {post.ReplyID !== undefined && (
                         <Link to={`/reply/${post.ReplyID}`} className="text-blue-500">
                         To Reply detail
                        </Link>
                    )}
                       
                    </div>
                    ))}
                </div>
            </div>
            {mainReply && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Main Reply</h2>
                    <div className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{mainReply.UserName}</h3>
                        <p>{mainReply.Content}</p>
                        <p>Replied At: {new Date(mainReply.PostedAt).toLocaleString()}</p>
                        <p>{mainReply.Edited ? "Edited" : ""}</p>
                        <Link to={`/reply/${mainReply.ReplyID}`} className="text-blue-500">
                            To Reply detail
                        </Link>
                    </div>
                </div>
            )}
            <div>
                <h2 className="text-xl font-bold mb-4">Replies</h2>
                <div className="space-y-4">
                    {replies.map((reply) => (
                        <div key={reply.ReplyID} className="p-4 border rounded-lg shadow-md">
                            <span className="text-sm text-gray-600">{reply.UserName}</span>
                            <p>{reply.Content}</p>
                            <p>Replied At: {new Date(reply.PostedAt).toLocaleString()}</p>
                            <p>{reply.Edited ? "Edited" : ""}</p>
                            <Link to={`/reply/${reply.ReplyID}`} className="text-blue-500">
                            To Reply detail
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowTalk;
