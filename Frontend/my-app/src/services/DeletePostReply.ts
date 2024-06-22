const DeletePostReply = async (postreplyID: number, IsPost: boolean) => {
    const url = process.env.REACT_APP_API_URL + "/deletepostreply";
    
    const payload = {
      PostReplyID: postreplyID,
      IsPost: IsPost
    };
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete post or reply: ' + response.statusText);
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export default DeletePostReply;