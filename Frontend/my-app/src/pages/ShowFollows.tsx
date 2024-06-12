import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FollowerList from "../page-component/FollowerList.tsx"; // フォロワーリストコンポーネントのインポート
import FollowingList from "../page-component/FollowingList.tsx"; // フォローイングリストコンポーネントのインポート

const ShowFollows = () => {
  const [activeTab, setActiveTab] = useState("followers"); // 初期値としてフォロワータブを選択
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get("uid");

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Follows</h1>
      <div className="flex">
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "followers" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`flex-1 py-2 px-4 ${
            activeTab === "following" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

      {activeTab === "followers" && <FollowerList />}
      {activeTab === "following" && <FollowingList />}
    </div>
  );
};

export default ShowFollows;
