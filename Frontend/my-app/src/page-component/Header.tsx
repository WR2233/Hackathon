import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { useNavigate, Link } from "react-router-dom";
import { Profile } from "../model/models";

const Header: React.FC = () => {
  const [user, loading] = useAuthState(fireAuth);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
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
  }, [url, user, loading, navigate]);

  const userName = profile ? profile.UserName : "Guest";

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {profile && (
          <img
            src={profile.Img}
            alt="User Icon"
            className="w-10 h-10 rounded-full"
          />
        )}
        <span className="font-semibold text-lg">{userName}</span>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="text-blue-300 hover:text-white">
          Home
        </Link>
        <Link to="/profile" className="text-blue-300 hover:text-white">
          My Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
