import {Reply} from "../model/models"

const getReplyByID = async (replyId: number) => {
  const url = process.env.REACT_APP_API_URL ;
    try {
      const response = await fetch(url + `/getreply?rid=${replyId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reply");
      }
      const data: Reply = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching post:", error);
    }

}

export default getReplyByID;