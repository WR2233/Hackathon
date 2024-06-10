interface User_pre {
    UserName: string 
    UserID: string 
}

export const createUser = async (username: string, userId: string) => {
    const userData: User_pre = {
        UserName: username,
        UserID: userId,
      };
    console.log(userData)
    const response = await fetch('http://localhost:8000/createuser ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  
    return response.json();
  };
  
  