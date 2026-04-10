import { FiGithub, FiHeart, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Footer.css';
export default function Footer() {
  return <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">⬡</span>
              <span className="gradient-text" style={{
              fontWeight: 800,
              fontSize: '1.2rem'
            }}>Resume Rocket</span>
            </div>
            <p className="footer-desc">
              Create stunning, professional resumes in minutes. 100% free, no sign-up needed.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Product</h4>
            <ul>
              <li><Link to="/builder">Resume Builder</Link></li>
              <li><Link to="/cover-letter">Cover Letter</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Resources</h4>
            <ul>
              <li><Link to="/resume-tips">Resume Tips</Link></li>
              <li><Link to="/cv-writing-guide">CV Writing Guide</Link></li>
              <li><Link to="/career-guide">Career Guide</Link></li>
              <li><span className="footer-coming-soon">Blog <span className="badge-soon">Coming Soon</span></span></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FiTwitter size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FiLinkedin size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FiGithub size={18} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Made with <FiHeart size={14} style={{ color: 'var(--error)' }} /> by Resume Rocket © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>;
}
