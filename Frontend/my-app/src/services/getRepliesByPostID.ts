import {Reply} from "../model/models"

const getRepliesByPost = async (postID: string | number): Promise<Reply[]> => {
    const url = process.env.REACT_APP_API_URL;
    const response = await fetch(`${url}/getreplies?pid=${postID}`);
    if (!response.ok) {
        throw new Error("Failed to fetch replies");
    }
    var data: Reply[] = await response.json();
    if (data === null ) {
        data = []
    }
    return data;
};

export default getRepliesByPost;
