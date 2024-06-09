

export const createPost = async (content: string) => {
    const response = await fetch('http://localhost:8080/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
  
    return response.json();
  };
  
  