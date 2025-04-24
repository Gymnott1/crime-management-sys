import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './navbar.css';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={isAuthenticated ? "/home" : "/"} onClick={closeMenu}>
          <img 
            src="https://i.ibb.co/8ws1ndN/logo-3.jpg" 
            alt="Police Logo" 
            className="logo-icon"
          />
          Police Portal
        </Link>
      </div>
      
      <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
        {isMenuOpen ? '✕' : '☰'}
      </button>
      
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        {/* Public links */}
        <li>
          <NavLink 
            to="/news" 
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={closeMenu}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/missingperson" 
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={closeMenu}
          >
            Missing Persons
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mostwanted" 
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={closeMenu}
          >
            Most Wanted
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/policestation" 
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={closeMenu}
          >
            Stations
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </li>
        
        {/* Authenticated links */}
        {isAuthenticated && (
          <>
            <li>
              <NavLink 
                to="/home" 
                className={({ isActive }) => isActive ? "active-link" : ""}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "active-link" : ""}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/complaint" 
                className={({ isActive }) => isActive ? "active-link" : ""}
                onClick={closeMenu}
              >
                File Complaint
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/feedback" 
                className={({ isActive }) => isActive ? "active-link" : ""}
                onClick={closeMenu}
              >
                Feedback
              </NavLink>
            </li>
          </>
        )}
        
        {/* Auth-related links */}
        {isAuthenticated ? (
          <>
            <li className="navbar-user-info">
              Welcome, {user?.name || user?.email?.split('@')[0]}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              onClick={closeMenu}
            >
              Login / Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;