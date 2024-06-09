// src/pages/PostDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <p>Displaying details for post ID: {postId}</p>
    </div>
  );
};

export default PostDetail;
