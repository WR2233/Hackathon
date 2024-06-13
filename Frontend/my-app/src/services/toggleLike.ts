export const toggleLike = async (postID: string, userID: string): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_URL}/likedby`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postID, userID }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }
    const data = await response.json();
    return data.liked;
  };
  
  