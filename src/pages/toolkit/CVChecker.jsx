import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiAlertTriangle, FiCheck, FiChevronDown, FiChevronRight, FiInfo, FiRefreshCw, FiUser, FiX, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { auditResume } from '../../utils/cvAuditRules';
import { useResume } from '../../contexts/ResumeContext';
import './CVChecker.css';
const defaultForm = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  summary: '',
  skills: '',
  experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
  education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '' }]
};
function ScoreRing({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 70 ? 'var(--md-sys-color-success)' : percentage >= 40 ? 'var(--md-sys-color-warning)' : 'var(--md-sys-color-error)';
  return <div className="score-ring-container">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--md-sys-color-surface-container-high)" strokeWidth="10" />
        <motion.circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} transform="rotate(-90 70 70)" />
      </svg>
      <div className="score-ring-text">
        <span className="score-ring-number" style={{ color }}>{percentage}</span>
        <span className="score-ring-label">/100</span>
      </div>
    </div>;
}
function AuditCategory({ category, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const passCount = category.rules.filter(r => r.status === 'pass').length;
  const total = category.rules.length;
  return <div className={`audit-category glass-card ${open ? 'open' : ''}`}>
      <button className="audit-category-header" onClick={() => setOpen(!open)}>
        <div className="audit-category-info">
          <span className="audit-category-name">{category.label}</span>
          <span className="audit-category-score">{category.points}/{category.max}</span>
        </div>
        <div className="audit-category-meta">
          <span className="audit-category-pass-count">{passCount}/{total} passed</span>
          {open ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {open && <motion.div className="audit-category-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            {category.rules.map((rule, i) => <div key={i} className={`audit-rule audit-rule-${rule.status}`}>
                <span className="audit-rule-icon">
                  {rule.status === 'pass' ? <FiCheck size={16} /> : rule.status === 'warn' ? <FiAlertTriangle size={16} /> : <FiX size={16} />}
                </span>
                <div className="audit-rule-content">
                  <span className="audit-rule-label">{rule.label}</span>
                  <span className="audit-rule-msg">{rule.message}</span>
                </div>
              </div>)}
          </motion.div>}
      </AnimatePresence>
    </div>;
}
export default function CVChecker() {
  const toast = useToast();
  const resumeCtx = useResume();
  const resumeData = resumeCtx?.resume || null;
  const [mode, setMode] = useState('connected');
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [audited, setAudited] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const updateExp = (idx, key, val) => setForm(prev => {
    const exp = [...prev.experience];
    exp[idx] = { ...exp[idx], [key]: val };
    return { ...prev, experience: exp };
  });
  const updateEdu = (idx, key, val) => setForm(prev => {
    const edu = [...prev.education];
    edu[idx] = { ...edu[idx], [key]: val };
    return { ...prev, education: edu };
  });

  const runAudit = (data) => {
    const r = auditResume(data);
    setResult(r);
    setAudited(true);
    toast.success(`CV Score: ${r.percentage}/100`);
  };

  const handleConnectedAudit = () => {
    if (!resumeData) {
      toast.error('No resume data found. Switch to Manual Input or build a resume first.');
      return;
    }
    runAudit(resumeData);
  };

  const handleManualAudit = () => {
    const mapped = {
      personalInfo: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        linkedin: form.linkedin,
        summary: form.summary
      },
      experience: form.experience.filter(e => e.company || e.position || e.description),
      education: form.education.filter(e => e.institution || e.degree),
      skills: form.skills ? [{ category: 'Technical', items: form.skills }] : [],
      projects: [],
      certifications: [],
      languages: [],
      sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'skills']
    };
    runAudit(mapped);
  };

  return <motion.div className="page-wrapper builder-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="cv-layout">
        <div className="cv-editor">
          <div className="editor-header">
            <h2><FiZap style={{ verticalAlign: 'middle', marginRight: 8 }} />CV Checker & ATS Auditor</h2>
            <p>Get a detailed audit of your resume with actionable improvement tips.</p>
          </div>

          <div className="cv-mode-toggle">
            <button className={`cv-mode-btn ${mode === 'connected' ? 'active' : ''}`} onClick={() => setMode('connected')}>
              <FiUser size={16} /> Scan My Resume
            </button>
            <button className={`cv-mode-btn ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>
              <FiInfo size={16} /> Manual Input
            </button>
          </div>

          {mode === 'connected' ? <div className="cv-connected">
              <div className="cv-connected-banner glass">
                <FiZap size={20} />
                <div>
                  <strong>Analyzing your active resume</strong>
                  <p>{resumeData?.personalInfo?.fullName ? `Resume: ${resumeData.personalInfo.fullName}` : 'No resume loaded in builder yet.'}</p>
                </div>
              </div>
              {resumeData && <div className="cv-connected-preview">
                  <div className="grid-2">
                    <div className="form-group"><label>Name</label><input className="glass-input" value={resumeData.personalInfo?.fullName || ''} disabled /></div>
                    <div className="form-group"><label>Title</label><input className="glass-input" value={resumeData.personalInfo?.title || ''} disabled /></div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group"><label>Email</label><input className="glass-input" value={resumeData.personalInfo?.email || ''} disabled /></div>
                    <div className="form-group"><label>Phone</label><input className="glass-input" value={resumeData.personalInfo?.phone || ''} disabled /></div>
                  </div>
                </div>}
              <motion.button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} onClick={handleConnectedAudit} whileTap={{ scale: 0.98 }}>
                <FiZap size={18} /> Run Audit
              </motion.button>
            </div> : <div className="cv-manual">
              <div className="cv-manual-form">
                <div className="grid-2">
                  <div className="form-group"><label>Full Name</label><input className="glass-input" placeholder="John Doe" value={form.fullName} onChange={e => update('fullName', e.target.value)} /></div>
                  <div className="form-group"><label>Email</label><input className="glass-input" placeholder="john@example.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
                </div>
                <div className="grid-2">
                  <div className="form-group"><label>Phone</label><input className="glass-input" placeholder="+880 1XXX XXXXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                  <div className="form-group"><label>Location</label><input className="glass-input" placeholder="Dhaka, Bangladesh" value={form.location} onChange={e => update('location', e.target.value)} /></div>
                </div>
                <div className="form-group"><label>LinkedIn URL</label><input className="glass-input" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => update('linkedin', e.target.value)} /></div>
                <div className="form-group"><label>Professional Summary</label><textarea className="glass-input" rows={3} placeholder="Experienced software engineer with 5+ years..." value={form.summary} onChange={e => update('summary', e.target.value)} /></div>
                <div className="form-group"><label>Skills (comma-separated)</label><input className="glass-input" placeholder="React, Node.js, Python, AWS" value={form.skills} onChange={e => update('skills', e.target.value)} /></div>

                <h4 style={{ margin: '12px 0 8px', color: 'var(--text-secondary)' }}>Experience</h4>
                {form.experience.map((exp, i) => <div key={i} className="cv-manual-entry glass" style={{ padding: 12, marginBottom: 8 }}>
                    <div className="grid-2" style={{ marginBottom: 8 }}>
                      <input className="glass-input" placeholder="Company" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                      <input className="glass-input" placeholder="Position" value={exp.position} onChange={e => updateExp(i, 'position', e.target.value)} />
                    </div>
                    <div className="grid-2" style={{ marginBottom: 8 }}>
                      <input className="glass-input" placeholder="Start Date" value={exp.startDate} onChange={e => updateExp(i, 'startDate', e.target.value)} />
                      <input className="glass-input" placeholder="End Date" value={exp.endDate} onChange={e => updateExp(i, 'endDate', e.target.value)} />
                    </div>
                    <textarea className="glass-input" rows={2} placeholder="Describe your role and achievements..." value={exp.description} onChange={e => updateExp(i, 'description', e.target.value)} />
                  </div>)}
                <h4 style={{ margin: '12px 0 8px', color: 'var(--text-secondary)' }}>Education</h4>
                {form.education.map((edu, i) => <div key={i} className="cv-manual-entry glass" style={{ padding: 12, marginBottom: 8 }}>
                    <div className="grid-2" style={{ marginBottom: 8 }}>
                      <input className="glass-input" placeholder="Institution" value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} />
                      <input className="glass-input" placeholder="Degree" value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} />
                    </div>
                    <div className="grid-2">
                      <input className="glass-input" placeholder="Start Date" value={edu.startDate} onChange={e => updateEdu(i, 'startDate', e.target.value)} />
                      <input className="glass-input" placeholder="End Date" value={edu.endDate} onChange={e => updateEdu(i, 'endDate', e.target.value)} />
                    </div>
                  </div>)}
              </div>
              <motion.button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} onClick={handleManualAudit} whileTap={{ scale: 0.98 }}>
                <FiZap size={18} /> Run Audit
              </motion.button>
            </div>}

          {audited && result && <div style={{ marginTop: 16 }}>
              <motion.button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => mode === 'connected' ? handleConnectedAudit() : handleManualAudit()} whileTap={{ scale: 0.98 }}>
                <FiRefreshCw size={16} /> Re-Scan
              </motion.button>
            </div>}
        </div>

        <div className="cv-results">
          {!audited ? <div className="cv-placeholder">
              <FiZap size={48} />
              <p>Run an audit to see your CV score</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fill in your resume details and click "Run Audit"</p>
            </div> : result && <div className="cv-results-content">
              <div className="cv-score-section">
                <ScoreRing percentage={result.percentage} />
                <p className="cv-score-label" style={{ color: result.percentage >= 70 ? 'var(--success)' : result.percentage >= 40 ? 'var(--warning)' : 'var(--error)' }}>
                  {result.percentage >= 80 ? 'Excellent! Your resume is well-optimized.' :
                   result.percentage >= 60 ? 'Good — a few improvements needed.' :
                   result.percentage >= 40 ? 'Fair — several areas need attention.' :
                   'Needs significant improvement.'}
                </p>
              </div>

              <div className="cv-categories">
                {result.categories.map((cat, i) => <AuditCategory key={i} category={cat} defaultOpen={i === 0 || cat.points < cat.max} />)}
              </div>

              {result.issues.length > 0 && <div className="cv-issues">
                  <h4>Issues to Fix ({result.issues.length})</h4>
                  <div className="cv-issues-list">
                    {result.issues.map((issue, i) => <div key={i} className={`cv-issue-item cv-issue-${issue.status}`}>
                        {issue.status === 'warn' ? <FiAlertTriangle size={14} /> : <FiX size={14} />}
                        <div>
                          <strong>{issue.label}</strong>
                          <p>{issue.message}</p>
                        </div>
                      </div>)}
                  </div>
                </div>}

              <Link to="/builder" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
                Go to Resume Builder <FiZap />
              </Link>
            </div>}
        </div>
      </div>
    </motion.div>;
}
