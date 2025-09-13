// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Sigin from "./signin.jsx";
import { Header } from "./header.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Welcompage from "./welcomepage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Aboutus from "./about.jsx";
import StudentForm from "./userinterset.jsx";
import SignupForm from "./signup.jsx";
import Dashboard from "./dashboard.jsx";
import ProfilePage from "./profile.jsx";
import Roadmap from "./roadmap.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // prevent flicker while checking auth
  }

  return (
    <>
      <Header />

      <Routes>
        {/* ✅ Home Route: Dashboard if logged in, Welcome if not */}
        <Route path="/" element={user ?<Roadmap/>: <Welcompage />} />

        {/* Public Routes */}
        <Route path="/signin" element={<Sigin />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/about" element={<Aboutus />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/userInterest"
          element={user ? <StudentForm /> : <Navigate to="/signin" />}
        />
        <Route
          path="/roadmap"
          element={user ? <Roadmap /> : <Navigate to="/signin" />}
        />

        {/* Catch-all: Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
