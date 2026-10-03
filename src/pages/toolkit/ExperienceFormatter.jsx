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

  return (
    <motion.div
      className="page-wrapper ef-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="ef-container">
        {/* Centered Spaced Header */}
        <div className="ef-hero-header">
          <div className="ef-hero-badge">
            <span className="neo-badge">XYZ & STAR BULLET BUILDER</span>
          </div>
          <h1 className="ef-hero-title">Experience Formatter</h1>
          <p className="ef-hero-subtitle">
            Build powerful, quantified resume bullet points using proven Google XYZ and STAR achievement frameworks.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="ef-wizard neo-card">
          {/* Step Progress Bar */}
          <div className="ef-progress">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`ef-progress-step ${i <= step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
                onClick={() => i < step && setStep(i)}
              >
                <div className="ef-progress-dot">{i < step ? <FiCheck size={14} /> : i + 1}</div>
                <span className="ef-progress-label">{s.label}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="ef-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="ef-step-intro">
                <label className="ef-step-label">{steps[step].label}</label>
                <p className="ef-step-helper">{steps[step].helper}</p>
              </div>

              {step === 0 ? (
                <div className="ef-verb-selector">
                  <div className="ef-input-wrap">
                    <label className="ef-field-caption">ENTER OR TYPE ACTION VERB</label>
                    <input
                      className="neo-input ef-main-input"
                      list="verb-list"
                      placeholder="e.g. Spearheaded, Directed, Engineered, Orchestrated..."
                      value={form.verb}
                      onChange={(e) => update('verb', e.target.value)}
                    />
                    <datalist id="verb-list">
                      {ALL_VERBS.map((v, i) => (
                        <option key={i} value={v} />
                      ))}
                    </datalist>
                  </div>

                  <div className="ef-category-section">
                    <span className="ef-section-label">1. BROWSE BY CATEGORY</span>
                    <div className="ef-verb-categories">
                      {Object.entries(VERB_CATEGORIES).map(([cat, verbs]) => (
                        <button
                          key={cat}
                          type="button"
                          className={`ef-verb-cat-btn ${
                            selectedVerbCategory && selectedVerbCategory[0] === cat ? 'active' : ''
                          }`}
                          onClick={() => update('verb', verbs[0])}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ef-suggestions-section">
                    <span className="ef-section-label">2. POPULAR VERBS IN THIS CATEGORY (CLICK TO CHOOSE)</span>
                    <div className="ef-verb-suggestions">
                      {(selectedVerbCategory?.[1] || ALL_VERBS).slice(0, 10).map((v, i) => {
                        const isSelected = form.verb.toLowerCase() === v.toLowerCase();
                        return (
                          <button
                            key={i}
                            type="button"
                            className={`ef-verb-chip ${isSelected ? 'selected' : ''}`}
                            onClick={() => update('verb', v)}
                          >
                            {isSelected && <span style={{ marginRight: 6 }}>✓</span>}
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ef-input-wrap">
                  <label className="ef-field-caption">YOUR RESPONSE</label>
                  <input
                    className="neo-input ef-main-input"
                    placeholder={steps[step].placeholder}
                    value={form[steps[step].key]}
                    onChange={(e) => update(steps[step].key, e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="ef-wizard-actions">
            <button className="btn btn-secondary" onClick={prevStep} disabled={step === 0}>
              ← Back
            </button>
            {step < steps.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={nextStep}
                disabled={step === 0 && !form.verb.trim()}
              >
                Next Step →
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleAddBullets}
                disabled={!form.verb.trim() || !form.action.trim()}
              >
                <FiPlus size={16} /> Add to Session
              </button>
            )}
          </div>
        </div>

        {/* Live Formatted Outputs */}
        {form.verb && form.action && (
          <div className="ef-outputs">
            <h3 className="ef-section-title">Live Formatted Preview</h3>
            <div className="ef-output-grid">
              {generateBullets().map((b, i) => (
                <div key={i} className="ef-output-card neo-card">
                  <div className="ef-output-header">
                    <span className="neo-badge">{b.formatName}</span>
                    <button className="btn btn-sm btn-secondary" onClick={() => handleCopy(b.text)}>
                      <FiCopy size={14} /> Copy
                    </button>
                  </div>
                  <p className="ef-output-text">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Bullets Session */}
        {bullets.length > 0 && (
          <div className="ef-session">
            <h3 className="ef-section-title">Saved Bullets ({bullets.length})</h3>
            <div className="ef-session-list">
              {bullets.map((entry) => (
                <div key={entry.id} className="ef-session-entry neo-card">
                  <div className="ef-session-entry-header">
                    <span className="ef-session-entry-label">
                      {entry.form.verb} {entry.form.action}
                    </span>
                    <div className="ef-session-entry-actions">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleCopy(entry.bullets.map((b) => b.text).join('\n\n'))}
                      >
                        <FiClipboard size={14} /> Copy All
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteBullet(entry.id)}
                        aria-label="Delete bullet"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="ef-session-bullets">
                    {entry.bullets.map((b, i) => (
                      <div key={i} className="ef-session-bullet">
                        <div className="ef-session-bullet-label">{b.formatName}</div>
                        <p>{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
