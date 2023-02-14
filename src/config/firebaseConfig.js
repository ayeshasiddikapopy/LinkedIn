import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCwZJPyn6J3JlaMYZ5NGzLa8Ro6DZAMYY8",
  authDomain: "linkedin-fedc0.firebaseapp.com",
  projectId: "linkedin-fedc0",
  storageBucket: "linkedin-fedc0.appspot.com",
  messagingSenderId: "476580136646",
  appId: "1:476580136646:web:4ac01463b03f22b9fc79c7",
  measurementId: "G-TBVWJVYF8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig