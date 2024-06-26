
export const getLikeStatus = async (postreplyID: string, UserID :string,  Ispost: boolean): Promise<boolean> =>{
    const url = `${process.env.REACT_APP_API_URL}/likestatus`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postreplyID, UserID, Ispost }),
      });
      if (!response.ok) {
        throw new Error("Failed to get like status");
      }
      const data = await response.json();
    return data.liked
}
  