import './templateStyles.css';
export default function PortfolioTemplate({ resume, settings }) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container portfolio-template" style={{ padding: 0 }}>
      <div className="portfolio-sidebar" style={{ background: color }}>
        <div style={{ padding: '24px 20px' }}>
          <h1 style={{ fontSize: '1.6em', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 4, textTransform: 'uppercase' }}>{pi.fullName || 'Your Name'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 20 }}>{pi.title || 'Your Title'}</p>

          {pi.summary && <p style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 20 }}>{pi.summary}</p>}
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <div className="rt-section">
            <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65em', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>ACHIEVEMENTS</div>
            {resume.certifications.some(c => c.name) && resume.certifications.filter(c => c.name).map((cert, i) => <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: '0.85em', fontWeight: 600, color: '#fff' }}>{cert.name}</div>
                <div style={{ fontSize: '0.75em', color: 'rgba(255,255,255,0.6)' }}>{cert.issuer}{cert.date && `, ${cert.date}`}</div>
              </div>)}
          </div>

          <div className="rt-section">
            <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65em', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>CONTACT</div>
            <div className="rt-contact" style={{ fontSize: '0.8em' }}>
              {pi.phone && <span>☎ {pi.phone}</span>}
              {pi.location && <span>📍 {pi.location}</span>}
              {pi.email && <span>✉ {pi.email}</span>}
              {pi.website && <span>🌐 {pi.website}</span>}
              {pi.linkedin && <span>in {pi.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-main">
        {resume.experience.some(e => e.company || e.position) && <div className="rt-section" style={{ marginTop: 0 }}>
            <div className="rt-section-title" style={{ color, borderBottomColor: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Work Experience</div>
            {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title" style={{ fontWeight: 700 }}>{exp.position}</div>
                    <div className="rt-entry-subtitle" style={{ fontStyle: 'italic' }}>{exp.company}</div>
                  </div>
                  <div className="rt-entry-date">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
                </div>
                {exp.description && <div className="rt-entry-desc">{exp.description}</div>}
              </div>)}
          </div>}

        {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
            <div className="rt-section-title" style={{ color, borderBottomColor: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Academic History</div>
            {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12 }}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title" style={{ fontWeight: 700 }}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                    <div className="rt-entry-subtitle" style={{ fontStyle: 'italic' }}>{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</div>
                  </div>
                  <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
                </div>
              </div>)}
          </div>}

        {resume.skills.some(s => s.items) && <div className="rt-section">
            <div className="rt-section-title" style={{ color, borderBottomColor: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</div>
            {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{ marginBottom: 10 }}>
                {skill.category && <div style={{ fontSize: '0.85em', fontWeight: 700, marginBottom: 4 }}>{skill.category}</div>}
                <div className="rt-skills-grid">
                  {skill.items.split(',').map((item, j) => <span className="rt-skill-tag" key={j} style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>{item.trim()}</span>)}
                </div>
              </div>)}
          </div>}

        {resume.projects.some(p => p.name) && <div className="rt-section">
            <div className="rt-section-title" style={{ color, borderBottomColor: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Projects</div>
            {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{ color }}>↗</a>}</div>
                {proj.technologies && <div className="rt-entry-subtitle" style={{ fontSize: '0.8em' }}>Tech: {proj.technologies}</div>}
                {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
              </div>)}
          </div>}

        {resume.languages.some(l => l.language) && <div className="rt-section">
            <div className="rt-section-title" style={{ color, borderBottomColor: color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {resume.languages.filter(l => l.language).map((lang, i) => <div key={i} style={{ fontSize: '0.85em' }}>
                  <span style={{ fontWeight: 600 }}>{lang.language}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>({lang.proficiency})</span>
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
}
