import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import {FollowUser} from "../services/followUser.ts"
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

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
  const [user, loading, error] = useAuthState(fireAuth);

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

    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [location.search, url, user, loading, navigate]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const FollowHandle = () => {
    const queryParams = getQueryParams(location.search);
    const FollowedToID = queryParams.get("uid"); // ここでクエリパラメータを取得
    if (!user) {
        console.error("Error fetch user from auth:", error)
        return 
    }
    const FollowedByID = user.uid
    if (!FollowedToID) {
      throw new Error("User ID is missing");
    }

    FollowUser(FollowedToID, FollowedByID, 0)
  }
  const UnFollowHandle = () => {
    const queryParams = getQueryParams(location.search);
    const FollowedToID = queryParams.get("uid"); // ここでクエリパラメータを取得
    if (!user) {
        console.error("Error fetch user from auth:", error)
        return 
    }
    const FollowedByID = user.uid
    if (!FollowedToID) {
      throw new Error("User ID is missing");
    }

    FollowUser(FollowedToID, FollowedByID, 1)
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
        UnFollow
      </button>
    </div>
  );
};

export default UserProfile;
