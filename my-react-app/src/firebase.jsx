import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz_LKslVItuKR5ZdEzbFpoATb9ov7_Mqg",
  authDomain: "sample-fa557.firebaseapp.com",
  projectId: "sample-fa557",
  storageBucket: "sample-fa557.appspot.com",
  messagingSenderId: "178070566472",
  appId: "1:178070566472:web:f1c1484c052a8f8ee90a7d",
  measurementId: "G-3YFSEVRBEM"
};

// ✅ First initialize app
const app = initializeApp(firebaseConfig);

// ✅ Then get services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export both
export { auth, db };
