import {Reply} from "../model/models"

const getRepliesByUserID = async (uid: string) => {
    var url = process.env.REACT_APP_API_URL ;
    try {
      const response = await fetch(url + `/getrepliesbyuserid?uid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reply");
      }
      const data: Reply[] = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
};

export default getRepliesByUserID;