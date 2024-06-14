import {Post} from "../model/models"

const getPostByID = async (postId : number) => {
    var url = process.env.REACT_APP_API_URL ;
    try {
      const response = await fetch(url + `/getpost?pid=${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data: Post = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching post:", error);
    }
};

export default getPostByID;