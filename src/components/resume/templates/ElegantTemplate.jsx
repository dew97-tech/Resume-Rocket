import './templateStyles.css';
export default function ElegantTemplate({ resume, settings }) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container elegant-template" style={{ padding: 0 }}>
      <div className="elegant-header" style={{ borderBottom: `3px solid ${color}` }}>
        <h1 style={{ fontSize: '1.5em', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 2 }}>{pi.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: '0.85em', color, marginBottom: 8 }}>{pi.title || 'Your Title'}</p>
        <div className="elegant-contact-row">
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.website && <span>{pi.website}</span>}
          {pi.linkedin && <span>{pi.linkedin}</span>}
        </div>
      </div>

      <div className="elegant-body">
        <div className="elegant-left">
          {resume.skills.some(s => s.items) && <div className="rt-section" style={{ marginTop: 0 }}>
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Professional Skills</div>
              {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{ marginBottom: 12 }}>
                  {skill.category && <div style={{ fontSize: '0.8em', fontWeight: 700, marginBottom: 6, color }}>{skill.category}</div>}
                  {skill.items.split(',').map((item, j) => {
                    const val = 70 + Math.floor(Math.random() * 30);
                    return <div key={j} style={{ marginBottom: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: 2 }}>
                        <span>{item.trim()}</span>
                        <span style={{ color: 'var(--text-muted, #999)', fontSize: '0.85em' }}>{val}%</span>
                      </div>
                      <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 2 }} />
                      </div>
                    </div>;
                  })}
                </div>)}
            </div>}

          {resume.languages.some(l => l.language) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Languages</div>
              {resume.languages.filter(l => l.language).map((lang, i) => {
                const profMap = { 'Native': 100, 'Fluent': 90, 'Advanced': 80, 'Conversational': 60, 'Intermediate': 50, 'Basic': 30 };
                const val = profMap[lang.proficiency] || 50;
                return <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600 }}>{lang.language}</span>
                    <span style={{ color: 'var(--text-muted, #999)', fontSize: '0.85em' }}>{lang.proficiency}</span>
                  </div>
                  <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 2 }} />
                  </div>
                </div>;
              })}
            </div>}

          {resume.certifications.some(c => c.name) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Certifications</div>
              {resume.certifications.filter(c => c.name).map((cert, i) => <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: '0.85em', fontWeight: 600 }}>{cert.name}</div>
                  <div style={{ fontSize: '0.75em', color: 'var(--text-muted, #999)' }}>{cert.issuer}{cert.date && `, ${cert.date}`}</div>
                </div>)}
            </div>}
        </div>

        <div className="elegant-right">
          {pi.summary && <div className="rt-section" style={{ marginTop: 0 }}>
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Profile</div>
              <p className="rt-summary">{pi.summary}</p>
            </div>}

          {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Work Experience</div>
              {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-header">
                    <div>
                      <div className="rt-entry-title" style={{ fontWeight: 700 }}>{exp.position}</div>
                      <div className="rt-entry-subtitle" style={{ fontStyle: 'italic', color }}>{exp.company}</div>
                    </div>
                    <div className="rt-entry-date">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  {exp.description && <div className="rt-entry-desc">{exp.description}</div>}
                </div>)}
            </div>}

          {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Education</div>
              {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-header">
                    <div>
                      <div className="rt-entry-title" style={{ fontWeight: 700 }}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                      <div className="rt-entry-subtitle" style={{ fontStyle: 'italic', color }}>{edu.institution}</div>
                    </div>
                    <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
                  </div>
                </div>)}
            </div>}

          {resume.projects.some(p => p.name) && <div className="rt-section">
              <div className="rt-section-title" style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color, borderBottom: `1px solid ${color}`, paddingBottom: 4 }}>Projects</div>
              {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
                  <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{ color }}>↗</a>}</div>
                  {proj.technologies && <div className="rt-entry-subtitle" style={{ fontSize: '0.8em' }}>Tech: {proj.technologies}</div>}
                  {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
}
