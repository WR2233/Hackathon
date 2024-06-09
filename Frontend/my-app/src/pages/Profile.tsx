// src/pages/Profile.tsx
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.displayName}</p>
        </div>
      ) : (
        <p>Please sign in to see your profile.</p>

      )}
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default Profile;
