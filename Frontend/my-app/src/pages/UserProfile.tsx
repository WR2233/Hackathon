import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import {FollowUser} from "../services/followUser"

interface UserProfile {
  UserID: string;
  UserName: string;
  DeletedUser: boolean;
  // 他のユーザープロフィール情報をここに追加
}

// クエリパラメータ取得
const getQueryParams = (query: string) => {
  return new URLSearchParams(query);
};

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const queryParams = getQueryParams(location.search);
        const userID = queryParams.get("uid"); // ここでクエリパラメータを取得

        if (!userID) {
          throw new Error("User ID is missing");
        }

        const response = await fetch(`${url}/getuser?uid=${userID}`);
        console.log(`${url}/getuser?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data: UserProfile = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [location.search, url]);

  const FollowHandle = () => {
    const queryParams = getQueryParams(location.search);
    const userID = queryParams.get("uid"); // ここでクエリパラメータを取得

    if (!userID) {
      throw new Error("User ID is missing");
    }

    FollowUser(userID, 0)
  }

  const UnFollowHandle = () => {
    const queryParams = getQueryParams(location.search);
    const userID = queryParams.get("uid"); // ここでクエリパラメータを取得

    if (!userID) {
      throw new Error("User ID is missing");
    }

    FollowUser(userID, 1)
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p>User ID: {userProfile.UserID}</p>
      <p>User Name: {userProfile.UserName}</p>
      <p>Deleted User: {userProfile.DeletedUser ? "Yes" : "No"}</p>
      {/* 他のユーザープロフィール情報をここに追加します */}
      <button
        onClick={() => navigate(-1)}
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Go Back
      </button>

      <button
        onClick={FollowHandle}
        className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Follow
      </button>

      <button
        onClick={UnFollowHandle}
        className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Follow
      </button>
    </div>
  );
};

export default UserProfile;
