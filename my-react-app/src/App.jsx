// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Sigin from "./signin.jsx";
import { Header } from "./header.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Welcompage from "./welcomepage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Aboutus from "./about.jsx";
import UserCourseInterest from "./userinterset.jsx";
import SignupForm from "./signup.jsx";
import DashboardLayout from "./dashboard.jsx";
import ProfilePage from "./profile.jsx";
import Roadmap from "./roadmap.jsx";
import CollegesList from "./colleges.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsInterest, setNeedsInterest] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // ✅ Check Firestore if user has filled interests
        const docRef = doc(db, "StudentDetails", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNeedsInterest(!data.interests || data.interests.length === 0);
        } else {
          setNeedsInterest(true); // brand new user
        }
      } else {
        setUser(null);
        setNeedsInterest(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Show Header only if user is NOT logged in */}
      {!user && <Header />}

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            user
              ? needsInterest
                ? <Navigate to="/userInterest" />
                : <Navigate to="/dashboard" />
              : <Welcompage />
          }
        />

        {/* Public Routes */}
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Sigin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupForm />}
        />
        <Route path="/about" element={<Aboutus />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={user ? <DashboardLayout /> : <Navigate to="/signin" />}
        >
          <Route index element={<div>Welcome to your Dashboard!</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="roadmap" element={<Roadmap />} />
        </Route>

        {/* Interest Form Route */}
        <Route
          path="/userInterest"
          element={user ? <UserCourseInterest /> : <Navigate to="/signin" />}
        />
        <Route path="/colleges" element={user ? <CollegesList /> : <Navigate to="/signin" />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
