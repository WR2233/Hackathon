interface Post_pre {
    Content: string;
    UserID: string;
  }

export const createPost = async (content: string, userId: string) => {
    const postData: Post_pre = {
        Content: content,
        UserID: userId,
      };
    var url = process.env.REACT_APP_API_URL as string
    const response = await fetch(url + '/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  
    // サーバーからのレスポンスを JSON 形式で取得
    const responseData = await response.json();

    // レスポンスデータから投稿IDを取得
    const postId = responseData.postID;
    
    return postId
  };
  
  