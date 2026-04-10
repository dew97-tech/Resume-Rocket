import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText, FiLayout, FiStar, FiTarget, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './ResourcePage.css';

export default function ResumeTips() {
  return <motion.div className="page-wrapper resource-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div className="container">
      <div className="resource-hero">
        <h1>Resume Tips & <span className="gradient-text">Best Practices</span></h1>
        <p>Expert advice to help you craft a resume that gets noticed by recruiters and hiring managers.</p>
      </div>

      <div className="resource-card">
        <h2><FiTarget /> Tailor Your Resume for Each Job</h2>
        <p>One of the biggest mistakes job seekers make is using the same resume for every application. Study the job description carefully and customize your resume to highlight relevant skills and experience.</p>
        <div className="tip-highlight">💡 Pro Tip: Mirror the exact keywords from the job posting in your resume. Many companies use ATS (Applicant Tracking Systems) that scan for specific terms.</div>
      </div>

      <div className="resource-card">
        <h2><FiStar /> Lead with Strong Action Verbs</h2>
        <p>Start each bullet point in your experience section with a powerful action verb. This makes your accomplishments more dynamic and impactful.</p>
        <h3>Examples of Strong Action Verbs:</h3>
        <ul>
          <li><strong>Led</strong> — "Led a team of 15 engineers to deliver the project 2 weeks ahead of schedule"</li>
          <li><strong>Increased</strong> — "Increased quarterly revenue by 32% through targeted marketing campaigns"</li>
          <li><strong>Developed</strong> — "Developed an automated testing framework that reduced QA time by 60%"</li>
          <li><strong>Optimized</strong> — "Optimized database queries resulting in 3x faster page load times"</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiZap /> Quantify Your Achievements</h2>
        <p>Numbers speak louder than words. Whenever possible, include specific metrics and data to demonstrate your impact.</p>
        <h3>Instead of vague descriptions:</h3>
        <ul>
          <li>❌ "Managed a team and improved performance"</li>
          <li>✅ "Managed a team of 12 and improved team productivity by 40% over 6 months"</li>
          <li>❌ "Helped increase sales"</li>
          <li>✅ "Generated $2.5M in new revenue through strategic client acquisition"</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiLayout /> Keep It Clean and Scannable</h2>
        <p>Recruiters spend an average of 6-7 seconds on an initial resume scan. Make sure your layout is clean, well-organized, and easy to skim.</p>
        <ul>
          <li>Use clear section headings with visual hierarchy</li>
          <li>Keep bullet points concise — 1-2 lines maximum</li>
          <li>Use consistent formatting throughout</li>
          <li>Leave adequate white space for readability</li>
          <li>Stick to professional fonts like Inter, Roboto, or Poppins</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiFileText /> The Perfect Resume Length</h2>
        <p>For most professionals with 5-15 years of experience, a 2-page resume is ideal. Fresh graduates should aim for 1 page. Senior executives may use up to 3 pages.</p>
        <div className="tip-highlight">💡 Pro Tip: ResumeForge automatically handles pagination, flowing your content across multiple pages without awkward breaks.</div>
      </div>

      <div className="resource-card">
        <h2><FiCheckCircle /> Essential Sections Checklist</h2>
        <ul>
          <li>✅ Contact information (email, phone, LinkedIn, portfolio)</li>
          <li>✅ Professional summary or objective (2-3 sentences)</li>
          <li>✅ Work experience (reverse chronological order)</li>
          <li>✅ Education</li>
          <li>✅ Skills (categorized: technical, soft skills, tools)</li>
          <li>✅ Projects (especially for tech roles)</li>
          <li>✅ Certifications and languages (if relevant)</li>
        </ul>
      </div>

      <div className="resource-cta">
        <h3>Ready to Apply These Tips?</h3>
        <p>Build your polished, professional resume in minutes with ResumeForge — 100% free.</p>
        <Link to="/builder" className="btn btn-primary btn-lg">Start Building Now →</Link>
      </div>
    </div>
  </motion.div>;
}
