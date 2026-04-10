import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText, FiLayout, FiStar, FiTarget, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ResourcePage.css';

const sections = [
  { id: 'tip-1', title: 'Tailoring Matters', icon: <FiTarget /> },
  { id: 'tip-2', title: 'Action Verbs', icon: <FiStar /> },
  { id: 'tip-3', title: 'Quantify Achievements', icon: <FiZap /> },
  { id: 'tip-4', title: 'Scannability Layout', icon: <FiLayout /> },
  { id: 'tip-5', title: 'Ideal Length', icon: <FiFileText /> },
  { id: 'tip-6', title: 'Essential Checklist', icon: <FiCheckCircle /> },
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

export default function ResumeTips() {
  const [activeSection, setActiveSection] = useState('tip-1');

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
          <h1>Resume Tips & <span className="gradient-text">Best Practices</span></h1>
          <p>Expert advice and psychological triggers to help you craft a resume that gets explicitly noticed by recruiters and hiring managers.</p>
        </div>

        <div className="resource-layout">
          {/* SIDEBAR TOC */}
          <aside className="resource-sidebar">
            <h4 className="toc-title">Expert Topics</h4>
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

            <SectionReveal id="tip-1">
              <h2><FiTarget /> Tailor Your Resume Intelligently</h2>
              <p>One of the single biggest, most fatal mistakes job seekers make is shotgunning the exact same generic resume for every single application. You must study the job description carefully and customize your resume to highlight the overlapping skills and experience they explicitly list.</p>
              <div className="tip-highlight">💡 <strong>Pro Tip:</strong> Subconsciously mirror the exact keywords and terminology from the job posting directly into your resume summary. Many enterprise companies use ATS (Applicant Tracking Systems) that aggressively scan and rank resumes purely based on these specific terms.</div>
            </SectionReveal>

            <SectionReveal id="tip-2">
              <h2><FiStar /> Lead with Strong Action Verbs</h2>
              <p>Do not start sentences with "Responsible for" or "Tasked with". Start each bullet point in your experience section directly with a powerful, dominating action verb. This psychological framing makes your accomplishments massively more dynamic.</p>
              <h3>Examples of Strong Verbs:</h3>
              <ul className="resource-list">
                <li><strong>Architected</strong> — "Architected a microservices backend that improved stability by 40%"</li>
                <li><strong>Spearheaded</strong> — "Spearheaded a cross-functional marketing campaign generating 50k leads"</li>
                <li><strong>Optimized</strong> — "Optimized legacy database queries resulting in 3x faster page load times"</li>
                <li><strong>Negotiated</strong> — "Negotiated vendor contracts, securing a 15% reduction in supply costs"</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="tip-3">
              <h2><FiZap /> Quantify Your Achievements</h2>
              <p>Numbers speak exponentially louder than words. Whenever humanly possible, attached strict metrics, percentages, and data to demonstrate the objective scale of your impact.</p>
              <h3>Instead of vague summaries:</h3>
              <ul className="resource-list">
                <li>❌ <strong>Bad:</strong> "Managed a large team and improved our general performance"</li>
                <li>✅ <strong>Good:</strong> "Managed a team of 12 and drove a 40% efficiency increase over 6 months"</li>
                <li>❌ <strong>Bad:</strong> "Helped increase sales"</li>
                <li>✅ <strong>Good:</strong> "Generated $2.5M in net-new ARR through strategic client acquisition"</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="tip-4">
              <h2><FiLayout /> Prioritize Scannable Layouts</h2>
              <p>Recruiters spend an incredibly short average of 6-7 seconds on an initial resume scan. Make sure your layout is mathematically clean, well-organized, and impossible to get lost in.</p>
              <ul className="resource-list">
                <li>Maintain clear, bold section headings establishing extreme visual hierarchy</li>
                <li>Keep bullet points tightly concise — strictly 1-2 lines maximum</li>
                <li>Use completely uniform chronological formatting throughout the document</li>
                <li>Leave adequate negative white space to give the reader's eyes a break</li>
                <li>Stick to premium professional fonts like Inter, Roboto, or Poppins</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="tip-5">
              <h2><FiFileText /> The Perfect Resume Length</h2>
              <p>For most professionals possessing 5-15 years of experience, a standard 2-page resume is highly ideal. Fresh graduates or juniors should aim for exactly 1 page. Extreme senior executives or academics may use up to 3 pages.</p>
              <div className="tip-highlight">💡 <strong>Pro Tip:</strong> Modern PDF layouts can break easily. Resume Rocket natively tracks your physical A4 page boundary and automatically handles vertical pagination, seamlessly flowing your content without slicing paragraphs awkwardly.</div>
            </SectionReveal>

            <SectionReveal id="tip-6">
              <h2><FiCheckCircle /> Essential Sections Checklist</h2>
              <p>Ensure you never omit the structural pillars of a highly effective CV:</p>
              <ul className="resource-list">
                <li>✅ Secure Contact Information (Email, Phone, LinkedIn, GitHub/Portfolio)</li>
                <li>✅ A potent Professional Summary / Objective Statement (max 3 sentences)</li>
                <li>✅ Reverse Chronological Work Experience</li>
                <li>✅ Education constraints</li>
                <li>✅ Filtered Hard & Soft Skills (specifically categorized)</li>
              </ul>
            </SectionReveal>

            <div className="resource-cta">
              <h3>Ready to Apply These Expert Principles?</h3>
              <p>Stop wrestling with Word documents. Build a mathematically polished, ATS-optimized professional resume in absolute minutes with Resume Rocket — 100% free.</p>
              <Link to="/builder" className="btn btn-primary btn-lg">Deploy Your Resume Now →</Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
