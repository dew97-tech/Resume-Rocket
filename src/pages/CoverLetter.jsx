import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiDownload, FiFileText, FiSend, FiZap } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';
import { coverLetterTemplates, coverLetterTones } from '../utils/coverLetterTemplates';
import './CoverLetter.css';
export default function CoverLetter() {
  const toast = useToast();
  const previewRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    jobTitle: '',
    company: '',
    skills: '',
    experience: '',
    tone: 'professional',
    templateId: 'professional'
  });
  const [generated, setGenerated] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const update = (key, val) => setForm(prev => ({
    ...prev,
    [key]: val
  }));
  const handleGenerate = () => {
    setIsGenerating(true);
    const template = coverLetterTemplates.find(t => t.id === form.templateId);
    if (!template) return;
    setTimeout(() => {
      const text = template.generate(form);
      setGenerated(text);
      setIsGenerating(false);
      toast.success('Cover letter generated!');
    }, 800);
  };
  const handleExport = async () => {
    if (!generated) {
      toast.error('Generate a cover letter first!');
      return;
    }
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = previewRef.current;
      if (!el) return;
      const pdfFilename = `Cover_Letter_${form.company || 'Document'}.pdf`;
      const blob = await html2pdf().set({
        margin: [20, 20, 20, 20],
        filename: pdfFilename,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          backgroundColor: '#ffffff'
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy']
        }
      }).from(el).outputPdf('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('Cover letter exported as PDF!');
    } catch (err) {
      toast.error('PDF export failed.');
      console.error(err);
    }
  };
  const selectedTemplate = coverLetterTemplates.find(t => t.id === form.templateId);
  return <motion.div className="page-wrapper builder-page" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="cl-layout">

        <div className="cl-editor">
          <div className="editor-header">
            <h2><FiFileText style={{
              verticalAlign: 'middle',
              marginRight: 8
            }} />Cover Letter Generator</h2>
            <p>Fill in the details and we'll craft a tailored cover letter for you.</p>
          </div>


          <div className="cl-templates">
            <label style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
            display: 'block'
          }}>
              <FiZap size={14} style={{
              verticalAlign: 'middle',
              marginRight: 4
            }} /> AI Template Style
            </label>
            <div className="cl-template-cards">
              {coverLetterTemplates.map(t => <button key={t.id} className={`cl-template-card glass-card ${form.templateId === t.id ? 'selected' : ''}`} onClick={() => update('templateId', t.id)}>
                  <div className="cl-tc-name">{t.name}</div>
                  <div className="cl-tc-desc">{t.description}</div>
                </button>)}
            </div>
          </div>

          <div className="cl-form">
            <div className="grid-2">
              <div className="form-group">
                <label>Your Name</label>
                <input className="glass-input" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Tone</label>
                <select className="glass-input" value={form.tone} onChange={e => update('tone', e.target.value)}>
                  {coverLetterTones.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Job Title</label>
                <input className="glass-input" placeholder="Software Engineer" value={form.jobTitle} onChange={e => update('jobTitle', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input className="glass-input" placeholder="Google" value={form.company} onChange={e => update('company', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Key Skills (comma-separated)</label>
              <input className="glass-input" placeholder="React, Node.js, Team Leadership" value={form.skills} onChange={e => update('skills', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Relevant Experience (optional — leave blank for auto-generated text)</label>
              <textarea className="glass-input" rows={4} placeholder="Describe your most relevant achievements and experience..." value={form.experience} onChange={e => update('experience', e.target.value)} style={{
              resize: 'vertical'
            }} />
            </div>

            <motion.button className="btn btn-primary btn-lg" style={{
            width: '100%',
            marginTop: 8
          }} onClick={handleGenerate} disabled={isGenerating} whileTap={{
            scale: 0.98
          }}>
              <FiSend size={18} />
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </motion.button>
          </div>
        </div>


        <div className="cl-preview-panel">
          <div className="preview-toolbar" style={{
          justifyContent: 'space-between'
        }}>
            <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}>
              Preview — {selectedTemplate?.name || 'Professional'}
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleExport} disabled={!generated}>
              <FiDownload size={16} /> Export PDF
            </button>
          </div>

          <div className="preview-container">
            <div className="cl-preview-wrapper">
              <div ref={previewRef} className="cl-preview-content" id="cover-letter-preview">
                {generated ? <pre className="cl-generated-text">{generated}</pre> : <div className="cl-placeholder">
                    <FiFileText size={48} />
                    <p>Your cover letter will appear here</p>
                    <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>Fill in the form and click "Generate"</p>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
}
