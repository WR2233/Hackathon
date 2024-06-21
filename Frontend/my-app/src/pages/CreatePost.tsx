import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../services/createPost.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { fireAuth, storage } from "../services/firebase.ts";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import createPostWithMedia from "../services/createPostWithMedia.ts";

const CreatePost: React.FC = () => {
  const [user] = useAuthState(fireAuth);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const uid = user?.uid;
    if (uid === undefined) {
      return;
    }
    
    if (media !== null) {
      handleMediaUpload(uid);
    } else {
      try {
        const postID = await createPost(content, uid);
        setContent("");
        navigate("/post/" + postID);
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedMedia = e.target.files[0];
      const mediaType = selectedMedia.type.startsWith('image/') ? 'image' : 
                        selectedMedia.type.startsWith('video/') ? 'video' : null;
      setMedia(selectedMedia);
      setMediaType(mediaType);
    }
  };

  const handleMediaUpload = async (uid: string) => {
    if (!media || !mediaType) return;
    try {
      const storageRef = ref(storage, `${mediaType}s/${media.name}`);
      const uploadTask = await uploadBytes(storageRef, media);
      const url = await getDownloadURL(uploadTask.ref);
      setIsUploaded(true);
      
      try {
        const postID = await createPostWithMedia(content, uid, url, mediaType);
        setContent("");
        setMedia(null);
        setMediaType(null);
        navigate("/post/" + postID);
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    } catch (error) {
      console.error(`Error uploading ${mediaType}:`, error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full resize-none"
            rows={5}
            maxLength={200}
            required
          />

          <div className="mt-4">
            <label className="block text-gray-700">Media:</label>
            <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
          </div>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
        <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-700">Cancel</Link>
      </form>
    </div>
  );
};

export default CreatePost;
