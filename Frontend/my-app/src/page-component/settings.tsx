import React, { useEffect, useState } from "react";
import { updateUserName, deleteUser } from "../services/userServices.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth, storage } from "../services/firebase.ts";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import saveImageUrl from "../services/postImage.ts";

const Settings: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const [newUserName, setNewUserName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 画像のプレビュー用
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdateUserName = async () => {
    if (!user) return;
    if (!newUserName) {
      alert("名前を入力してください");
      return;
    }
    try {
      await updateUserName(user.uid, newUserName);
      setIsUpdated(true);
      alert("User name updated successfully");
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // 画像のプレビュー用URL生成
    }
  };

  const handleImageUpload = async () => {
    if (!image || !user) {
      alert("画像ファイルを添付してください")
      return;
    }
    const acceptedImageTypes = ["image/jpeg", "image/png"];
    if (!acceptedImageTypes.includes(image.type)) {
      alert("画像ファイルを添付してください");
      return;
    }
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(uploadTask.ref);

      await saveImageUrl(url, user.uid); // 画像のURLをデータベースに保存
      setIsUpdated(true)
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

  useEffect(() => {
    if (isUpdated) {
      // 更新されたらリロードして状態をリセット
      window.location.reload();
    }
  }, [isUpdated]);

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
      <div className="mb-4">
        <input type="file" onChange={handleImageChange} />
        {image && 
        <div>
          <p>preview</p>
          {imagePreview &&
          <img src={imagePreview} alt="Selected" className="w-20 h-20 rounded-full" />}
        </div>}
        <button onClick={handleImageUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
          Upload Image
        </button>
      </div>
      <div>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default Settings;
