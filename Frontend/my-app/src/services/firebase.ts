import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBEcmuisfE-9F1h3NiMizHM2JlXEPbDX0s",
    authDomain: "hackathon-d62a0.firebaseapp.com",
    projectId: "hackathon-d62a0",
    storageBucket: "hackathon-d62a0.appspot.com",
    messagingSenderId: "767653437667",
    appId: "1:767653437667:web:b5ed8e67d5473b6f9a25d6",
    measurementId: "G-DP3TJ31CQN"
  };
  

const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);
export const storage = getStorage(app)