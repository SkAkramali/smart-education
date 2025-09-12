import { useState, useEffect } from "react";
import "./App.css";
import Sigin from "./signin.jsx";
import { Header } from "./header.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Welcompage from "./welcomepage.jsx";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Aboutus from "./about.jsx";
import Recommendation from "./recomendations.jsx";
import StudentForm from "./userinterset.jsx";
import SignupForm from "./signup.jsx";
import Dashboard from "./dashboard.jsx"
import ProfilePage from "./profile.jsx";
function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/signin" element={<Sigin />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/welcomepage" element={<Welcompage />} />
        <Route path="/signup" element= {<SignupForm/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/userInterest" element={<StudentForm/>}></Route>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/welcomepage"/>} />
      </Routes>

      {/* ✅ Home ("/") route */}
      {location.pathname === "/" && (
        <div>
          {user ? (
            <>
              <Dashboard/>
              <Recommendation /> {/* Show recommendations only if logged in */}
            </>
          ) : (
            <Sigin />
          )}
        </div>
      )}
    </>
  );
}

export default App;
