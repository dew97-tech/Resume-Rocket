import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';
const navLinks = [{
  path: '/',
  label: 'Home'
}, {
  path: '/builder',
  label: 'Resume Builder'
}, {
  path: '/cover-letter',
  label: 'Cover Letter'
}];
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return <motion.nav className="navbar glass" initial={{
    y: -80
  }} animate={{
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 200,
    damping: 30
  }}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text gradient-text">Resume Rocket</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.label}
              {location.pathname === link.path && <motion.div className="nav-indicator" layoutId="nav-indicator" />}
            </Link>)}
        </div>

        <div className="navbar-actions">
          <ThemeToggle />
          <Link to="/builder" className="btn btn-primary btn-sm navbar-cta">
            Get Started
          </Link>
        </div>

        <button className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && <motion.div className="navbar-mobile glass" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }}>
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>)}
            <div className="mobile-actions">
              <ThemeToggle />
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
}