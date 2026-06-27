import { motion } from 'framer-motion';
import { FiCheckCircle, FiEdit3, FiFileText, FiMail, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Toolkit.css';
const tools = [{
  icon: <FiCheckCircle size={32} />,
  title: 'CV Checker',
  desc: 'Audit your resume with ATS scoring. Get actionable feedback to improve your chances.',
  path: '/toolkit/cv-checker',
  color: 'var(--md-sys-color-primary)'
}, {
  icon: <FiEdit3 size={32} />,
  title: 'Experience Formatter',
  desc: 'Craft powerful bullet points using Google XYZ, STAR, and Power Bullet formats.',
  path: '/toolkit/experience-formatter',
  color: 'var(--md-sys-color-tertiary)'
}, {
  icon: <FiFileText size={32} />,
  title: 'README Generator',
  desc: 'Build a stunning GitHub profile README with badges, stats, and social links.',
  path: '/toolkit/readme-generator',
  color: 'var(--md-sys-color-secondary)'
}, {
  icon: <FiMail size={32} />,
  title: 'Cold Email Generator',
  desc: 'Generate tailored cold emails and LinkedIn messages for jobs and networking.',
  path: '/toolkit/cold-email',
  color: 'var(--md-sys-color-success)'
}];
export default function Toolkit() {
  return <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="tk-hero section">
        <div className="container">
          <motion.div className="tk-hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="tk-badge glass">
              <FiZap size={14} />
              <span>Free Tools for Bangladeshi Job Seekers</span>
            </div>
            <h1 className="tk-title">
              Bangladesh <span className="gradient-text">Job Toolkit</span>
            </h1>
            <p className="tk-subtitle">
              Everything you need to craft a standout application — from resume auditing to cold email templates. 100% free, no sign-up.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="tk-grid-section section">
        <div className="container">
          <div className="tk-grid">
            {tools.map((tool, i) => <motion.div key={i} className="tk-card glass-card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
                <div className="tk-card-icon" style={{ background: `${tool.color}22`, color: tool.color }}>
                  {tool.icon}
                </div>
                <h3 className="tk-card-title">{tool.title}</h3>
                <p className="tk-card-desc">{tool.desc}</p>
                <Link to={tool.path} className="btn btn-primary btn-sm tk-card-cta">
                  Launch Tool <FiZap size={14} />
                </Link>
              </motion.div>)}
          </div>
        </div>
      </section>
    </motion.div>;
}
