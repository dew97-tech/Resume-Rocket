import { motion } from 'framer-motion';
import { FiBook, FiEdit3, FiFileText, FiGrid, FiLayers, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ResourcePage.css';

const sections = [
  { id: 'step-1', title: 'CV vs. Resume', icon: <FiBook /> },
  { id: 'step-2', title: 'Personal Statement', icon: <FiEdit3 /> },
  { id: 'step-3', title: 'Experience Section', icon: <FiLayers /> },
  { id: 'step-4', title: 'Organizing Skills', icon: <FiGrid /> },
  { id: 'step-5', title: 'Education & Certs', icon: <FiTrendingUp /> },
  { id: 'step-6', title: 'Proofread & Polish', icon: <FiFileText /> },
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

export default function CVWritingGuide() {
  const [activeSection, setActiveSection] = useState('step-1');

  // Simple scroll spy behavior
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; // Offset

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
          <h1>Complete CV <span className="gradient-text">Writing Guide</span></h1>
          <p>A comprehensive step-by-step editorial to writing a CV that bypasses ATS filters and opens doors to your dream career.</p>
        </div>

        <div className="resource-layout">
          {/* SIDEBAR TOC */}
          <aside className="resource-sidebar">
            <h4 className="toc-title">Table of Contents</h4>
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
            
            <SectionReveal id="step-1">
              <h2><FiBook /> Step 1: Understand the Difference</h2>
              <p>Before writing a single word, you must understand your target audience. While the terms "CV" and "Resume" are often used interchangeably in modern hybrid workspaces, there remains a critical technical distinction based on geography and industry:</p>
              <ul className="resource-list">
                <li><strong>Resume:</strong> A concise 1-2 page document strictly tailored for specific corporate job applications. Dominant in the US and Canada.</li>
                <li><strong>CV (Curriculum Vitae):</strong> A comprehensive, multi-page chronological document covering your entire academic, publication, and professional history. The absolute standard in Europe, Asia, and academic settings.</li>
              </ul>
              <div className="tip-highlight">💡 <strong>Pro Tip:</strong> Resume Rocket dynamically creates documents that scale beautifully for both formats! Choose a denser template (like Corporate) for a CV, or a minimalist template for a standard US Resume.</div>
            </SectionReveal>

            <SectionReveal id="step-2">
              <h2><FiEdit3 /> Step 2: Craft a Compelling Outline</h2>
              <p>Your personal statement or professional summary sits at the absolute top of your document. It is arguably the most valuable real estate on the page and the very first thing recruiters read. Make it hit hard.</p>
              <h3>Formula for a Great Summary:</h3>
              <ul className="resource-list">
                <li>State your professional identity explicitly (e.g., "Senior Software Engineer")</li>
                <li>Declare your total years of experience and primary domain</li>
                <li>Highlight your top 2-3 massive achievements or quantifiable strengths</li>
                <li>Conclude with what exact value you are looking to bring to them</li>
              </ul>
              <div className="tip-highlight"><strong>Example:</strong> "Results-driven marketing manager with 8+ years of experience in B2B SaaS. Proven track record of growing enterprise revenue by 150% and managing cross-functional teams of 20+. Seeking a VP of Marketing role to drive strategic growth."</div>
            </SectionReveal>

            <SectionReveal id="step-3">
              <h2><FiLayers /> Step 3: Structure Your Experience</h2>
              <p>This is the literal meat of your CV. Recruiters scan this section looking for impact, not responsibilities. Every single position listed should strictly follow this architectural pattern:</p>
              <ul className="resource-list">
                <li><strong>Job title</strong> — Clear, recognizable, and industry-standard</li>
                <li><strong>Company name</strong> — With a brief 1-sentence context description if it's a startup or not well-known</li>
                <li><strong>Dates</strong> — Month/Year format is mandatory for ATS systems</li>
                <li><strong>Achievements</strong> — 3-5 bullet points prioritizing quantified numbers and percentages</li>
              </ul>
              <p>Always list your experience in reverse chronological order — meaning your most recent overarching job is at the very top.</p>
            </SectionReveal>

            <SectionReveal id="step-4">
              <h2><FiGrid /> Step 4: Organize Your Skills</h2>
              <p>A chaotic list of 40 comma-separated skills is visually paralyzing and frustrating to read. Group your capabilities into distinct, clear categories for maximum scanning impact:</p>
              <ul className="resource-list">
                <li><strong>Technical Skills:</strong> Programming languages, software stacks, heavy machinery frameworks</li>
                <li><strong>Soft Skills:</strong> Leadership methodologies, cross-functional communication, Agile</li>
                <li><strong>Industry Hard-Skills:</strong> Domain-specific conceptual knowledge, compliance, and core certifications</li>
                <li><strong>Languages:</strong> Only include if strictly relevant, always attaching proficiency levels (e.g., "Native", "B2")</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="step-5">
              <h2><FiTrendingUp /> Step 5: Highlight Education & Certs</h2>
              <p>Include your educational background in reverse chronological order. Context matters immensely here: for experienced professionals (5+ years), education should be extremely brief. For recent college graduates, it should be highly detailed and anchored to the top.</p>
              <ul className="resource-list">
                <li>Full Degree Name and isolated Field of Study</li>
                <li>Institution name and localized dates</li>
                <li>GPA (Only if it is objectively impressive — generally 3.5+ out of 4.0)</li>
                <li>Any critical professional certifications (AWS, PMP, Series 7, Google Analytics, etc.)</li>
              </ul>
            </SectionReveal>

            <SectionReveal id="step-6">
              <h2><FiFileText /> Step 6: Proofread and Polish</h2>
              <p>A single typo can cost you the interview. Because a Resume represents your attention to detail, a typo implies you lack it. Before you even think about submitting:</p>
              <ul className="resource-list">
                <li>Read your CV out loud verbally to catch awkward synthetic phrasing</li>
                <li>Run it through strict grammar algorithms (Grammarly, Hemingway App)</li>
                <li>Ask a senior friend or industry mentor to aggressively review it</li>
                <li>Ensure absolutely consistent formatting (Are periods at the end of all bullets or none?)</li>
                <li>Test your PDF export to verify proper A4 layout and clipping boundaries</li>
              </ul>
            </SectionReveal>

            <div className="resource-cta">
              <h3>Put This Guide Into Action Immediately</h3>
              <p>Why wait? You have the knowledge, now use the ultimate tool. Create your professional architectural CV right now — completely free and local within Resume Rocket.</p>
              <Link to="/builder" className="btn btn-primary btn-lg">Build Your CV Now →</Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
