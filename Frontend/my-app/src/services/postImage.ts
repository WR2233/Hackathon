const saveImageUrl = async (imageUrl: string, uid: string) => {
    const apiUrl = process.env.REACT_APP_API_URL as string; // 修正: 変数名を変更して上書きを防止
    const response = await fetch(`${apiUrl}/postimage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: imageUrl, uid: uid }), // 修正: JSON ボディの作成
    });
  
    if (!response.ok) {
      throw new Error('Failed to post image');
    }
  
    return response.json();
  };
  
  export default saveImageUrl;
  