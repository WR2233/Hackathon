// src/components/FollowToggle.tsx
import React, { useState, useEffect } from "react";
import toggleFollow from "../services/toggleFollow.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";

interface FollowButtonProps {
    followedToID: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ followedToID }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user] = useAuthState(fireAuth);

    useEffect(() => {
        const getFollowStatus = async (followedByID: string, followedToID: string) => {
            const url = `${process.env.REACT_APP_API_URL}/followstatus`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ followedByID, followedToID }),
            });
            if (!response.ok) {
                throw new Error("Failed to get follow status");
            }
            const data = await response.json();
            return data.followed;
        };

        if (user) {
            getFollowStatus(user.uid, followedToID)
                .then(status => {
                    setIsFollowing(status);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching follow status:", error);
                    setLoading(false);
                });
        }
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

    if (loading) {
        return <button className="block bg-gray-500 text-white font-bold py-2 px-4 rounded" disabled>Loading...</button>;
    }

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
