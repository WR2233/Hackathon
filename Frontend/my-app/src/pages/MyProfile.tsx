import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { useNavigate, useLocation } from "react-router-dom";
import Settings from "../page-component/settings.tsx";
import { Profile } from "../model/models.ts";
import PostListOfUser from "../page-component/PostListOfUser.tsx";
import ReplyListOfUser from "../page-component/ReplyListOfUser.tsx";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(fireAuth);
  const url = process.env.REACT_APP_API_URL;
  const [profile, setProfile] = useState<Profile | null>(null); // ステート変数の名前をprofileに変更
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("post")

  useEffect(() => {
    const fetchMyProfile = async () => {
      if (!user) {
        navigate("/login");
        return
      }
      try {
        const response = await fetch(`${url}/getuser?uid=${user.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data: Profile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchMyProfile();
    }
  }, [location.search, url, user, loading, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {user ? (
        <div>
        </div>
      ) : (
        <p>Please sign in to see your profile.</p>
      )}

      {profile && ( // プロフィールがnullでないことを確認
        <>
         {profile.Img && (
        <div>
          <img src={profile.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mx-auto"/>
        </div>
      )}
          <p>User Name: {profile.UserName}</p>
          <p>Deleted User: {profile.DeletedUser ? "Yes" : "No"}</p>
        </>
      )}
      
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md m-4 hover:bg-blue-300"
      >
        Back
      </button>

      <Settings />
      <div className="flex">
        <button
          className={`flex-1 py-2 px-4 mt-4 ${
            activeTab === "post" ? "bg-blue-500 hover:bg-blue-300" : "bg-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Posts
        </button>
        <button
          className={`flex-1 py-2 px-4 mt-4 ${
            activeTab === "reply" ? "bg-blue-500 hover:bg-blue-300" : "bg-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("reply")}
        >
          Replies
        </button>
      </div>

      {activeTab === "post" && <PostListOfUser uid={profile?.UserID}/>}
      {activeTab === "reply" && <ReplyListOfUser uid={profile?.UserID} />}
    </div>
  );
};

export default MyProfile;
