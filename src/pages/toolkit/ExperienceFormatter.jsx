import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiClipboard, FiCopy, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import { ALL_VERBS, formatBullet, FORMAT_LABELS, VERB_CATEGORIES } from '../../utils/experienceVerbs';
import './ExperienceFormatter.css';
const steps = [
  { key: 'verb', label: 'Action Verb', placeholder: 'Select or type a verb', helper: 'Choose a strong action verb that best describes what you did.' },
  { key: 'action', label: 'What did you do?', placeholder: 'Redesigned the checkout flow', helper: 'The core task or accomplishment you want to highlight.' },
  { key: 'metric', label: 'How did you measure it?', placeholder: '40% increase in conversion rate', helper: 'Quantifiable impact — optional but highly recommended.' },
  { key: 'method', label: 'How did you do it?', placeholder: 'using A/B testing and React optimization', helper: 'Methods, tools, or technologies you used.' },
  { key: 'context', label: 'Context (optional)', placeholder: 'for a SaaS platform with 10K+ users', helper: 'Scale, team size, or business context.' }
];
export default function ExperienceFormatter() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ verb: '', action: '', metric: '', method: '', context: '' });
  const [bullets, setBullets] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const generateBullets = () => {
    return FORMAT_LABELS.map(f => ({
      formatId: f.id,
      formatName: f.name,
      text: formatBullet(form, f.id)
    }));
  };

  const handleAddBullets = () => {
    const generated = generateBullets();
    const entry = { id: Date.now().toString(), form: { ...form }, bullets: generated };
    setBullets(prev => [...prev, entry]);
    setForm({ verb: '', action: '', metric: '', method: '', context: '' });
    setStep(0);
    toast.success('Bullets added to your session!');
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy.');
    }
  };

  const deleteBullet = (id) => {
    setBullets(prev => prev.filter(b => b.id !== id));
    toast.info('Bullet deleted.');
  };

  const selectedVerbCategory = Object.entries(VERB_CATEGORIES).find(([_, verbs]) => verbs.includes(form.verb));

  return <motion.div className="page-wrapper builder-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="ef-container">
        <div className="editor-header" style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2><FiZap style={{ verticalAlign: 'middle', marginRight: 8 }} />Experience Formatter</h2>
          <p>Build powerful resume bullet points using Google XYZ, STAR, and Power Bullet formats.</p>
        </div>

        <div className="ef-wizard glass-card">
          <div className="ef-progress">
            {steps.map((s, i) => <div key={i} className={`ef-progress-step ${i <= step ? 'active' : ''} ${i < step ? 'completed' : ''}`} onClick={() => i < step && setStep(i)}>
                <div className="ef-progress-dot">{i < step ? <FiCheck size={12} /> : i + 1}</div>
                <span className="ef-progress-label">{s.label}</span>
              </div>)}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} className="ef-step" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <label className="ef-step-label">{steps[step].label}</label>
              <p className="ef-step-helper">{steps[step].helper}</p>

              {step === 0 ? <div className="ef-verb-selector">
                  <input className="glass-input" list="verb-list" placeholder={steps[step].placeholder} value={form.verb} onChange={e => update('verb', e.target.value)} style={{ marginBottom: 8 }} />
                  <datalist id="verb-list">
                    {ALL_VERBS.map((v, i) => <option key={i} value={v} />)}
                  </datalist>
                  <div className="ef-verb-categories">
                    {Object.entries(VERB_CATEGORIES).map(([cat, verbs]) => <button key={cat} className={`ef-verb-cat-btn ${selectedVerbCategory && selectedVerbCategory[0] === cat ? 'active' : ''}`} onClick={() => update('verb', verbs[0])}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>)}
                    <div className="ef-verb-suggestions">
                      {form.verb ? <span className="ef-verb-chip selected">{form.verb}</span> :
                        (selectedVerbCategory?.[1] || ALL_VERBS).slice(0, 8).map((v, i) => <button key={i} className="ef-verb-chip" onClick={() => update('verb', v)}>{v}</button>)}
                    </div>
                  </div>
                </div> : <input className="glass-input" placeholder={steps[step].placeholder} value={form[steps[step].key]} onChange={e => update(steps[step].key, e.target.value)} />}
            </motion.div>
          </AnimatePresence>

          <div className="ef-wizard-actions">
            <button className="btn btn-secondary" onClick={prevStep} disabled={step === 0}>
              Back
            </button>
            {step < steps.length - 1 ? <button className="btn btn-primary" onClick={nextStep} disabled={step === 0 && !form.verb}>
                Next
              </button> : <button className="btn btn-primary" onClick={handleAddBullets} disabled={!form.verb || !form.action}>
                <FiPlus size={16} /> Add to Session
              </button>}
          </div>
        </div>

        {form.verb && form.action && <div className="ef-outputs">
            <h3>Preview</h3>
            <div className="ef-output-grid">
              {generateBullets().map((b, i) => <div key={i} className="ef-output-card glass-card">
                  <div className="ef-output-header">
                    <span className="ef-output-name">{b.formatName}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleCopy(b.text)}>
                      <FiCopy size={14} /> Copy
                    </button>
                  </div>
                  <p className="ef-output-text">{b.text}</p>
                </div>)}
            </div>
          </div>}

        {bullets.length > 0 && <div className="ef-session">
            <h3>Saved Bullets ({bullets.length})</h3>
            <div className="ef-session-list">
              {bullets.map(entry => <div key={entry.id} className="ef-session-entry glass-card">
                  <div className="ef-session-entry-header">
                    <span className="ef-session-entry-label">
                      {entry.form.verb} {entry.form.action}
                    </span>
                    <div className="ef-session-entry-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleCopy(entry.bullets.map(b => b.text).join('\n\n'))}>
                        <FiClipboard size={14} /> Copy All
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => deleteBullet(entry.id)}>
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="ef-session-bullets">
                    {entry.bullets.map((b, i) => <div key={i} className="ef-session-bullet">
                        <div className="ef-session-bullet-label">{b.formatName}</div>
                        <p>{b.text}</p>
                      </div>)}
                  </div>
                </div>)}
            </div>
          </div>}
      </div>
    </motion.div>;
}
