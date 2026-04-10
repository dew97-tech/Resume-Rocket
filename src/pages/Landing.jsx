import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiCheck, FiChevronLeft, FiChevronRight, FiDownload, FiEdit3, FiLayout, FiMoon, FiShield, FiStar, FiZap, FiDroplet } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Landing.css';
function RevealSection({
  children,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  return <motion.div ref={ref} className={className} initial={{
    opacity: 0,
    y: 60
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }}>
      {children}
    </motion.div>;
}
function FloatingShapes() {
  const shapes = [{
    size: 300,
    x: '10%',
    y: '20%',
    delay: 0,
    color: 'var(--gradient-start)'
  }, {
    size: 200,
    x: '80%',
    y: '10%',
    delay: 1,
    color: 'var(--gradient-mid)'
  }, {
    size: 150,
    x: '70%',
    y: '70%',
    delay: 2,
    color: 'var(--gradient-end)'
  }, {
    size: 100,
    x: '20%',
    y: '75%',
    delay: 0.5,
    color: 'var(--accent-light)'
  }];
  return <div className="floating-shapes">
      {shapes.map((s, i) => <motion.div key={i} className="floating-shape" style={{
      width: s.size,
      height: s.size,
      left: s.x,
      top: s.y,
      background: `radial-gradient(circle, ${s.color}22, transparent 70%)`
    }} animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 6,
      delay: s.delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />)}
    </div>;
}
const features = [{
  icon: <FiLayout size={28} />,
  title: '5+ Premium Templates',
  desc: 'Professional designs from classic to creative — all polished and ATS-friendly.'
}, {
  icon: <FiEdit3 size={28} />,
  title: 'Real-Time Editor',
  desc: 'See your changes instantly with our split-screen live preview editor.'
}, {
  icon: <FiDownload size={28} />,
  title: 'PDF Export',
  desc: 'Download your resume and cover letter as perfectly formatted PDF files.'
}, {
  icon: <FiDroplet size={28} />,
  title: 'Match Your Vibe',
  desc: 'Dynamically shift your aesthetic on the fly with custom Accent Colors and seamless Dark/Light mode integration.'
}, {
  icon: <FiZap size={28} />,
  title: 'Smart Cover Letters',
  desc: 'Generate tailored cover letters with AI-powered template suggestions.'
}, {
  icon: <FiShield size={28} />,
  title: '100% Free & Private',
  desc: 'No hidden fees, no watermarks, no data sent to servers. Your data stays local.'
}];
const testimonials = [{
  name: 'Sarah Chen',
  role: 'Software Engineer at Google',
  text: 'ResumeForge helped me land my dream job. The templates are stunning and the real-time preview saved me hours of formatting.',
  avatar: 'SC',
  color: '#7c5cfc'
}, {
  name: 'Marcus Johnson',
  role: 'Marketing Director',
  text: 'I\'ve tried every resume builder out there. This is the only one that looks truly professional AND is completely free. Unbelievable.',
  avatar: 'MJ',
  color: '#c084fc'
}, {
  name: 'Priya Patel',
  role: 'UX Designer at Figma',
  text: 'The cover letter generator is a game-changer. I customized a beautiful letter in minutes. The glassmorphism design is gorgeous!',
  avatar: 'PP',
  color: '#f472b6'
}, {
  name: 'James Williams',
  role: 'Data Scientist',
  text: 'Clean, modern, and incredibly fast. The PDF exports look pixel-perfect. This is enterprise-quality software for free.',
  avatar: 'JW',
  color: '#34d399'
}];
export default function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <motion.div className="page-wrapper landing" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.4
  }}>

      <section className="hero section">
        <FloatingShapes />
        <div className="container hero-content">
          <motion.div className="hero-badge glass" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <FiZap size={14} />
            <span>100% Free — No Credit Card Required</span>
          </motion.div>

          <motion.h1 className="hero-title" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}>
            Build Your Perfect <br />
            <span className="gradient-text">Resume in Minutes</span>
          </motion.h1>

          <motion.p className="hero-subtitle" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }}>
            Create stunning, ATS-friendly resumes and cover letters with our
            premium builder. Professional templates, real-time preview, and
            instant PDF export — all completely free.
          </motion.p>

          <motion.div className="hero-cta" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }}>
            <Link to="/builder" className="btn btn-primary btn-lg" id="hero-cta-primary">
              Start Building <FiArrowRight />
            </Link>
            <Link to="/cover-letter" className="btn btn-secondary btn-lg">
              Cover Letter Generator
            </Link>
          </motion.div>

          <motion.div className="hero-stats" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1
        }}>
            <div className="stat">
              <span className="stat-number gradient-text">50K+</span>
              <span className="stat-label">Resumes Created</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number gradient-text">5</span>
              <span className="stat-label">Pro Templates</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number gradient-text">100%</span>
              <span className="stat-label">Free Forever</span>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="section features-section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title">
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p className="section-subtitle">
              Powerful tools designed to make resume building effortless and enjoyable.
            </p>
          </RevealSection>

          <div className="features-grid">
            {features.map((f, i) => <RevealSection key={i}>
                <motion.div className="feature-card glass-card" whileHover={{
              y: -8,
              scale: 1.02
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}>
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </motion.div>
              </RevealSection>)}
          </div>
        </div>
      </section>


      <section className="section testimonials-section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title">
              Loved by <span className="gradient-text">Professionals</span>
            </h2>
            <p className="section-subtitle">
              Join thousands who've transformed their careers with ResumeForge.
            </p>
          </RevealSection>

          <div className="testimonials-carousel">
            <button className="carousel-btn carousel-prev" onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">
              <FiChevronLeft size={20} />
            </button>

            <div className="testimonial-window">
              <motion.div className="testimonial-card glass-card" key={currentTestimonial} initial={{
              opacity: 0,
              x: 60
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -60
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => <FiStar key={i} size={16} fill="var(--warning)" stroke="var(--warning)" />)}
                </div>
                <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{
                  background: testimonials[currentTestimonial].color
                }}>
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="testimonial-name">{testimonials[currentTestimonial].name}</div>
                    <div className="testimonial-role">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <button className="carousel-btn carousel-next" onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} aria-label="Next testimonial">
              <FiChevronRight size={20} />
            </button>

            <div className="carousel-dots">
              {testimonials.map((_, i) => <button key={i} className={`carousel-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Go to testimonial ${i + 1}`} />)}
            </div>
          </div>
        </div>
      </section>


      <section className="section pricing-section">
        <div className="container">
          <RevealSection>
            <h2 className="section-title">
              Free Forever. <span className="gradient-text">No Catch.</span>
            </h2>
            <p className="section-subtitle">
              We believe everyone deserves access to professional resume tools — zero cost, zero compromise.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="pricing-cards">
              <div className="pricing-card glass-card pricing-others">
                <div className="pricing-label">Other Tools</div>
                <div className="pricing-price">
                  <span className="price-amount" style={{
                  textDecoration: 'line-through',
                  color: 'var(--text-muted)'
                }}>$24</span>
                  <span className="price-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li className="pricing-feature disabled"><FiCheck size={16} /> Limited templates</li>
                  <li className="pricing-feature disabled"><FiCheck size={16} /> Watermarked PDFs</li>
                  <li className="pricing-feature disabled"><FiCheck size={16} /> Requires account</li>
                  <li className="pricing-feature disabled"><FiCheck size={16} /> Data stored on servers</li>
                  <li className="pricing-feature disabled"><FiCheck size={16} /> Basic customization</li>
                </ul>
              </div>

              <div className="pricing-card glass-card pricing-ours featured">
                <div className="pricing-glow-border" />
                <div className="pricing-badge pricing-badge-animated">✨ FREE FOREVER ✨</div>
                <div className="pricing-label gradient-text" style={{
                fontWeight: 700,
                fontSize: '1.3rem'
              }}>ResumeForge</div>
                <div className="pricing-price">
                  <span className="price-amount gradient-text price-pulse">$0</span>
                  <span className="price-period">/forever</span>
                </div>
                <ul className="pricing-features">
                  <li className="pricing-feature"><FiCheck size={16} /> All 5+ premium templates</li>
                  <li className="pricing-feature"><FiCheck size={16} /> Unlimited PDF exports</li>
                  <li className="pricing-feature"><FiCheck size={16} /> No account needed</li>
                  <li className="pricing-feature"><FiCheck size={16} /> 100% private & local</li>
                  <li className="pricing-feature"><FiCheck size={16} /> Cover letter generator</li>
                  <li className="pricing-feature"><FiCheck size={16} /> Dark & light themes</li>
                  <li className="pricing-feature"><FiCheck size={16} /> 20+ fonts & colors</li>
                  <li className="pricing-feature"><FiCheck size={16} /> Drag & drop reordering</li>
                  <li className="pricing-feature"><FiCheck size={16} /> JSON import/export</li>
                </ul>
                <Link to="/builder" className="btn btn-primary btn-lg" style={{
                width: '100%',
                marginTop: 16,
                fontSize: '1.05rem',
                letterSpacing: '0.5px'
              }}>
                  Start Building Free <FiArrowRight />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>


      <section className="section final-cta-section">
        <div className="container">
          <RevealSection>
            <div className="final-cta glass-card">
              <h2 className="final-cta-title">
                Ready to Build Your <span className="gradient-text">Dream Resume?</span>
              </h2>
              <p className="final-cta-text">
                Join 50,000+ professionals who've already created stunning resumes with ResumeForge.
              </p>
              <Link to="/builder" className="btn btn-primary btn-lg">
                Start Building Now <FiArrowRight />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </motion.div>;
}
