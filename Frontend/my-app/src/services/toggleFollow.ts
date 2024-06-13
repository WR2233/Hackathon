export const toggleFollow = async (followedToID: string, followedByID: string): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_URL}/followedby`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followedToID, followedByID }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle follow");
    }
    const data = await response.json();
    return data.liked;
  };
  