// src/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate, Outlet} from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./css/dashboard.css";
import CollegesList from "./colleges.jsx";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Header (always visible) */}
      <header className="App-header">
        <h1 className="logo">Dashboard</h1>
          
        <div className="header-right">
          <NavLink to="/dashboard/roadmap" className="rodemap">Roadmap</NavLink>
          <NavLink to="/colleges" className="colleges">Colleges</NavLink>
          {user && (
            <img
              src={
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Avatar"
              className="user-avatar"
              onClick={() => navigate("/dashboard/profile")}
            />
          )}


          <button
            className={`menu-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <p onClick={() => navigate("/dashboard/roadmap")}>Roadmap</p>
              <p onClick={() => navigate("/dashboard/profile")}>Profile</p>
              <p onClick={() => auth.signOut()}>Logout</p>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
