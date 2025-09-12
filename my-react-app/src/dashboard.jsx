import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./css/header.css";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Track auth state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="App-header">
      {/* Left side: Dashboard title */}
      <h1 className="logo">Dashboard</h1>

      {/* Right side: User avatar + menu */}
      <div className="header-right">
        {user && (
          <img
            src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="User Avatar"
            className="user-avatar"
            onClick={() => navigate("/profile")}
          />
        )}

        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Dashboard;
