const createReply = async (post_reply_ID :number, userID :string, content: string, ToPost: boolean)=> {
    var url = process.env.REACT_APP_API_URL + "/createreply" ;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PostReplyID: post_reply_ID,
                Content: content,
                UserID: userID,
                IsToPost: ToPost
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create reply');
        }

        // レスポンスが成功した場合、JSONを解析してreplyIDを取得する
        const responseData = await response.json();
    
        const replyId = responseData.replyID;

        // replyIDを返す
        return replyId;
    } catch (error) {
        console.error('Error creating reply:', error);
    }

};

export default createReply;