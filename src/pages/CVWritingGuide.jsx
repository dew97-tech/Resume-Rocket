import { motion } from 'framer-motion';
import { FiBook, FiEdit3, FiFileText, FiGrid, FiLayers, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './ResourcePage.css';

export default function CVWritingGuide() {
  return <motion.div className="page-wrapper resource-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div className="container">
      <div className="resource-hero">
        <h1>Complete CV <span className="gradient-text">Writing Guide</span></h1>
        <p>A step-by-step guide to writing a CV that opens doors to your dream career.</p>
      </div>

      <div className="resource-card">
        <h2><FiBook /> Step 1: Understand the Difference — CV vs. Resume</h2>
        <p>While the terms are often used interchangeably, there's a key distinction:</p>
        <ul>
          <li><strong>Resume:</strong> A concise 1-2 page document tailored for specific job applications, common in the US and Canada.</li>
          <li><strong>CV (Curriculum Vitae):</strong> A comprehensive document covering your entire academic and professional history, standard in Europe, Asia, and academic settings.</li>
        </ul>
        <div className="tip-highlight">💡 ResumeForge creates documents that work perfectly for both formats. Choose the template that best fits your region and industry.</div>
      </div>

      <div className="resource-card">
        <h2><FiEdit3 /> Step 2: Craft a Compelling Personal Statement</h2>
        <p>Your personal statement or professional summary sits at the top of your CV and is the first thing recruiters read. Make it count.</p>
        <h3>Formula for a Great Summary:</h3>
        <ol>
          <li>Your professional identity (e.g., "Senior Software Engineer")</li>
          <li>Years of experience and key domain</li>
          <li>Your top 2-3 achievements or strengths</li>
          <li>What you're looking for</li>
        </ol>
        <div className="tip-highlight">Example: "Results-driven marketing manager with 8+ years of experience in B2B SaaS. Proven track record of growing enterprise revenue by 150% and managing cross-functional teams of 20+. Seeking a VP of Marketing role to drive strategic growth."</div>
      </div>

      <div className="resource-card">
        <h2><FiLayers /> Step 3: Structure Your Experience Section</h2>
        <p>This is the meat of your CV. Each position should follow this pattern:</p>
        <ul>
          <li><strong>Job title</strong> — Clear and recognizable</li>
          <li><strong>Company name</strong> — With a brief description if it's not well-known</li>
          <li><strong>Dates</strong> — Month/Year format</li>
          <li><strong>Achievements</strong> — 3-5 bullet points with quantified results</li>
        </ul>
        <p>Always list your experience in reverse chronological order — most recent first.</p>
      </div>

      <div className="resource-card">
        <h2><FiGrid /> Step 4: Organize Your Skills Effectively</h2>
        <p>Group your skills into clear categories for maximum impact:</p>
        <ul>
          <li><strong>Technical Skills:</strong> Programming languages, tools, frameworks</li>
          <li><strong>Soft Skills:</strong> Leadership, communication, problem-solving</li>
          <li><strong>Industry Skills:</strong> Domain-specific knowledge and certifications</li>
          <li><strong>Languages:</strong> Include proficiency levels</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiTrendingUp /> Step 5: Highlight Education & Certifications</h2>
        <p>Include your educational background in reverse chronological order. For experienced professionals, education can be brief. For recent graduates, it should be detailed.</p>
        <ul>
          <li>Degree and field of study</li>
          <li>Institution name and dates</li>
          <li>GPA (if impressive — generally 3.5+)</li>
          <li>Relevant coursework, honors, or thesis topics</li>
          <li>Professional certifications (AWS, PMP, Google Analytics, etc.)</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiFileText /> Step 6: Proofread and Polish</h2>
        <p>A single typo can cost you the interview. Before submitting:</p>
        <ul>
          <li>Read your CV out loud to catch awkward phrasing</li>
          <li>Use spell-check tools (Grammarly, Hemingway)</li>
          <li>Ask a friend or mentor to review</li>
          <li>Ensure consistent formatting, dates, and punctuation</li>
          <li>Test your PDF export to verify proper layout</li>
        </ul>
      </div>

      <div className="resource-cta">
        <h3>Put This Guide Into Action</h3>
        <p>Create your professional CV right now — it's completely free with ResumeForge.</p>
        <Link to="/builder" className="btn btn-primary btn-lg">Build Your CV Now →</Link>
      </div>
    </div>
  </motion.div>;
}
