import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX, FiZap } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/builder', label: 'Resume Builder' },
  { path: '/cover-letter', label: 'Cover Letter' },
  { path: '/toolkit', label: 'Toolkit' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar neo-nav">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <BrandLogo size={36} />
          <span className="logo-title">ResumeRocket</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`neo-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="navbar-actions">
          <ThemeToggle />
          <Link to="/builder" className="btn btn-primary btn-sm neo-navbar-cta">
            <FiZap size={16} />
            <span>BUILD FREE</span>
          </Link>
        </div>

        <button
          className="neo-hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-actions">
              <Link
                to="/builder"
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={() => setMobileOpen(false)}
              >
                <FiZap size={16} /> BUILD RESUME NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}