import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth } from "../services/firebase.ts";
import { Post } from "../model/models";
import { useNavigate } from "react-router-dom";
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Linkify from "linkify-react";
import ReactPlayer from "react-player";
import moment from 'moment';
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchContent, setSearchContent] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [startTime, setStartTime] = useState<moment.Moment | Date | null>(null);
  const [endTime, setEndTime] = useState<moment.Moment | Date | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [user, loading] = useAuthState(fireAuth);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [seeTime, setSeeTime] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const linkifyOptions = {
    className: "text-blue-400",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${url}/getposts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (!user && !loading) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [url, user, loading, navigate]);

  const handleSearch = () => {
    if (!searchContent && !searchName && !startTime && !endTime) {
      alert("Please enter at least one search criteria.");
      return;
    }

    const filtered = posts.filter(post => {
      const postTime = new Date(post.PostedAt);
      const isContentMatch = !searchContent || post.Content.toLowerCase().includes(searchContent.toLowerCase());
      const isNameMatch = !searchName || post.UserName.toLowerCase().includes(searchName.toLowerCase());
      const isTimeMatch = (!startTime || startTime <= postTime) && (!endTime || postTime <= endTime);
      const isNotDeleted = !post.DeletedUser && !post.Deleted;
      return isContentMatch && isNameMatch && isTimeMatch && isNotDeleted;
    });

    setFilteredPosts(filtered);
    setIsSearched(true);
  };

  const handleSeeTime = () => {
    setSeeTime(!seeTime);
    return;
  };

  const handleClearTime = () => {
    setEndTime(null);
    setStartTime(null);
    return;
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Search Posts</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Search by Content:</label>
        <input
          type="text"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          placeholder="Search by content"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Search by Name:</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button onClick={handleSeeTime} className="px-4 py-2 bg-blue-500 text-white rounded-md mx-4">
        {seeTime ? "Close Calendar" : "Search by time"}
      </button>
      {seeTime && (
        <div>
          <button onClick={handleClearTime} className="px-4 py-2 bg-blue-500 text-white rounded-md my-4">
            Clear time
          </button>
          <div className="mb-4">
            <label className="block text-gray-700">Search by Start Time:</label>
            <DateTime
              value={startTime instanceof Date ? startTime : undefined}
              onChange={(date: moment.Moment | string | null) => {
                if (date === null || typeof date === 'string') {
                  setStartTime(null);
                } else {
                  setStartTime(date instanceof Date ? moment(date) : date);
                }
              }}
              input={false}
              className="date-picker"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Search by End Time:</label>
            <DateTime
              value={endTime instanceof Date ? endTime : undefined}
              onChange={(date: moment.Moment | string | null) => {
                if (date === null || typeof date === 'string') {
                  setEndTime(null);
                } else {
                  setEndTime(date instanceof Date ? moment(date) : date);
                }
              }}
              input={false}
              className="date-picker"
            />
          </div>
        </div>
      )}

      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>

      {isSearched && (
        <div className="mb-4 pb-4 mt-4">
          <ul>
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <li key={post.PostID} className="mb-6 border-b pb-4">
                  <div className="flex items-start mb-2">
                    <img src={post.Img} alt="User profile" className="w-32 h-32 rounded-full object-cover mr-4" />
                    <div>
                      <p className="text-lg font-semibold">{post.UserName}</p>
                      <p className="text-xs text-gray-500">Posted At: {new Date(post.PostedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <Linkify as="p" options={linkifyOptions}>
                    {post.Content}
                  </Linkify>
                  {post.Video && (
                    <ReactPlayer url={post.Video} controls={true} width="100%" height="100%" />
                  )}
                  {post.ImgPost && (
                    <img src={post.ImgPost} alt="Img of Post" />
                  )}
                   <Link to={`/post/${post.PostID}`} className="text-blue-500 hover:underline">Details</Link>
                   <Link to={`/profiles?uid=${post.UserID}`} className="text-blue-500 hover:underline mx-4">To Profiles</Link>
                </li>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
