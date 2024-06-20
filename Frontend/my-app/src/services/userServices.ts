
export const updateUserName = async (uid: string, newUserName: string) => {
  const url = `${process.env.REACT_APP_API_URL}/updateuser`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, new_name: newUserName }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user name');
    }
  } catch (error) {
    console.error("Error updating user name:", error);
    throw error;
  }
};

export const deleteUser = async (uid: string) => {
  const url = `${process.env.REACT_APP_API_URL}/deleteuser`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};