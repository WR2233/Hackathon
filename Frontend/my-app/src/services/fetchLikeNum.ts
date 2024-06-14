import { useState, useEffect } from "react";

const fetchLikeNum = async (postreplyID: string, IsPost: boolean) => {
  if (IsPost){
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getlikenum?pid=${postreplyID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch like count");
      }
      const count = await response.json();
      return count;
    } catch (error) {
      console.error("Error fetching like count:", error);
      return null;
    }
  } else{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getlikenum?rid=${postreplyID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch like count");
      }
      const count = await response.json();
      return count;
    } catch (error) {
      console.error("Error fetching like count:", error);
      return null;
    }
  }
  
};

export default fetchLikeNum;
