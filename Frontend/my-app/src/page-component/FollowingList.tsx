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

const FollowingList: React.FC = () => {
  const [followingList, setFollowingList] = useState<UserProfile[]>([]);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(fireAuth);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const queryParams = getQueryParams(location.search);
        const userID = queryParams.get("uid"); // ここでクエリパラメータを取得

        if (!userID) {
          throw new Error("User ID is missing");
        }

        const response = await fetch(`${url}/getfollowing?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch following list");
        }
        const data: UserProfile[] = await response.json();
        setFollowingList(data);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchFollowingList();
    }
  }, [location.search, url, user, loading, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Following List</h1>
      <button
        onClick={() => navigate(-1)}
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Go Back
      </button>
      <ul>
        {followingList && followingList.length > 0 ? (
          followingList.map((following) => (
            <li key={following.UserID}>
              <Link to={`/userprofile?uid=${following.UserID}`}>
                {following.UserName}
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

export default FollowingList;
