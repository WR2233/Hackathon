import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { fireAuth } from "../services/firebase.ts";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/createUser.ts";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isValidAsEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidAsEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    signInWithEmailAndPassword(fireAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidAsEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;
      await createUser(username, user.uid);
      console.log("User signed up:", user);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  const handleSignOut = () => {
    signOut(fireAuth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-md shadow-md">
      {user ? (
        <div className="text-center">
          <p className="mb-4">Welcome back, {user.email}!</p>
          <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSignIn} className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Sign In
            </button>
          </form>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
              Sign Up
            </button>
          </form>
        </div>
      )}
      <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-600 text-center">
        Back to Home
      </Link>
    </div>
  );
};

export default LoginForm;
