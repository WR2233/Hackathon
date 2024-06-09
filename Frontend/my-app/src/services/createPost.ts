interface Post_pre {
    Content: string;
    PostedAt: string;
    UserID: string;
  }

export const createPost = async (content: string, userId: string) => {
    const postData: Post_pre = {
        Content: content,
        PostedAt: new Date().toISOString(), // 投稿日時を取得して設定する例
        UserID: userId, // ユーザーIDを数値に変換する例
      };
    const response = await fetch('http://localhost:8000/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  
    return response.json();
  };
  
  