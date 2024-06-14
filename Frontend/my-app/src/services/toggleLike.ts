export const toggleLike = async (postreplyID: string, userID: string, IsPost: boolean): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_URL}/likedby`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postreplyID, userID, IsPost }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }
    const data = await response.json();
    return data.liked;
  };
  
  