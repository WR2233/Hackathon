//未使用 ロード時に色に反映させる用
const getFollowStatus = async (followedToID: string, followedByID: string): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_URL}/followstatus`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedToId: followedToID, followedById: followedByID }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch follow status");
    }

    const result = await response.json();
    return result.isFollowing;
};

export default getFollowStatus;
