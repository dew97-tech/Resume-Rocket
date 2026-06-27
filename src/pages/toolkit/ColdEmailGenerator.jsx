import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCopy, FiFileText, FiMail, FiSend, FiZap } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import { coldEmailTemplates, EMAIL_CATEGORIES, EMAIL_TONES } from '../../utils/coldEmailTemplates';
import './ColdEmailGenerator.css';
export default function ColdEmailGenerator() {
  const toast = useToast();
  const [form, setForm] = useState({
    yourName: '',
    yourRole: '',
    recipientName: '',
    recipientRole: '',
    company: '',
    purpose: '',
    skills: '',
    tone: 'professional',
    templateId: 'cold-apply',
    category: 'job-application'
  });
  const [generated, setGenerated] = useState(null);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const filteredTemplates = coldEmailTemplates.filter(t => t.category === form.category);
  const selectedTemplate = coldEmailTemplates.find(t => t.id === form.templateId);
  const currentCategory = EMAIL_CATEGORIES.find(c => c.id === form.category);

  const handleGenerate = () => {
    const template = coldEmailTemplates.find(t => t.id === form.templateId);
    if (!template) {
      toast.error('Please select a template.');
      return;
    }
    const subject = template.generateSubject(form);
    const body = template.generateBody(form);
    setGenerated({ subject, body, templateName: template.name });
    toast.success('Message generated!');
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error('Failed to copy.');
    }
  };

  const wordCount = generated ? generated.body.split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  return <motion.div className="page-wrapper builder-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="ce-layout">
        <div className="ce-editor">
          <div className="editor-header">
            <h2><FiMail style={{ verticalAlign: 'middle', marginRight: 8 }} />Cold Email & LinkedIn Generator</h2>
            <p>Generate tailored outreach messages for jobs, networking, and freelancing.</p>
          </div>

          <div className="ce-category-tabs">
            {EMAIL_CATEGORIES.map(cat => <button key={cat.id} className={`ce-cat-tab ${form.category === cat.id ? 'active' : ''}`} onClick={() => update('category', cat.id)}>
                <span>{cat.icon}</span> {cat.label}
              </button>)}
          </div>

          <div className="ce-templates">
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, display: 'block' }}>
              <FiZap size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Template
            </label>
            <div className="ce-template-cards">
              {filteredTemplates.map(t => <button key={t.id} className={`ce-template-card glass-card ${form.templateId === t.id ? 'selected' : ''}`} onClick={() => update('templateId', t.id)}>
                  <div className="ce-tc-name">{t.name}</div>
                  <div className="ce-tc-desc">{t.description}</div>
                </button>)}
            </div>
          </div>

          <div className="ce-form">
            <div className="grid-2">
              <div className="form-group">
                <label>Your Name</label>
                <input className="glass-input" placeholder="John Doe" value={form.yourName} onChange={e => update('yourName', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Your Role/Title</label>
                <input className="glass-input" placeholder="Software Engineer" value={form.yourRole} onChange={e => update('yourRole', e.target.value)} />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Recipient Name (optional)</label>
                <input className="glass-input" placeholder="Jane Smith" value={form.recipientName} onChange={e => update('recipientName', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Recipient Role</label>
                <input className="glass-input" placeholder="Hiring Manager" value={form.recipientRole} onChange={e => update('recipientRole', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input className="glass-input" placeholder="Google" value={form.company} onChange={e => update('company', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Purpose / Context</label>
              <textarea className="glass-input" rows={3} placeholder="Why are you reaching out? What's your value proposition?" value={form.purpose} onChange={e => update('purpose', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Key Skills / Highlights</label>
              <input className="glass-input" placeholder="React, Node.js, Team Leadership, 5+ years experience" value={form.skills} onChange={e => update('skills', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tone</label>
              <select className="glass-input" value={form.tone} onChange={e => update('tone', e.target.value)}>
                {EMAIL_TONES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
              </select>
            </div>

            <motion.button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} onClick={handleGenerate} whileTap={{ scale: 0.98 }}>
              <FiSend size={18} /> Generate Message
            </motion.button>
          </div>
        </div>

        <div className="ce-preview-panel">
          <div className="preview-toolbar" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Preview — {selectedTemplate?.name || 'Select a template'}
            </span>
            {generated && <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopy(generated.subject, 'Subject')}>
                  <FiCopy size={14} /> Subject
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopy(generated.body, 'Body')}>
                  <FiCopy size={14} /> Body
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => handleCopy(`Subject: ${generated.subject}\n\n${generated.body}`, 'All')}>
                  <FiCopy size={14} /> All
                </button>
              </div>}
          </div>

          <div className="ce-preview-container">
            {generated ? <div className="ce-preview-content">
                <div className="ce-subject-line">
                  <strong>Subject:</strong> {generated.subject}
                  <button className="btn btn-ghost btn-sm" onClick={() => handleCopy(generated.subject, 'Subject')} style={{ marginLeft: 8 }}>
                    <FiCopy size={12} />
                  </button>
                </div>
                <div className="ce-body-preview">
                  <pre className="ce-body-text">{generated.body}</pre>
                </div>
                <div className="ce-word-count">
                  {wordCount} words · {readTime} min read
                </div>
              </div> : <div className="ce-placeholder">
                <FiFileText size={48} />
                <p>Your message will appear here</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select a category and template, fill in the form, and generate</p>
              </div>}
          </div>
        </div>
      </div>
    </motion.div>;
}
