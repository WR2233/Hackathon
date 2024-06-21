import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import FollowButton from "../page-component/FollowButton.tsx";
import { Profile } from "../model/models.ts";
import PostListOfUser from "../page-component/PostListOfUser.tsx";

const getQueryParams = (query: string) => {
  return new URLSearchParams(query);
};

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(fireAuth);
  const queryParams = getQueryParams(location.search);
  const userID = queryParams.get("uid");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userID) {
          throw new Error("User ID is missing");
        }

        if (user && userID === user.uid) {
          navigate("/profile");
          return;
        }

        const response = await fetch(`${url}/getuser?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data: Profile = await response.json();
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
  if (userProfile.DeletedUser){
    return (
      <div>
        <p>deleted User</p>
      </div>
    )
  }
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        {userProfile.Img && <img src={userProfile.Img} alt="User profile" className="w-20 h-20 rounded-md" />}
      </div>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="mb-2">User Name: {userProfile.UserName}</p>
      
      {user && (
        <FollowButton followedToID={userID!} />
      )}
      <Link to={`/followlist?uid=${userID}`} className="block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
        View Following and Followers
      </Link>
      <button
        onClick={() => navigate(-1)}
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Go Back
      </button>
      <PostListOfUser uid={userID}/>
    </div>
  );
};

export default UserProfile;
