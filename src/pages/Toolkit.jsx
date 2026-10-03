import { motion } from 'framer-motion';
import { FiCheckCircle, FiEdit3, FiFileText, FiMail, FiZap, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Toolkit.css';

const tools = [
  {
    icon: <FiCheckCircle size={32} />,
    title: 'CV Checker & Auditor',
    desc: 'Audit your resume against strict ATS scoring algorithms. Get instant actionable fixes.',
    path: '/toolkit/cv-checker',
    accent: 'var(--neo-yellow)',
    badge: 'ATS SCORE',
  },
  {
    icon: <FiEdit3 size={32} />,
    title: 'Experience Formatter',
    desc: 'Transform weak bullet points into high-impact Google XYZ and STAR achievement statements.',
    path: '/toolkit/experience-formatter',
    accent: 'var(--neo-cyan)',
    badge: 'XYZ METHOD',
  },
  {
    icon: <FiFileText size={32} />,
    title: 'GitHub README Generator',
    desc: 'Generate a standout developer GitHub profile README with retro badges, tech stacks, and stats.',
    path: '/toolkit/readme-generator',
    accent: 'var(--neo-pink)',
    badge: 'DEV PROFILE',
  },
  {
    icon: <FiMail size={32} />,
    title: 'Cold Email Generator',
    desc: 'Generate tailored recruiter outreach emails and LinkedIn messages with customizable tones.',
    path: '/toolkit/cold-email',
    accent: 'var(--neo-green)',
    badge: 'OUTREACH',
  },
];

export default function Toolkit() {
  return (
    <motion.div
      className="page-wrapper tk-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <section className="tk-hero section">
        <div className="container">
          <div className="tk-hero-content">
            <div className="tk-badge-wrap">
              <span className="neo-sticker rotate-left">⚡ 100% FREE UTILITIES</span>
            </div>
            <h1 className="tk-title">
              JOB SEARCH <span className="highlight-pill">TOOLKIT</span>
            </h1>
            <p className="tk-subtitle">
              Four specialized tools engineered to optimize every stage of your job hunt — from ATS audits to high-converting recruiter cold outreach.
            </p>
          </div>
        </div>
      </section>

      <section className="tk-grid-section section">
        <div className="container">
          <div className="tk-grid">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="tk-card"
                style={{ '--tool-accent': tool.accent }}
              >
                <div className="tk-card-top">
                  <div className="tk-card-icon" style={{ background: tool.accent }}>
                    {tool.icon}
                  </div>
                  <span className="neo-badge">{tool.badge}</span>
                </div>
                <h3 className="tk-card-title">{tool.title}</h3>
                <p className="tk-card-desc">{tool.desc}</p>
                <Link to={tool.path} className="btn btn-primary tk-card-cta">
                  <span>LAUNCH TOOL</span>
                  <FiArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
