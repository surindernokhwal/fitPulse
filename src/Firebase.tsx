import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvkPsHJEJyRtlZCeIdw3nZlaEqxSjCm2c",
  authDomain: "learn-react-and-firebase-5654f.firebaseapp.com",
  projectId: "learn-react-and-firebase-5654f",
  storageBucket: "learn-react-and-firebase-5654f.firebasestorage.app",
  messagingSenderId: "710332925043",
  appId: "1:710332925043:web:755a3c4887d648f3719606",
  measurementId: "G-QLYXXSLQJS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
