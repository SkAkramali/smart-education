import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/header.css";

const Navigations = ({ isOpen, closeMenu }) => {
  const navItems = [
    { path: "/about", label: "About us" },
    { path: "/signin", label: "Signin" },
    { path: "/signup", label: "Signup" },
  ];

  return (
    <ul className={`navigations ${isOpen ? "open" : ""}`}>
      {navItems.map((item) => (
        <li key={item.path} onClick={closeMenu}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? "activeLink" : undefined
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="App-header">
      <h1 className="logo">Smart Education</h1>

      {/* Hamburger Button */}
      <button
        className={`menu-btn ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav>
        <Navigations isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
};
