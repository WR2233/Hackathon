interface User_pre {
    UserName: string 
    UserID: string 
}

export const createUser = async (username: string, userId: string) => {
    const userData: User_pre = {
        UserName: username,
        UserID: userId,
      };
    var url = process.env.REACT_APP_API_URL as string
    const response = await fetch(url + '/createuser ', {
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
  
  