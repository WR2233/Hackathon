import { useState, useEffect } from "react";

const fetchLikeNum = async (postID: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/getlikenum?pid=${postID}`);
    if (!response.ok) {
      throw new Error("Failed to fetch like count");
    }
    const count = await response.json();
    if (count==-1) {
        console.error("Error fetching like count: -1");
    }
    return count;
  } catch (error) {
    console.error("Error fetching like count:", error);
    return null;
  }
};

export default fetchLikeNum;
