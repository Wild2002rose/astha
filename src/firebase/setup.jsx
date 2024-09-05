// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsqyjMG5ro9VF27nVOsAPuLARppvQh6pg",
  authDomain: "asha-8fc88.firebaseapp.com",
  projectId: "asha-8fc88",
  storageBucket: "asha-8fc88.appspot.com",
  messagingSenderId: "1023708654306",
  appId: "1:1023708654306:web:9803c2e34615ded26e0cbb",
  measurementId: "G-ZJ9P8617BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth(app);
export {db};