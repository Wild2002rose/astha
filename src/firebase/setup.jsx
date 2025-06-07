import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDi9mrTkAqdcMqMVraLZEvfNbu0PPO34A",
  authDomain: "meddel-2025-28fae.firebaseapp.com",
  projectId: "meddel-2025-28fae",
  storageBucket: "meddel-2025-28fae.firebasestorage.app",
  messagingSenderId: "820743219397",
  appId: "1:820743219397:web:909e9c8909561cda72a8ac",
  measurementId: "G-7MRLS46WQP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, analytics,db};
