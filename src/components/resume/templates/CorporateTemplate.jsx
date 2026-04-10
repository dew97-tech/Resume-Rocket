import './templateStyles.css';
export default function CorporateTemplate({ resume, settings }) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container corporate-template">
      <div className="corporate-header">
        <h1 style={{ fontSize: '1.6em', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>{pi.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: '0.9em', color: 'var(--text-secondary, #666)', marginBottom: 12 }}>{pi.title || 'Your Title'}</p>
        <div className="corporate-contact-row">
          {pi.phone && <span>☎ {pi.phone}</span>}
          {pi.location && <span>📍 {pi.location}</span>}
          {pi.email && <span>✉ {pi.email}</span>}
          {pi.website && <span>🌐 {pi.website}</span>}
          {pi.linkedin && <span>in {pi.linkedin}</span>}
        </div>
        <div className="corporate-divider" style={{ background: color }} />
      </div>

      <div className="corporate-body">
        <div className="corporate-left">
          {pi.summary && <div className="rt-section" style={{ marginTop: 0 }}>
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>About Me</div>
              <p className="rt-summary" style={{ fontSize: '0.85em' }}>{pi.summary}</p>
            </div>}

          {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Education</div>
              {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-title" style={{ fontSize: '0.85em', fontWeight: 700 }}>{edu.institution}</div>
                  <div style={{ fontSize: '0.8em', color: 'var(--text-secondary, #666)' }}>{edu.degree}{edu.field && ` — ${edu.field}`}</div>
                  <div className="rt-entry-date" style={{ fontSize: '0.75em' }}>{edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}</div>
                </div>)}
            </div>}

          {resume.skills.some(s => s.items) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Skills</div>
              {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{ marginBottom: 8 }}>
                  {skill.category && <div style={{ fontSize: '0.8em', fontWeight: 700, marginBottom: 4 }}>{skill.category}</div>}
                  <div style={{ fontSize: '0.8em', color: 'var(--text-secondary, #666)' }}>{skill.items}</div>
                </div>)}
            </div>}

          {resume.languages.some(l => l.language) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Languages</div>
              {resume.languages.filter(l => l.language).map((lang, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{lang.language}</span>
                  <span style={{ color: 'var(--text-muted, #999)' }}>{lang.proficiency}</span>
                </div>)}
            </div>}
        </div>

        <div className="corporate-right">
          {resume.experience.some(e => e.company || e.position) && <div className="rt-section" style={{ marginTop: 0 }}>
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Work Experience</div>
              {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-header">
                    <div>
                      <div className="rt-entry-title" style={{ fontWeight: 700 }}>{exp.position}</div>
                      <div className="rt-entry-subtitle">{exp.company}</div>
                    </div>
                    <div className="rt-entry-date">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  {exp.description && <div className="rt-entry-desc" style={{ fontSize: '0.85em' }}>{exp.description}</div>}
                </div>)}
            </div>}

          {resume.projects.some(p => p.name) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Projects</div>
              {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{ color }}>↗</a>}</div>
                  {proj.technologies && <div className="rt-entry-subtitle" style={{ fontSize: '0.8em' }}>Technologies: {proj.technologies}</div>}
                  {proj.description && <div className="rt-entry-desc" style={{ fontSize: '0.85em' }}>{proj.description}</div>}
                </div>)}
            </div>}

          {resume.certifications.some(c => c.name) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.75em', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>Certifications</div>
              {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-title" style={{ fontSize: '0.85em', fontWeight: 600 }}>{cert.name}</div>
                  <div className="rt-entry-subtitle">{cert.issuer}{cert.date && ` — ${cert.date}`}</div>
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
}
