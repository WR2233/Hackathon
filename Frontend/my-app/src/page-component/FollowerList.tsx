import React, { useEffect, useState } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

interface UserProfile {
  UserID: string;
  UserName: string;
  DeletedUser: boolean;
  // 他のユーザープロフィール情報をここに追加
}

const getQueryParams = (query: string) => {
  return new URLSearchParams(query);
};

const FollowersList: React.FC = () => {
  const [followerList, setFollowerList] = useState<UserProfile[]>([]);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(fireAuth);

  useEffect(() => {
    const fetchFollowerList = async () => {
      try {
        const queryParams = getQueryParams(location.search);
        const userID = queryParams.get("uid"); // ここでクエリパラメータを取得

        if (!userID) {
          throw new Error("User ID is missing");
        }

        const response = await fetch(`${url}/getfollowers?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch followers list");
        }
        const data: UserProfile[] = await response.json();
        setFollowerList(data);
      } catch (error) {
        console.error("Error fetching followers list:", error);
      }
    };

    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchFollowerList();
    }
  }, [location.search, url, user, loading, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Follower List</h1>
      <button
        onClick={() => navigate(-1)}
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Go Back
      </button>
      <ul>
        {followerList && followerList.length > 0 ? (
          followerList.map((follower) => (
            <li key={follower.UserID}>
              <Link to={`/userprofile?uid=${follower.UserID}`}>
                {follower.UserName}
              </Link>
            </li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>
    </div>
  );
};

export default FollowersList;
