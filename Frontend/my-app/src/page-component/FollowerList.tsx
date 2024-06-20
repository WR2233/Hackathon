import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { Profile } from "../model/models.ts";

const getQueryParams = (query) => {
  return new URLSearchParams(query);
};

const FollowersList = () => {
  const [followerList, setFollowerList] = useState([]);
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(fireAuth);

  useEffect(() => {
    const fetchFollowerList = async () => {
      try {
        const queryParams = getQueryParams(location.search);
        const userID = queryParams.get("uid");

        if (!userID) {
          throw new Error("User ID is missing");
        }

        const response = await fetch(`${url}/getfollowers?uid=${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch followers list");
        }
        const data = await response.json();
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary mb-3"
          >
            Go Back
          </button>
          <ul className="list-group">
            {followerList && followerList.length > 0 ? (
              followerList.map((follower) => (
                <li key={follower.UserID} className="mb-6 border-b pb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={follower.Img}
                      alt="User profile"
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h5 className="mb-0 fs-5">{follower.UserName}</h5>
                    </div>
                  </div>
                  <Link
                    to={`/profiles?uid=${follower.UserID}`}
                    className="btn btn-primary btn-sm"
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

export default FollowersList;
