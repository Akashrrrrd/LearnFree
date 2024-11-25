import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
            <span className="navbar-title">VLSIGuru</span>
          </div>
        </Link>
        <div
          className={`menu-icon ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/courses" className="navbar-links" onClick={toggleMenu}>
              Courses
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/quiz" className="navbar-links" onClick={toggleMenu}>
              Quiz
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-links" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="navbar-item">
              <Link to="/login" className="navbar-links" onClick={onLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-links" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
        <div className="navbar-icons">
          <Link to="/ai" className="navbar-ai-icon">
            <FontAwesomeIcon
              icon={faRobot}
              size="2x"
              style={{ color: "#1a365d" }} // Dark blue color for visibility
            />
          </Link>
          <Link to="/faq" className="navbar-help-icon">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              style={{ color: "#1a365d", marginLeft: "20px" }}
            />
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="navbar-user-icon">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                style={{ color: "#1a365d", marginLeft: "20px" }}
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
