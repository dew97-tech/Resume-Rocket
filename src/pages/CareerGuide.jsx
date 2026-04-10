import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCompass, FiMapPin, FiMessageCircle, FiTarget, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './ResourcePage.css';

export default function CareerGuide() {
  return <motion.div className="page-wrapper resource-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div className="container">
      <div className="resource-hero">
        <h1>Career Development <span className="gradient-text">Guide</span></h1>
        <p>Strategic advice to help you navigate your career path, from job hunting to professional growth.</p>
      </div>

      <div className="resource-card">
        <h2><FiCompass /> Define Your Career Vision</h2>
        <p>Before diving into job applications, take time to reflect on where you want to be in 1, 3, and 5 years. A clear vision helps you make strategic decisions about which roles to pursue.</p>
        <h3>Key questions to ask yourself:</h3>
        <ul>
          <li>What kind of work energizes me?</li>
          <li>What skills do I want to develop?</li>
          <li>What company culture fits my personality?</li>
          <li>What is my ideal work-life balance?</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiUsers /> Build Your Professional Network</h2>
        <p>Many job opportunities are never posted publicly. Building a strong network gives you access to the hidden job market.</p>
        <ul>
          <li>Attend industry events, meetups, and conferences</li>
          <li>Engage actively on LinkedIn — comment, share, and create content</li>
          <li>Join professional communities and Slack groups</li>
          <li>Reach out to people in roles you aspire to for informational interviews</li>
          <li>Follow up with connections regularly, not just when you need something</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiTarget /> Master the Job Search Process</h2>
        <p>A strategic, organized job search outperforms a scattered approach every time.</p>
        <h3>Effective job search habits:</h3>
        <ul>
          <li>Set a daily target (e.g., apply to 3-5 quality jobs per day)</li>
          <li>Customize your resume and cover letter for each application</li>
          <li>Track your applications in a spreadsheet or tool</li>
          <li>Follow up 1 week after applying if you haven't heard back</li>
          <li>Prepare thoroughly for every interview — research the company deeply</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiMessageCircle /> Interview Like a Pro</h2>
        <p>Interviews are your chance to tell your story and demonstrate your value.</p>
        <ul>
          <li><strong>The STAR Method:</strong> Structure your answers with Situation, Task, Action, Result</li>
          <li><strong>Research extensively:</strong> Know the company's products, culture, competitors, and recent news</li>
          <li><strong>Prepare questions:</strong> Ask about growth opportunities, team dynamics, and challenges</li>
          <li><strong>Body language:</strong> Maintain eye contact, sit up straight, and smile naturally</li>
          <li><strong>Follow up:</strong> Send a personalized thank-you email within 24 hours</li>
        </ul>
        <div className="tip-highlight">💡 Use ResumeForge's cover letter generator to create personalized cover letters for each application.</div>
      </div>

      <div className="resource-card">
        <h2><FiArrowUpRight /> Negotiate Your Compensation</h2>
        <p>Most employers expect negotiation. Don't leave money on the table.</p>
        <ul>
          <li>Research salary ranges on Glassdoor, Levels.fyi, and PayScale</li>
          <li>Consider the total package: base salary, bonuses, equity, benefits, PTO</li>
          <li>Practice your negotiation pitch with a friend</li>
          <li>Be confident but professional — frame it as a collaborative discussion</li>
          <li>Get the final offer in writing before accepting</li>
        </ul>
      </div>

      <div className="resource-card">
        <h2><FiMapPin /> Invest in Continuous Learning</h2>
        <p>The most successful professionals never stop learning. Invest in yourself to stay relevant and advance.</p>
        <ul>
          <li>Take online courses (Coursera, Udemy, LinkedIn Learning)</li>
          <li>Earn industry certifications (AWS, Google, HubSpot, PMP)</li>
          <li>Read books and listen to podcasts in your field</li>
          <li>Build side projects to showcase new skills</li>
          <li>Seek mentorship from senior professionals</li>
        </ul>
      </div>

      <div className="resource-cta">
        <h3>Start Your Career Journey Today</h3>
        <p>The right resume opens the right doors. Build yours for free with ResumeForge.</p>
        <Link to="/builder" className="btn btn-primary btn-lg">Create Your Resume →</Link>
      </div>
    </div>
  </motion.div>;
}
