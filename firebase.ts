import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDmfrPtfAFAbZKjnaxcjEUuHcYF1Yopezg",
  authDomain: "food-watch-46bbc.firebaseapp.com",
  projectId: "food-watch-46bbc",
  storageBucket: "food-watch-46bbc.appspot.com",
  messagingSenderId: "29807453875",
  appId: "1:29807453875:web:498f6e27141ce3d21ab2c6"
});

export const auth = getAuth(app);

export default app;
