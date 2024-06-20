import React, { useState } from "react";
import { updateUserName, deleteUser } from "../services/userServices.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth, storage } from "../services/firebase.ts";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import saveImageUrl from "../services/postImage.ts";

const Settings: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const [newUserName, setNewUserName] = useState<string>("");
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  const handleUpdateUserName = async () => {
    if (!user) return;
    try {
      await updateUserName(user.uid, newUserName);
      alert("User name updated successfully");
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image || !user) return; // 修正: ユーザーが存在しない場合を考慮
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(uploadTask.ref);

      await saveImageUrl(url, user.uid); // 画像のURLをデータベースに保存
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    try {
      await user.delete();
      await deleteUser(user.uid);
      alert("User deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700">New User Name:</label>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter new user name"
        />
        <button
          onClick={handleUpdateUserName}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Update User Name
        </button>
      </div>
      <div>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete User
        </button>

        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>
    </div>
  );
};

export default Settings;
