import {Post} from "../model/models"

const getPostByUserID = async (uid: string) => {
    var url = process.env.REACT_APP_API_URL ;
    try {
      const response = await fetch(url + `/getpostsbyuserid?uid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data: Post[] = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
};

export default getPostByUserID;