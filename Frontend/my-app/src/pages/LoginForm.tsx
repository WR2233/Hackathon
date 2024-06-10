import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { fireAuth } from "../services/firebase.ts";
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import {createUser} from "../services/createUser.ts"

const LoginForm: React.FC = () => {
  //emailアドレスの形を満たすチェックする関数
  const isValidAsEmail = (email: string)  =>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

   /**
   * emailでログインする
   */
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [username, setUsername] = useState("");
   const [user, setUser] = useState<User | null>(null);
   const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (currentUser) => {
      setUser(currentUser);
    })
    return () => unsubscribe();
  })

  //signup関数
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
    console.log(username)
    try {
      // Firebase Authentication にユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;

      await createUser(username, user.uid)

      console.log("User signed in:", user)
      navigate("/"); // ユーザー登録後にリダイレクト
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  }
  

//signin関数
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

  //signout関数
  const handleSignOut = () => {
    signOut(fireAuth)
    .then(() => {
      console.log("Uer signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error)
    })
  }

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-100 p-6 rounded-md shadow-md">
      {user ? (
        <div>
          <p className="mb-4">You are logged in as {user.email} ({user.displayName})</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>
            Sign Out
          </button>
          <Link to="/" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
            go to home
          </Link>
        </div>
      ) : (
        <div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSignIn} className="mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
          </form>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
          </form>
        </div>
      )}
      <Link to="/" className="block mt-4 text-blue-500 hover:text-blue-700">Back to Home</Link>
    </div>
  );
};

export default LoginForm