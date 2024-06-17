import React, { useState, useEffect } from 'react';

const ShowTalk = ({ replyID }) => {
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(`/conversation?replyID=${replyID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setConversation(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversation();
    }, [replyID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {conversation.map((item, index) => (
                <div key={index} className="conversation-item">
                    <h3>{item.UserName}</h3>
                    <p>{item.Content}</p>
                    <span>{item.PostedAt}</span>
                </div>
            ))}
        </div>
    );
};

export default ShowTalk;
