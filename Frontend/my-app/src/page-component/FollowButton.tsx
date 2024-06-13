// src/components/FollowToggle.tsx
import React, { useState, useEffect } from "react";
import toggleFollow from "../services/toggleFollow.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

interface FollowButtonProps {
    followedToID: string;
}

const FollowButton: React.FC <FollowButtonProps> = ({ followedToID }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [user, loading] = useAuthState(fireAuth);

    useEffect(() => {
        // 初期フォロー状態を取得する処理を追加することもできます。
        // APIからフォロー状態を取得してsetIsFollowingを更新する
    }, [followedToID, user]);

    const handleFollowToggle = async () => {
        if (!user) return;

        try {
            const newFollowStatus = await toggleFollow(followedToID, user.uid);
            setIsFollowing(newFollowStatus);
        } catch (error) {
            console.error("Error toggling follow:", error);
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
};

export default FollowButton;
