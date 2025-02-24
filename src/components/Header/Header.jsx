import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MindRise</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/community">Community</Link>
      </nav>
      <div className="login">
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </header>
  );
};

export default Header;
