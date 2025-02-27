import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from "../../../src/assets/image.png"
const Header = () => {
  return (
    <header className="header">
      {/* Logo / Brand Name */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="MindRise Logo" className="logo-img" />
          <span className="logo-text">MindRise</span>
        </Link>
      </div>
       
      {/* Main Navigation Links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/community">Community</Link>
        <Link to="/feed">Lets-Talk</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>

      {/* Login and CTA Button */}
      <div className="auth-links">
        <Link to="/login" className="login-link">
          Login
        </Link>
        <Link to="/register" className="cta-button">
          Get started
        </Link>
      </div>
    </header>
  );
};

export default Header;

