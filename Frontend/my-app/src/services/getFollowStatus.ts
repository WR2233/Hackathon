
export const getLikeStatus = async (FollowingID: string, FollowedByID :string): Promise<boolean> =>{
    const url = `${process.env.REACT_APP_API_URL}/followstatus`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({FollowingID, FollowedByID}),
      });
      if (!response.ok) {
        throw new Error("Failed to get follow status");
      }
      const data = await response.json();
    return data.followed
}
  