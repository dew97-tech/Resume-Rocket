import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit3,
  FiLayout,
  FiShield,
  FiStar,
  FiZap,
  FiDroplet,
  FiAward,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Landing.css';

function RevealSection({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: <FiLayout size={28} />,
    title: '10+ ATS Templates',
    desc: 'From classic corporate to creative portfolio designs — all 100% ATS compliant.',
    color: 'var(--neo-yellow)',
    badge: 'ATS VERIFIED',
  },
  {
    icon: <FiEdit3 size={28} />,
    title: 'Real-Time Editor',
    desc: 'See instant live changes side-by-side with our split-screen WYSIWYG workspace.',
    color: 'var(--neo-cyan)',
    badge: 'LIVE SYNC',
  },
  {
    icon: <FiDownload size={28} />,
    title: 'Vector PDF Export',
    desc: 'Download high-resolution, un-watermarked PDFs ready for recruiter inboxes.',
    color: 'var(--neo-pink)',
    badge: 'PIXEL PERFECT',
  },
  {
    icon: <FiDroplet size={28} />,
    title: 'Neobrutalist Vibes',
    desc: 'Customize color palettes, switch between Paper and Cyber Dark themes effortlessly.',
    color: 'var(--neo-green)',
    badge: 'THEMEABLE',
  },
  {
    icon: <FiZap size={28} />,
    title: 'Cover Letter AI',
    desc: 'Generate tailored matching cover letters with pre-built persuasive templates.',
    color: 'var(--neo-orange)',
    badge: 'SMART COPY',
  },
  {
    icon: <FiShield size={28} />,
    title: '100% Free & Local',
    desc: 'Zero paywalls, zero accounts, zero cloud trackers. Your resume data never leaves your browser.',
    color: 'var(--neo-purple)',
    badge: 'PRIVACY FIRST',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer @ Google',
    text: 'Resume Rocket helped me land interviews at three tech giants. The templates are clean and the real-time preview saved me hours.',
    avatar: 'SC',
    color: 'var(--neo-yellow)',
  },
  {
    name: 'Marcus Johnson',
    role: 'Senior Product Lead',
    text: 'Every other builder hit me with a $24/mo paywall right at download. Resume Rocket is genuinely 100% free and superior in design.',
    avatar: 'MJ',
    color: 'var(--neo-cyan)',
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer @ Figma',
    text: 'The Neobrutalist aesthetic is refreshing! The cover letter generator matched my resume styling seamlessly in just a few clicks.',
    avatar: 'PP',
    color: 'var(--neo-pink)',
  },
  {
    name: 'James Williams',
    role: 'Staff Data Scientist',
    text: 'Crisp formatting, lightning-fast controls, and perfectly formatted PDF output. The toolkit CV checker is also phenomenal.',
    avatar: 'JW',
    color: 'var(--neo-green)',
  },
];

