import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiAlertTriangle, FiCheck, FiChevronDown, FiChevronRight, FiDownload, FiFileText, FiInfo, FiPlus, FiRefreshCw, FiUser, FiX, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { auditResume, collectResumeText } from '../../utils/cvAuditRules';
import { useResume } from '../../contexts/ResumeContext';
import { parseResumeText } from '../../utils/resumeTextParser';
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

const FIX_SECTIONS = {
  contact: 'personalInfo',
  summary: 'personalInfo',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  formatting: 'experience',
  ats: 'skills',
  jd: 'skills'
};

function ScoreRing({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 70 ? 'var(--neo-green)' : percentage >= 40 ? 'var(--neo-orange)' : 'var(--neo-red)';
  return <div className="score-ring-container">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--neo-surface-dim)" strokeWidth="10" />
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
      <button className="audit-category-header" onClick={() => setOpen(!open)} aria-expanded={open}>
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
  const [jdText, setJdText] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [parsedResume, setParsedResume] = useState(null);
  const [parseInfo, setParseInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [audited, setAudited] = useState(false);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

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

  const addExp = () => setForm(prev => ({
    ...prev,
    experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
  }));
  const removeExp = (idx) => setForm(prev => prev.experience.length <= 1 ? prev : ({
    ...prev,
    experience: prev.experience.filter((_, i) => i !== idx)
  }));
  const addEdu = () => setForm(prev => ({
    ...prev,
    education: [...prev.education, { institution: '', degree: '', field: '', startDate: '', endDate: '' }]
  }));
  const removeEdu = (idx) => setForm(prev => prev.education.length <= 1 ? prev : ({
    ...prev,
    education: prev.education.filter((_, i) => i !== idx)
  }));

  const runAudit = (data) => {
    const r = auditResume(data, { jobDescription: jdText });
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

  const handlePasteAudit = () => {
    if (!pastedText.trim()) {
      toast.error('Paste your resume text first.');
      return;
    }
    const parsed = parseResumeText(pastedText);
    setParsedResume(parsed);
    setParseInfo(parsed._meta);
    runAudit(parsed);
  };

  const handleRunAudit = () => {
    if (mode === 'connected') return handleConnectedAudit();
    if (mode === 'paste') return handlePasteAudit();
    return handleManualAudit();
  };

  const handleAddMissing = () => {
    if (!result?.jdMatch) return;
    let existingText = '';
    if (mode === 'connected') existingText = collectResumeText(resumeData);
    else if (mode === 'paste') existingText = collectResumeText(parsedResume);
    else existingText = JSON.stringify(form);
    existingText = existingText.toLowerCase();

    const toAdd = result.jdMatch.missing
      .map(m => m.term)
      .filter(t => !existingText.includes(t.toLowerCase()))
      .slice(0, 15);

    if (!toAdd.length) {
      toast.error('No new missing keywords to add.');
      return;
    }

    if (mode === 'connected' && resumeCtx?.resume) {
      const newIndex = resumeCtx.resume.skills.length;
      resumeCtx.dispatch({ type: 'ADD_SKILL' });
      resumeCtx.dispatch({
        type: 'UPDATE_SKILL',
        index: newIndex,
        payload: { category: 'Job Keywords', items: toAdd.join(', ') }
      });
      toast.success(`Added ${toAdd.length} keywords to your resume skills. Re-scan for the new score.`);
    } else if (mode === 'paste' && parsedResume) {
      const updated = {
        ...parsedResume,
        skills: [...parsedResume.skills, { id: 'jd-keywords', category: 'Job Keywords', items: toAdd.join(', ') }]
      };
      setParsedResume(updated);
      const r = auditResume(updated, { jobDescription: jdText });
      setResult(r);
      toast.success(`Added ${toAdd.length} keywords — score updated.`);
    } else {
      setForm(prev => ({
        ...prev,
        skills: [prev.skills, toAdd.join(', ')].filter(Boolean).join(', ')
      }));
      toast.success(`Added ${toAdd.length} keywords to the skills field. Run the audit again.`);
    }
  };

  const handleExportReport = async () => {
    if (!result) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const name = (resumeData?.personalInfo?.fullName || form.fullName || 'Resume').trim().replace(/\s+/g, '_');
      const filename = `CV_Audit_Report_${name}.pdf`;
      const blob = await html2pdf().set({
        margin: [10, 10, 10, 10],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }).from(reportRef.current).outputPdf('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('Audit report exported!');
    } catch (err) {
      toast.error('PDF export failed.');
      console.error(err);
    } finally {
      setExporting(false);
    }
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
            <button className={`cv-mode-btn ${mode === 'paste' ? 'active' : ''}`} onClick={() => setMode('paste')}>
              <FiFileText size={16} /> Paste Text
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
            </div> : mode === 'manual' ? <div className="cv-manual">
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

                <div className="cv-manual-section">
                  <h4>Experience</h4>
                </div>
                {form.experience.map((exp, i) => <div key={i} className="cv-manual-entry">
                    <div className="cv-entry-header">
                      <span className="cv-entry-title">Experience {i + 1}</span>
                      {form.experience.length > 1 && <button type="button" className="cv-remove-btn neo-lift" onClick={() => removeExp(i)} aria-label={`Remove experience ${i + 1}`}>
                          <FiX size={12} /> Remove
                        </button>}
                    </div>
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
                <button type="button" className="cv-add-btn neo-lift" onClick={addExp}>
                  <FiPlus size={14} /> Add Experience
                </button>
                <div className="cv-manual-section">
                  <h4>Education</h4>
                </div>
                {form.education.map((edu, i) => <div key={i} className="cv-manual-entry">
                    <div className="cv-entry-header">
                      <span className="cv-entry-title">Education {i + 1}</span>
                      {form.education.length > 1 && <button type="button" className="cv-remove-btn neo-lift" onClick={() => removeEdu(i)} aria-label={`Remove education ${i + 1}`}>
                          <FiX size={12} /> Remove
                        </button>}
                    </div>
                    <div className="grid-2" style={{ marginBottom: 8 }}>
                      <input className="glass-input" placeholder="Institution" value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} />
                      <input className="glass-input" placeholder="Degree" value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} />
                    </div>
                    <div className="grid-2">
                      <input className="glass-input" placeholder="Start Date" value={edu.startDate} onChange={e => updateEdu(i, 'startDate', e.target.value)} />
                      <input className="glass-input" placeholder="End Date" value={edu.endDate} onChange={e => updateEdu(i, 'endDate', e.target.value)} />
                    </div>
                  </div>)}
                <button type="button" className="cv-add-btn neo-lift" onClick={addEdu}>
                  <FiPlus size={14} /> Add Education
                </button>
              </div>
            </div> : <div className="cv-paste">
              <div className="cv-connected-banner glass">
                <FiFileText size={20} />
                <div>
                  <strong>Paste your resume text</strong>
                  <p>Best with single-column, text-based resumes. Parsing happens on your device.</p>
                </div>
              </div>
              {parseInfo && <div className="cv-parse-info">
                  Parsed: {parseInfo.experienceCount} experience • {parseInfo.educationCount} education • {parseInfo.skillCount} skills
                  {parseInfo.sectionsDetected.length > 0 ? ` • sections: ${parseInfo.sectionsDetected.join(', ')}` : ''}
                </div>}
              <div className="cv-manual-form">
                <div className="form-group">
                  <label>Resume text</label>
                  <textarea className="glass-input" rows={14} placeholder={'JANE DOE\njane@example.com | +1 555 0100 | Dhaka, Bangladesh\n\nSUMMARY\nResults-driven engineer...\n\nEXPERIENCE\nSenior Engineer | Acme\nJan 2020 - Present\nLed a team of 5...\n\nSKILLS\nReact, Node.js, PostgreSQL'} value={pastedText} onChange={e => setPastedText(e.target.value)} />
                </div>
              </div>
            </div>}

          <div className="form-group cv-jd-section">
            <label>Target Job Description (optional)</label>
            <textarea className="glass-input" rows={4} placeholder="Paste the job posting to score keyword match against your resume..." value={jdText} onChange={e => setJdText(e.target.value)} />
          </div>

          <motion.button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} onClick={handleRunAudit} whileTap={{ scale: 0.98 }} disabled={mode === 'paste' && !pastedText.trim()}>
            <FiZap size={18} /> Run Audit
          </motion.button>

          {audited && result && <div style={{ marginTop: 16 }}>
              <motion.button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleRunAudit} whileTap={{ scale: 0.98 }}>
                <FiRefreshCw size={16} /> Re-Scan
              </motion.button>
            </div>}
        </div>

        <div className="cv-results">
          {!audited ? <div className="cv-placeholder">
              <FiZap size={48} />
              <p>Run an audit to see your CV score</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--neo-ink-muted)' }}>Fill in your resume details and click "Run Audit"</p>
            </div> : result && <div className="cv-results-content">
              <div className="cv-score-section">
                <ScoreRing percentage={result.percentage} />
                <p className="cv-score-label" style={{ color: result.percentage >= 70 ? 'var(--neo-green)' : result.percentage >= 40 ? 'var(--neo-orange)' : 'var(--neo-red)' }}>
                  {result.percentage >= 80 ? 'Excellent! Your resume is well-optimized.' :
                   result.percentage >= 60 ? 'Good — a few improvements needed.' :
                   result.percentage >= 40 ? 'Fair — several areas need attention.' :
                   'Needs significant improvement.'}
                </p>
              </div>

              {result.jdMatch && <div className="cv-jd-match">
                  <div className="cv-jd-match-header">
                    <h4>Job Description Match</h4>
                    <span className={`cv-jd-match-pct ${result.jdMatch.percentage >= 70 ? 'ok' : result.jdMatch.percentage >= 40 ? 'mid' : 'low'}`}>
                      {result.jdMatch.percentage}%
                    </span>
                  </div>
                  <p className="cv-jd-match-sub">
                    {result.jdMatch.matched.length} of {result.jdMatch.total} key terms found in your resume
                  </p>
                  {result.jdMatch.matched.length > 0 && <div className="cv-jd-group">
                      <span className="cv-jd-group-label">Matched ({result.jdMatch.matched.length})</span>
                      <div className="cv-jd-chips">
                        {result.jdMatch.matched.slice(0, 12).map(m => <span key={m.term} className="cv-jd-chip cv-jd-chip-ok">{m.term}</span>)}
                      </div>
                    </div>}
                  {result.jdMatch.missing.length > 0 && <div className="cv-jd-group">
                      <span className="cv-jd-group-label">Missing ({result.jdMatch.missing.length})</span>
                      <div className="cv-jd-chips">
                        {result.jdMatch.missing.slice(0, 16).map(m => <span key={m.term} className="cv-jd-chip cv-jd-chip-missing">{m.term}</span>)}
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddMissing}>
                        <FiPlus size={14} /> Add missing to skills
                      </button>
                    </div>}
                </div>}

              <div className="cv-categories">
                {result.categories.map((cat, i) => <AuditCategory key={i} category={cat} defaultOpen={i === 0 || cat.points < cat.max} />)}
              </div>

              {result.issues.length > 0 && <div className="cv-issues">
                  <h4>Issues to Fix ({result.issues.length})</h4>
                  <div className="cv-issues-list">
                    {result.issues.map((issue, i) => <div key={i} className={`cv-issue-item cv-issue-${issue.status}`}>
                        {issue.status === 'warn' ? <FiAlertTriangle size={14} /> : <FiX size={14} />}
                        <div style={{ flex: 1 }}>
                          <strong>{issue.label}</strong>
                          <p>{issue.message}</p>
                          {mode === 'connected' && <Link to={`/builder?section=${FIX_SECTIONS[issue.category] || 'personalInfo'}`} className="cv-issue-fix">
                              Fix in builder →
                            </Link>}
                        </div>
                      </div>)}
                  </div>
                </div>}

              <div className="cv-report-actions">
                <button type="button" className="btn btn-secondary" onClick={handleExportReport} disabled={exporting}>
                  <FiDownload size={16} /> {exporting ? 'Exporting...' : 'Export report (PDF)'}
                </button>
                <Link to="/builder" className="btn btn-primary">
                  Go to Resume Builder <FiZap />
                </Link>
              </div>
            </div>}
        </div>
      </div>

      {/* Off-screen PDF report */}
      <div className="cv-report" ref={reportRef} aria-hidden="true">
        <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '22px', color: '#000000', margin: '0 0 4px' }}>
          Resume Rocket — CV Audit Report
        </h1>
        <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', color: '#444444', margin: '0 0 20px' }}>
          Generated {new Date().toLocaleDateString()} • Overall score: <strong>{result?.percentage ?? 0}/100</strong>
          {result?.jdMatch ? ` • Job description match: ${result.jdMatch.percentage}%` : ''}
        </p>
        {result && <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', color: '#000000', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '2px solid #000000', padding: '6px 4px' }}>Category</th>
                <th style={{ textAlign: 'left', borderBottom: '2px solid #000000', padding: '6px 4px' }}>Score</th>
                <th style={{ textAlign: 'left', borderBottom: '2px solid #000000', padding: '6px 4px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {result.categories.map(cat => <tr key={cat.id}>
                  <td style={{ borderBottom: '1px solid #cccccc', padding: '6px 4px', fontWeight: 700 }}>{cat.label}</td>
                  <td style={{ borderBottom: '1px solid #cccccc', padding: '6px 4px' }}>{cat.points}/{cat.max}</td>
                  <td style={{ borderBottom: '1px solid #cccccc', padding: '6px 4px' }}>
                    {cat.rules.filter(r => r.status !== 'pass').map(r => r.label).join('; ') || 'All checks passed'}
                  </td>
                </tr>)}
            </tbody>
          </table>}
        {result && result.issues.length > 0 && <>
            <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color: '#000000', margin: '0 0 8px' }}>
              Issues to fix ({result.issues.length})
            </h2>
            <ul style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', color: '#000000', paddingLeft: '18px', margin: '0 0 20px' }}>
              {result.issues.map((issue, i) => <li key={i} style={{ marginBottom: '4px' }}>
                  <strong>{issue.label}:</strong> {issue.message}
                </li>)}
            </ul>
          </>}
        {result?.jdMatch?.missing?.length > 0 && <>
            <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', color: '#000000', margin: '0 0 8px' }}>
              Missing keywords from job description
            </h2>
            <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', color: '#000000', margin: 0 }}>
              {result.jdMatch.missing.slice(0, 30).map(m => m.term).join(', ')}
            </p>
          </>}
        <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: '#777777', marginTop: '24px' }}>
          Generated locally by Resume Rocket — resume-rocket.vercel.app
        </p>
      </div>
    </motion.div>;
}
