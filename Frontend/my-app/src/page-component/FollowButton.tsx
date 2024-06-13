import React, { useState } from "react";
import { toggleFollow } from "../services/toggleFollow.ts";

interface FollowToggleProps {
    userID: string;
}

const FollowToggle: React.FC<FollowToggleProps> = ({ userID }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const handleFollowToggle = async () => {
        if (!user) return;
    
        try {
          const newLikedStatus = await toggleFollow(FollowedToId!, user.uid);
          setIsFollowing(new);
        } catch (error) {
          console.error("Error toggle follow:", error);
        }
      };

    return (
        <button
            onClick={handleFollowToggle}
            className={`block ${isFollowing ? "bg-red-500" : "bg-green-500"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowToggle;
