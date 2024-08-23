// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "portfolio-developer-cb97c.firebaseapp.com",
  projectId: "portfolio-developer-cb97c",
  storageBucket: "portfolio-developer-cb97c.appspot.com",
  messagingSenderId: "673502130506",
  appId: "1:673502130506:web:6965e2ab380ceefc3a11b3",
  measurementId: "G-7BC3H33GZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);