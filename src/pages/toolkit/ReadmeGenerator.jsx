import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiCopy, FiDownload, FiFileText, FiZap } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import { generateReadme, renderMarkdownToHtml } from '../../utils/generateReadme';
import { SOCIAL_PLATFORMS, STAT_THEMES, TECH_ICONS } from '../../utils/readmeIcons';
import './ReadmeGenerator.css';
function CollapsibleSection({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return <div className={`rg-section glass-card ${open ? 'open' : ''}`}>
      <button className="rg-section-header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        {open ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
      </button>
      {open && <div className="rg-section-body">{children}</div>}
    </div>;
}
export default function ReadmeGenerator() {
  const toast = useToast();
  const [config, setConfig] = useState({
    basic: { name: '', greeting: 'Hi there', tagline: '' },
    about: { bio: '', currentlyLearning: '', funFact: '' },
    tech: [],
    social: [],
    stats: { show: false, username: '', theme: 'dark', showStats: true, showStreak: true, showTopLangs: false },
    visitor: { show: false, username: '', style: 'flat', color: '6' },
    custom: { showTrophies: false, showSnake: false }
  });

  const update = (section, key, val) => setConfig(prev => ({ ...prev, [section]: { ...prev[section], [key]: val } }));
  const toggleTech = (item) => {
    setConfig(prev => {
      const exists = prev.tech.find(t => t.id === item.id);
      return {
        ...prev,
        tech: exists ? prev.tech.filter(t => t.id !== item.id) : [...prev.tech, { ...item, category: Object.entries(TECH_ICONS).find(([_, items]) => items.some(i => i.id === item.id))?.[0] || 'tools' }]
      };
    });
  };
  const toggleSocial = (item) => {
    setConfig(prev => {
      const exists = prev.social.find(s => s.id === item.id);
      return {
        ...prev,
        social: exists ? prev.social.filter(s => s.id !== item.id) : [...prev.social, { ...item, url: '' }]
      };
    });
  };
  const updateSocialUrl = (id, url) => setConfig(prev => ({ ...prev, social: prev.social.map(s => s.id === id ? { ...s, url } : s) }));

  const md = generateReadme(config);
  const html = renderMarkdownToHtml(md);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      toast.success('README markdown copied!');
    } catch {
      toast.error('Failed to copy.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  return <motion.div className="page-wrapper builder-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="rg-layout">
        <div className="rg-editor">
          <div className="editor-header">
            <h2><FiFileText style={{ verticalAlign: 'middle', marginRight: 8 }} />GitHub README Generator</h2>
            <p>Build a stunning GitHub profile README with badges, stats, and social links.</p>
          </div>

          <div className="rg-editor-form">
            <CollapsibleSection title="Basic Info" defaultOpen={true}>
              <div className="form-group"><label>Display Name</label><input className="glass-input" placeholder="John Doe" value={config.basic.name} onChange={e => update('basic', 'name', e.target.value)} /></div>
              <div className="form-group" style={{ marginTop: 8 }}><label>Tagline</label><input className="glass-input" placeholder="Full-Stack Developer | Open Source Enthusiast" value={config.basic.tagline} onChange={e => update('basic', 'tagline', e.target.value)} /></div>
              <div className="form-group" style={{ marginTop: 8 }}><label>Greeting</label><input className="glass-input" placeholder="Hi there" value={config.basic.greeting} onChange={e => update('basic', 'greeting', e.target.value)} /></div>
            </CollapsibleSection>

            <CollapsibleSection title="About Me">
              <div className="form-group"><label>Bio</label><textarea className="glass-input" rows={3} placeholder="I'm a passionate software engineer..." value={config.about.bio} onChange={e => update('about', 'bio', e.target.value)} /></div>
              <div className="form-group" style={{ marginTop: 8 }}><label>Currently Learning / Working On</label><input className="glass-input" placeholder="Building a SaaS platform" value={config.about.currentlyLearning} onChange={e => update('about', 'currentlyLearning', e.target.value)} /></div>
              <div className="form-group" style={{ marginTop: 8 }}><label>Fun Fact</label><input className="glass-input" placeholder="I can solve a Rubik's cube in 30s" value={config.about.funFact} onChange={e => update('about', 'funFact', e.target.value)} /></div>
            </CollapsibleSection>

            <CollapsibleSection title="Tech Stack">
              <p style={{ font: 'var(--md-sys-typescale-body-small)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>Select the technologies you work with.</p>
              {Object.entries(TECH_ICONS).map(([cat, items]) => <div key={cat} className="rg-tech-category">
                  <h4 className="rg-tech-cat-label">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                  <div className="rg-tech-grid">
                    {items.map(item => {
                      const selected = config.tech.some(t => t.id === item.id);
                      return <button key={item.id} className={`rg-tech-chip ${selected ? 'selected' : ''}`} onClick={() => toggleTech(item)}>
                          <span style={{
                            display: 'inline-block',
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: `#${item.color}`,
                            marginRight: 4
                          }} />
                          {item.label}
                        </button>;
                    })}
                  </div>
                </div>)}
            </CollapsibleSection>

            <CollapsibleSection title="Social Links">
              <p style={{ font: 'var(--md-sys-typescale-body-small)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>Toggle platforms and enter your profile URLs.</p>
              <div className="rg-social-grid">
                {SOCIAL_PLATFORMS.map(item => {
                  const selected = config.social.some(s => s.id === item.id);
                  return <div key={item.id} className={`rg-social-row ${selected ? 'selected' : ''}`}>
                      <button className="rg-social-toggle" onClick={() => toggleSocial(item)}>
                        <span style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          border: '2px solid var(--md-sys-color-outline)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: selected ? 'var(--md-sys-color-primary)' : 'transparent',
                          borderColor: selected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)'
                        }}>
                          {selected && <span style={{ color: 'white', fontSize: 10 }}>✓</span>}
                        </span>
                        {item.label}
                      </button>
                      {selected && <input className="glass-input" placeholder={`https://${item.id}.com/your-username`} value={config.social.find(s => s.id === item.id)?.url || ''} onChange={e => updateSocialUrl(item.id, e.target.value)} style={{ flex: 1 }} />}
                    </div>;
                })}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="GitHub Stats">
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={config.stats.show} onChange={e => update('stats', 'show', e.target.checked)} style={{ width: 16, height: 16 }} />
                  Show GitHub Stats Cards
                </label>
              </div>
              {config.stats.show && <>
                  <div className="form-group" style={{ marginTop: 8 }}><label>GitHub Username</label><input className="glass-input" placeholder="your-username" value={config.stats.username} onChange={e => update('stats', 'username', e.target.value)} /></div>
                  <div className="form-group" style={{ marginTop: 8 }}><label>Theme</label><select className="glass-input" value={config.stats.theme} onChange={e => update('stats', 'theme', e.target.value)}>
                      {STAT_THEMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select></div>
                  <div className="rg-checkbox-group" style={{ marginTop: 8 }}>
                    <label><input type="checkbox" checked={config.stats.showStats} onChange={e => update('stats', 'showStats', e.target.checked)} /> Stats Card</label>
                    <label><input type="checkbox" checked={config.stats.showStreak} onChange={e => update('stats', 'showStreak', e.target.checked)} /> Streak Card</label>
                    <label><input type="checkbox" checked={config.stats.showTopLangs} onChange={e => update('stats', 'showTopLangs', e.target.checked)} /> Top Languages</label>
                  </div>
                </>}
            </CollapsibleSection>

            <CollapsibleSection title="Visitor Counter">
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={config.visitor.show} onChange={e => update('visitor', 'show', e.target.checked)} style={{ width: 16, height: 16 }} />
                  Show Visitor Counter
                </label>
              </div>
              {config.visitor.show && <div className="form-group" style={{ marginTop: 8 }}>
                  <label>Username (for counter)</label>
                  <input className="glass-input" placeholder="your-username" value={config.visitor.username} onChange={e => update('visitor', 'username', e.target.value)} />
                </div>}
            </CollapsibleSection>

            <CollapsibleSection title="Custom Sections">
              <div className="rg-checkbox-group">
                <label><input type="checkbox" checked={config.custom.showTrophies} onChange={e => update('custom', 'showTrophies', e.target.checked)} /> Show GitHub Trophies</label>
                <label><input type="checkbox" checked={config.custom.showSnake} onChange={e => update('custom', 'showSnake', e.target.checked)} /> Show Contribution Snake</label>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        <div className="rg-preview-panel">
          <div className="preview-toolbar" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Live Preview
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={handleCopy} disabled={!md}>
                <FiCopy size={14} /> Copy
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={!md}>
                <FiDownload size={14} /> Download .md
              </button>
            </div>
          </div>
          <div className="rg-preview-container">
            {md ? <div className="rg-preview-content" dangerouslySetInnerHTML={{ __html: html }} />
              : <div className="rg-placeholder">
                  <FiFileText size={48} />
                  <p>Your README preview will appear here</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fill in the form to generate your profile README</p>
                </div>}
          </div>
        </div>
      </div>
    </motion.div>;
}
