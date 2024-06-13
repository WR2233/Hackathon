const toggleFollow = async (followedToID: string, followedByID: string): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_URL}/followedby`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedToId: followedToID, followedById: followedByID }),
    });

    if (!response.ok) {
        throw new Error("Failed to toggle follow");
    }

    const result = await response.json();
    return result.followed;
};

export default toggleFollow;
