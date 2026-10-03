import { FiArrowUp, FiGithub, FiGlobe, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import './Footer.css';

const CONNECT_LINKS = [
  {
    href: 'https://davidmallick.dev',
    label: 'Portfolio',
    title: 'davidmallick.dev',
    Icon: FiGlobe,
  },
  {
    href: 'https://github.com/dew97-tech',
    label: 'GitHub',
    title: 'github.com/dew97-tech',
    Icon: FiGithub,
  },
  {
    href: 'https://www.linkedin.com/in/david-dew-mallick/',
    label: 'LinkedIn',
    title: 'linkedin.com/in/david-dew-mallick',
    Icon: FiLinkedin,
  },
];

const TICKER_ITEMS = [
  'ATS-OPTIMIZED',
  '★',
  '100% FREE FOREVER',
  '★',
  'PRIVATE BY DEFAULT',
  '★',
  'ENGINEERED TO LAND INTERVIEWS',
  '★',
];

export default function Footer() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="typeui-footer">
      {/* Marquee Ticker */}
      <div className="neo-marquee-wrap footer-marquee" aria-hidden="true">
        <div className="neo-marquee-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand-link">
              <BrandLogo size={36} />
              <span className="footer-brand-title">Resume Rocket</span>
            </Link>
            <p className="footer-brand-desc">
              The brutalist, ATS-optimized resume builder. Free forever, private by default, and engineered to land interviews.
            </p>
            <div className="footer-brand-tag">
              ATS OPTIMIZED • 100% FREE
            </div>
            <Link to="/builder" className="btn btn-primary footer-cta">
              Build My Resume →
            </Link>
          </div>

          {/* Product Column */}
          <div className="footer-col">
            <h4 className="footer-heading">PRODUCT</h4>
            <ul className="footer-links">
              <li>
                <Link to="/builder" className="footer-link">Resume Builder</Link>
              </li>
              <li>
                <Link to="/cover-letter" className="footer-link">Cover Letter</Link>
              </li>
              <li>
                <Link to="/builder" className="footer-link">ATS Templates</Link>
              </li>
            </ul>
          </div>

          {/* Toolkit Column */}
          <div className="footer-col">
            <h4 className="footer-heading">TOOLKIT</h4>
            <ul className="footer-links">
              <li>
                <Link to="/toolkit/cv-checker" className="footer-link">CV Checker</Link>
              </li>
              <li>
                <Link to="/toolkit/experience-formatter" className="footer-link">Experience Formatter</Link>
              </li>
              <li>
                <Link to="/toolkit/readme-generator" className="footer-link">README Generator</Link>
              </li>
              <li>
                <Link to="/toolkit/cold-email" className="footer-link">Cold Email Generator</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-col">
            <h4 className="footer-heading">RESOURCES</h4>
            <ul className="footer-links">
              <li>
                <Link to="/resume-tips" className="footer-link">Resume Tips</Link>
              </li>
              <li>
                <Link to="/cv-writing-guide" className="footer-link">CV Writing Guide</Link>
              </li>
              <li>
                <Link to="/career-guide" className="footer-link">Career Guide</Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="footer-col">
            <h4 className="footer-heading">CONNECT</h4>
            <div className="footer-social-row">
              {CONNECT_LINKS.map(({ href, label, title, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn neo-lift"
                  aria-label={label}
                  title={title}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            Crafted for ambitious job hunters worldwide. © {new Date().getFullYear()} Resume Rocket.
            {' '}
            <a
              href="https://davidmallick.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Built by David Mallick
            </a>
          </p>
          <div className="footer-bottom-actions">
            <span className="footer-pill">MIT LICENSE</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-top-btn neo-lift"
              aria-label="Back to top"
            >
              <FiArrowUp size={14} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