export default function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stampActive, setStampActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="page-wrapper landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hero Section */}
      <section className="neo-hero section">
        <div className="container hero-content">
          <div className="hero-stickers-wrap">
            <span className="neo-sticker rotate-left">★ 100% FREE FOREVER</span>
            <span className="neo-sticker rotate-right" style={{ background: 'var(--neo-cyan)' }}>
              ⚡ ATS COMPLIANT
            </span>
            <span className="neo-sticker" style={{ background: 'var(--neo-green)', transform: 'rotate(1deg)' }}>
              ✓ NO ACCOUNT NEEDED
            </span>
          </div>

          <h1 className="hero-title">
            BUILD YOUR PERFECT <br />
            <span className="hero-highlight">RESUME IN MINUTES</span>
          </h1>

          <p className="hero-subtitle">
            Say goodbye to bland templates and sneaky paywalls. Resume Rocket delivers
            tactile, ATS-verified resumes and matching cover letters with zero sign-up and instant PDF downloads.
          </p>

          <div className="hero-cta">
            <Link to="/builder" className="btn btn-primary btn-lg hero-cta-btn">
              <span>START BUILDING FREE</span>
              <FiArrowRight size={20} />
            </Link>
            <Link to="/toolkit" className="btn btn-secondary btn-lg hero-cta-btn">
              <span>EXPLORE TOOLKIT</span>
              <FiZap size={18} />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="neo-stats-strip">
            <div className="neo-stat-cell">
              <span className="neo-stat-num">50,000+</span>
              <span className="neo-stat-label">Resumes Created</span>
            </div>
            <div className="neo-stat-cell">
              <span className="neo-stat-num">10+</span>
              <span className="neo-stat-label">ATS Templates</span>
            </div>
            <div className="neo-stat-cell">
              <span className="neo-stat-num">$0</span>
              <span className="neo-stat-label">Zero Hidden Costs</span>
            </div>
            <div className="neo-stat-cell">
              <span className="neo-stat-num">100%</span>
              <span className="neo-stat-label">Browser Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="neo-marquee-wrap">
        <div className="neo-marquee-inner">
          <span>⚡ INSTANT VECTOR PDF</span>
          <span>★</span>
          <span>100% LOCAL & PRIVATE</span>
          <span>★</span>
          <span>ATS SCANNER READY</span>
          <span>★</span>
          <span>ZERO PAYWALLS</span>
          <span>★</span>
          <span>LIVE PREVIEW EDITOR</span>
          <span>★</span>
          <span>COVER LETTER GENERATOR</span>
          <span>★</span>
          <span>⚡ INSTANT VECTOR PDF</span>
          <span>★</span>
          <span>100% LOCAL & PRIVATE</span>
          <span>★</span>
          <span>ATS SCANNER READY</span>
        </div>
      </div>

      {/* Features Bento Grid */}
      <section className="section features-section">
        <div className="container">
          <RevealSection>
            <div className="section-header-badge">
              <span className="neo-badge">SUPERCHARGED SUITE</span>
            </div>
            <h2 className="section-title">
              EVERYTHING YOU NEED TO <span className="highlight-pill">GET HIRED</span>
            </h2>
            <p className="section-subtitle">
              Built with precision engineering and high-contrast brutalist design to make your resume impossible to overlook.
            </p>
          </RevealSection>

          <div className="neo-bento-grid">
            {features.map((f, i) => (
              <RevealSection key={i} className="bento-cell">
                <div className="neo-bento-card" style={{ '--accent-card': f.color }}>
                  <div className="bento-top">
                    <div className="bento-icon-box">{f.icon}</div>
                    <span className="neo-badge">{f.badge}</span>
                  </div>
                  <h3 className="bento-title">{f.title}</h3>
                  <p className="bento-desc">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stamp Teaser */}
      <section className="section interactive-teaser-section">
        <div className="container">
          <RevealSection>
            <div className="interactive-stamp-box">
              <div className="stamp-box-left">
                <span className="neo-badge" style={{ background: 'var(--neo-green)' }}>
                  RECRUITER PERSPECTIVE
                </span>
                <h3 className="stamp-box-title">Pass the 6-Second Recruiter Glance</h3>
                <p className="stamp-box-desc">
                  Recruiters scan for clean hierarchies, quantified metrics, and standard ATS headers.
                  Click below to test our real-time audit checklist!
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStampActive(!stampActive)}
                >
                  <FiAward size={18} />
                  <span>{stampActive ? 'RESET AUDIT STAMP' : 'RUN MOCK ATS AUDIT'}</span>
                </button>
              </div>

              <div className="stamp-box-right">
                <div className="mock-resume-sheet">
                  <div className="mock-header-line" />
                  <div className="mock-sub-line" />
                  <div className="mock-body-para" />
                  <div className="mock-body-para" />

                  {stampActive && (
                    <motion.div
                      className="mock-stamp-badge"
                      initial={{ scale: 2, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: -8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      ★ ATS APPROVED 99% ★
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Toolkit Callout Banner */}
      <section className="section toolkit-promo-section">
        <div className="container">
          <RevealSection>
            <div className="neo-toolkit-banner">
              <div className="toolkit-banner-info">
                <span className="neo-badge" style={{ background: 'var(--neo-pink)' }}>
                  ALL-IN-ONE JOB TOOLKIT
                </span>
                <h2 className="toolkit-banner-title">
                  More Than Just A Resume Builder
                </h2>
                <p className="toolkit-banner-desc">
                  Accelerate your job search with our integrated utilities: CV Checker, Action Verb Formatter,
                  Developer README Generator, and Cold Outreach Email templates.
                </p>
                <div className="toolkit-pills-list">
                  <span className="toolkit-pill-item">✓ CV Checker</span>
                  <span className="toolkit-pill-item">✓ Experience Formatter</span>
                  <span className="toolkit-pill-item">✓ GitHub README Builder</span>
                  <span className="toolkit-pill-item">✓ Cold Email Generator</span>
                </div>
                <Link to="/toolkit" className="btn btn-primary btn-lg" style={{ marginTop: 12 }}>
                  <span>OPEN JOB TOOLKIT</span>
                  <FiArrowRight size={20} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* The Brutal Comparison Pricing */}
      <section className="section pricing-section">
        <div className="container">
          <RevealSection>
            <div className="section-header-badge">
              <span className="neo-badge">TRANSPARENCY</span>
            </div>
            <h2 className="section-title">THE BRUTAL COMPARISON</h2>
            <p className="section-subtitle">
              We never bait you with a "free trial" only to ask for your credit card when you hit download.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="neo-comparison-grid">
              {/* Other Tools */}
              <div className="comparison-card others-card">
                <div className="comparison-header">
                  <span className="comparison-badge-sad">THE OTHER GUYS</span>
                  <div className="comparison-price">
                    <span className="price-struck">$24.00</span>
                    <span className="price-sub">/ month</span>
                  </div>
                </div>
                <ul className="comparison-list">
                  <li className="comparison-item bad">✕ Watermark unless you subscribe</li>
                  <li className="comparison-item bad">✕ Forces account creation & spam emails</li>
                  <li className="comparison-item bad">✕ Hidden recurring credit card charges</li>
                  <li className="comparison-item bad">✕ Your personal data stored on their servers</li>
                  <li className="comparison-item bad">✕ Only 2 free templates</li>
                </ul>
              </div>

              {/* Resume Rocket */}
              <div className="comparison-card ours-card">
                <div className="ours-ribbon">100% FREE FOREVER</div>
                <div className="comparison-header">
                  <span className="comparison-badge-good">RESUME ROCKET</span>
                  <div className="comparison-price">
                    <span className="price-big">$0.00</span>
                    <span className="price-sub">/ forever</span>
                  </div>
                </div>
                <ul className="comparison-list">
                  <li className="comparison-item good">✓ 10+ premium ATS-friendly templates</li>
                  <li className="comparison-item good">✓ Unlimited high-res PDF exports</li>
                  <li className="comparison-item good">✓ No sign-up, no email, no card ever</li>
                  <li className="comparison-item good">✓ 100% private: data stays in your browser</li>
                  <li className="comparison-item good">✓ Matching cover letter builder included</li>
                  <li className="comparison-item good">✓ Full career toolkit with CV Checker</li>
                </ul>
                <Link to="/builder" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 16 }}>
                  <span>START BUILDING NOW</span>
                  <FiArrowRight size={20} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <RevealSection>
            <div className="section-header-badge">
              <span className="neo-badge">COMMUNITY LOVE</span>
            </div>
            <h2 className="section-title">PROVEN BY APPLICANTS</h2>
          </RevealSection>

          <div className="testimonials-carousel-wrap">
            <button
              className="neo-carousel-nav prev"
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              aria-label="Previous review"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="neo-testimonial-bubble">
              <div className="bubble-stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} fill="#000000" stroke="#000000" />
                ))}
              </div>
              <p className="bubble-text">"{testimonials[currentTestimonial].text}"</p>
              <div className="bubble-author">
                <div
                  className="bubble-avatar"
                  style={{ background: testimonials[currentTestimonial].color }}
                >
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="bubble-author-name">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="bubble-author-role">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="neo-carousel-nav next"
              onClick={() =>
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
              }
              aria-label="Next review"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Final High-Impact CTA */}
      <section className="section final-cta-section">
        <div className="container">
          <RevealSection>
            <div className="neo-final-banner">
              <h2 className="final-banner-title">
                READY TO LAND YOUR <span className="highlight-pill">NEXT ROLE?</span>
              </h2>
              <p className="final-banner-desc">
                No paywalls. No watermarks. Just a powerful, beautiful resume ready in 5 minutes.
              </p>
              <Link to="/builder" className="btn btn-dark btn-lg final-action-btn">
                <span>CREATE MY RESUME NOW</span>
                <FiArrowRight size={22} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </motion.div>
  );
}
