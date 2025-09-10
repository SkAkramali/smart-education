import { useState, useEffect } from 'react'
import './App.css'
import Sigin from './signin.jsx'
import { Header } from './header.jsx'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import Welcompage from './welcomepage.jsx';
import { Routes, Route, useLocation } from "react-router-dom";
import Aboutus from './about.jsx';
import UserRecommendations from './userinterset.jsx';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe(); // ✅ cleanup
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/signin" element={<Sigin />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<UserRecommendations />} />
      </Routes>

      {/* ✅ Show Welcome or Dashboard only on home ("/") */}
      {location.pathname === "/" && (
        <div>
          {user ? <Welcompage /> : <Sigin />}
        </div>
      )}
    </>
  )
}

export default App;
