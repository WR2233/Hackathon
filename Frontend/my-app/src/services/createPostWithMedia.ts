interface Post_pre {
    Content: string;
    UserID: string;
    VideoURL?: string;
    ImgURL?: string;
  }

const CreatePostWithMedia = async (content: string, userId: string, url: string, mediatype: string ) => {
    let postData: Post_pre = {
        Content: content,
        UserID: userId,
      };

    
    if (mediatype === "video") {
    postData.VideoURL = url;
    } else if (mediatype === "image") {
    postData.ImgURL = url;
    } else {
    throw new Error("Unsupported media type");
    }
    
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
  
export default CreatePostWithMedia