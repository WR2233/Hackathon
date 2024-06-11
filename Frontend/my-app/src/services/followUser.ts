
var url = process.env.REACT_APP_API_URL as string
//num=0 follow, num=1 unfollow
export const FollowUser = async (uid: string, num: number) => {
    try {
      const response = await fetch(`${url}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({uid, num})
      });

      if (!response.ok) {
        throw new Error("Failed to (Un)follow user");
      }

      // フォロー成功のフィードバックをユーザーに通知する処理を追加できます
      alert("(Un)Followed successfully!");
    } catch (error) {
      console.error("Error (Un)following user:", error);
      alert("Failed to (Un)follow user");
    }
  };