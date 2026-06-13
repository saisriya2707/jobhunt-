import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { userName, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = userName ? userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'U';

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon"><i className="fas fa-briefcase" /></span>
          <span className="logo-text">Job<span className="logo-accent">Hunt</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>Jobs</Link>
        </nav>

        {/* Right side */}
        <div className="header-right">
          <div className="user-badge">
            <span className="user-avatar">{initials}</span>
            <span className="user-name">{userName}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" className="mobile-link" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <button className="mobile-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}
