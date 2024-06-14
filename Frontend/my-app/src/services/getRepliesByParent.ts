import { Reply } from "../model/models";

const getRepliesByParent = async (parentId: number, isToPost: boolean): Promise<Reply[]> => {
  const url = process.env.REACT_APP_API_URL ;
  try {
    const response = await fetch(`${url}/replies?parentId=${parentId}&isToPost=${isToPost}`);
    if (!response.ok) {
      throw new Error("Failed to fetch replies");
    }
    const data: Reply[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching replies:", error);
    return [];
  }
};

export default getRepliesByParent;
