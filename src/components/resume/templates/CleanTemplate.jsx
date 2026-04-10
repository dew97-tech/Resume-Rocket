import './templateStyles.css';
export default function CleanTemplate({ resume, settings }) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container clean-template">
      <div className="clean-header">
        <div className="clean-header-left">
          <div className="clean-photo-placeholder" style={{ border: `3px solid ${color}` }}>
            <span style={{ fontSize: '1.8em', color: `${color}80` }}>👤</span>
          </div>
        </div>
        <div className="clean-header-right">
          <h1 style={{ fontSize: '1.5em', fontWeight: 800, textTransform: 'uppercase', marginBottom: 2 }}>{pi.fullName || 'YOUR NAME'}</h1>
          <p style={{ fontSize: '0.9em', color: 'var(--text-secondary, #666)', marginBottom: 10 }}>{pi.title || 'Your Title'}</p>
          <div className="clean-contact-row">
            {pi.phone && <span>☎ {pi.phone}</span>}
            {pi.email && <span>✉ {pi.email}</span>}
            {pi.website && <span>🌐 {pi.website}</span>}
            {pi.location && <span>📍 {pi.location}</span>}
          </div>
        </div>
      </div>

      <div className="clean-divider" style={{ background: color }} />

      {pi.summary && <div className="rt-section" style={{ marginTop: 0 }}>
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>About Me</div>
          <p className="rt-summary">{pi.summary}</p>
        </div>}

      {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Education</div>
          {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-header">
                <div>
                  <div className="rt-entry-title" style={{ fontWeight: 700 }}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                  <div className="rt-entry-subtitle">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</div>
                </div>
                <div className="rt-entry-date" style={{ color }}>{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
              </div>
            </div>)}
        </div>}

      {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Experience</div>
          {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-header">
                <div>
                  <div className="rt-entry-title" style={{ fontWeight: 700 }}>{exp.position}</div>
                  <div className="rt-entry-subtitle">{exp.company}</div>
                </div>
                <div className="rt-entry-date" style={{ color }}>{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
              </div>
              {exp.description && <div className="rt-entry-desc">{exp.description}</div>}
            </div>)}
        </div>}

      {resume.skills.some(s => s.items) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Skills</div>
          <div className="clean-skills-inline">
            {resume.skills.filter(s => s.items).flatMap(s => s.items.split(',')).map((item, j) => <span className="rt-skill-tag" key={j} style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}>{item.trim()}</span>)}
          </div>
        </div>}

      {resume.projects.some(p => p.name) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Projects</div>
          {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{ color }}>↗</a>}</div>
              {proj.technologies && <div className="rt-entry-subtitle" style={{ fontSize: '0.8em' }}>Tech: {proj.technologies}</div>}
              {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
            </div>)}
        </div>}

      {resume.certifications.some(c => c.name) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Certifications</div>
          {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
              <div style={{ fontWeight: 600, fontSize: '0.9em' }}>{cert.name}</div>
              <div className="rt-entry-subtitle">{cert.issuer}{cert.date && ` — ${cert.date}`}</div>
            </div>)}
        </div>}

      {resume.languages.some(l => l.language) && <div className="rt-section">
          <div className="rt-section-title" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${color}`, paddingBottom: 4, color }}>Languages</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {resume.languages.filter(l => l.language).map((lang, i) => <div key={i} style={{ fontSize: '0.9em' }}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span> — <span style={{ color: 'var(--text-muted, #999)' }}>{lang.proficiency}</span>
              </div>)}
          </div>
        </div>}
    </div>;
}
