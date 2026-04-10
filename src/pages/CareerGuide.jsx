import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCompass, FiMapPin, FiMessageCircle, FiTarget, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ResourcePage.css';

const sections = [
  { id: 'guide-1', title: 'Career Vision', icon: <FiCompass /> },
  { id: 'guide-2', title: 'Networking', icon: <FiUsers /> },
  { id: 'guide-3', title: 'Search Process', icon: <FiTarget /> },
  { id: 'guide-4', title: 'Interviewing', icon: <FiMessageCircle /> },
  { id: 'guide-5', title: 'Negotiation', icon: <FiArrowUpRight /> },
  { id: 'guide-6', title: 'Continuous Learning', icon: <FiMapPin /> },
];

function SectionReveal({ children, id }) {
  return (
    <motion.section 
      id={id} 
      className="resource-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default function CareerGuide() {
  const [activeSection, setActiveSection] = useState('guide-1');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div className="page-wrapper resource-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="container">
        
        <div className="resource-hero">
          <h1>Career Development <span className="gradient-text">Guide</span></h1>
          <p>Strategic, actionable advice to safely navigate your entire career path, from aggressive job hunting to massive professional growth.</p>
        </div>

        <div className="resource-layout">
          {/* SIDEBAR TOC */}
          <aside className="resource-sidebar">
            <h4 className="toc-title">Development Steps</h4>
            <nav className="toc-list">
              {sections.map(sec => (
                <a 
                  key={sec.id} 
                  href={`#${sec.id}`}
                  className={`toc-link ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* MAIN ARTICLE CONTENT */}
          <div className="resource-content">

            <SectionReveal id="guide-1">
              <h2><FiCompass /> Define Your Career Vision</h2>
              <p>Before launching blindly into job applications, take literal time offline to reflect on where you mathematically want to be in 1, 3, and 5 years. A rigid, clear vision allows you to bypass temporary trends and make strategic decisions about which roles to confidently pursue.</p>
              <h3>Key tactical questions to ask yourself:</h3>
              <ul className="resource-list">
                <li>What kind of deep work actively energizes me?</li>
                <li>What precise technical skills do I desperately need to develop?</li>
                <li>What micro-culture within a company fits my extreme personality?</li>
                <li>What is my completely uncompromisable work-life balance?</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="guide-2">
              <h2><FiUsers /> Build Your Network</h2>
              <p>Almost all of the highest-paying, premium job opportunities are completely hidden and never posted publicly. Building an untouchable network grants you explicit backdoor access to the hidden job market before positions are even formalized.</p>
              <ul className="resource-list">
                <li>Attend ultra-niche industry events, local meetups, and expensive conferences</li>
                <li>Engage dangerously often on LinkedIn — comment thoughtfully, share data, and create original content</li>
                <li>Join deeply hidden professional Slack groups or Discord servers</li>
                <li>Fearlessly reach out to people in roles you aspire to for 15-minute informational interviews</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="guide-3">
              <h2><FiTarget /> Master Job Searching</h2>
              <p>A calculated, hyper-organized job search drastically outperforms a chaotic, panic-driven approach every single time.</p>
              <h3>Algorithms for effective searching:</h3>
              <ul className="resource-list">
                <li>Set a ruthless daily output target (e.g., apply to precisely 4 highly relevant jobs per day)</li>
                <li>Hyper-customize your primary resume and cover letter for each absolute application</li>
                <li>Log strictly every application metadata in an Airtable or spreadsheet</li>
                <li>Set automatic reminders to violently follow up 1 week after applying if ghosted</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="guide-4">
              <h2><FiMessageCircle /> Interview Like a Pro</h2>
              <p>Technical interviews are simply your physical chance to project your narrative and demonstrate raw value in real-time under pressure.</p>
              <ul className="resource-list">
                <li><strong>The STAR Framework:</strong> Aggressively structure your answers with precise Situation, Task, Action, and specific Result</li>
                <li><strong>Research Architecture:</strong> Know the target company's products, engineering culture, competitors, and recent venture rounds</li>
                <li><strong>Reverse Interview:</strong> Confidently ask them about failure rates, team dynamics, and technical debt</li>
                <li><strong>Follow up:</strong> Instantly send a highly personalized thank-you dispatch within 24 hours</li>
              </ul>
              <div className="tip-highlight">💡 <strong>Pro Tip:</strong> Leverage ResumeForge's automatic cover letter generator to instantly spin up customized pre-interview context emails.</div>
            </SectionReveal>

            <SectionReveal id="guide-5">
              <h2><FiArrowUpRight /> Negotiate Aggressively</h2>
              <p>Every single corporate entity expects negotiation. Leaving money natively on the table permanently affects your baseline lifetime compound interest. Do not do it.</p>
              <ul className="resource-list">
                <li>Research aggressive salary ranges on Levels.fyi, Blind, and precise PayScale benchmarks</li>
                <li>Prioritize the entire total comp package: base salary, aggressive bonuses, vested equity cliffs, and untracked PTO</li>
                <li>Rehearse your strict negotiation script with a senior industry peer</li>
                <li>Never accept the first offer verbally; require everything in writing before analyzing</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="guide-6">
              <h2><FiMapPin /> Continuous Learning</h2>
              <p>The highest performing professionals absolutely never stop learning. If you stand still in modern software, you move backwards.</p>
              <ul className="resource-list">
                <li>Invest in rigorous online curriculums (Coursera, Udemy, specialized MIT modules)</li>
                <li>Obtain industry-heavy certifications immediately (AWS Solutions Architect, Google Cloud Professional)</li>
                <li>Architect actual open-source side projects to explicitly showcase raw untethered skills</li>
              </ul>
            </SectionReveal>

            <div className="resource-cta">
              <h3>Start Your True Career Journey Now</h3>
              <p>The mathematically perfect resume forces doors wide open. Build your architectural overview absolutely free with ResumeForge.</p>
              <Link to="/builder" className="btn btn-primary btn-lg">Create Your Artifact →</Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
