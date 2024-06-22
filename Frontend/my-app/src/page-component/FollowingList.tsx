import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { Profile } from "../model/models.ts";

const getQueryParams = (query) => {
  return new URLSearchParams(query);
};

const FollowingList = () => {
  const [followingList, setFollowingList] = useState([]);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(fireAuth);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const queryParams = getQueryParams(location.search);
        const userID = queryParams.get("uid");

        if (!userID) {
          throw new Error("User ID is missing");
        }

        const response = await fetch(`${url}/getfollowing?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch following list");
        }
        const data = await response.json();
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <ul className="list-group">
            {followingList && followingList.length > 0 ? (
              followingList.map((following) => (
                <li
                  key={following.UserID}
                  className="mb-6 border-b pb-4"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={following.Img}
                      alt="User profile"
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h5 className="mb-0 fs-5">{following.UserName}</h5>
                    </div>
                  </div>
                  <Link
                    to={`/profiles?uid=${following.UserID}`}
                    className="text-blue-500 hover:underline mx-4"
                  >
                    View Profile
                  </Link>
                </li>
              ))
            ) : (
              <p>No followers found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
