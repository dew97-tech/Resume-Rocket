import './templateStyles.css';
export default function SidebarTemplate({ resume, settings }) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container sidebar-template" style={{ padding: 0 }}>
      <div className="sidebar-left" style={{ background: color }}>
        <div className="sidebar-photo-area">
          <div className="sidebar-photo-placeholder" style={{ border: `3px solid rgba(255,255,255,0.3)` }}>
            <span style={{ fontSize: '2em', color: 'rgba(255,255,255,0.5)' }}>👤</span>
          </div>
        </div>

        <h1 className="rt-name" style={{ fontSize: '1.3em', color: '#fff', textAlign: 'center', marginBottom: 2 }}>{pi.fullName || 'Your Name'}</h1>
        <p className="rt-title" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85em', textAlign: 'center', marginBottom: 16 }}>{pi.title || 'Your Title'}</p>

        <div className="rt-section">
          <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7em', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>CONTACT</div>
          <div className="rt-contact" style={{ fontSize: '0.8em' }}>
            {pi.email && <span>✉ {pi.email}</span>}
            {pi.phone && <span>☎ {pi.phone}</span>}
            {pi.location && <span>📍 {pi.location}</span>}
            {pi.website && <span>🌐 {pi.website}</span>}
            {pi.linkedin && <span>in {pi.linkedin}</span>}
          </div>
        </div>

        {resume.skills.some(s => s.items) && <div className="rt-section">
            <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7em', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>SKILLS</div>
            {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{ marginBottom: 10 }}>
                {skill.category && <div style={{ fontSize: '0.8em', fontWeight: 600, marginBottom: 4, color: 'rgba(255,255,255,0.9)' }}>{skill.category}</div>}
                <div className="rt-skills-grid">
                  {skill.items.split(',').map((item, j) => <span className="rt-skill-tag" key={j}>{item.trim()}</span>)}
                </div>
              </div>)}
          </div>}

        {resume.languages.some(l => l.language) && <div className="rt-section">
            <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7em', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>LANGUAGES</div>
            {resume.languages.filter(l => l.language).map((lang, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', color: '#fff', marginBottom: 6 }}>
                <span>{lang.language}</span>
                <span style={{ opacity: 0.7, fontSize: '0.85em' }}>{lang.proficiency}</span>
              </div>)}
          </div>}

        {resume.certifications.some(c => c.name) && <div className="rt-section">
            <div className="rt-section-title" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7em', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>CERTIFICATIONS</div>
            {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
                <div style={{ fontSize: '0.85em', fontWeight: 600, color: '#fff' }}>{cert.name}</div>
                <div style={{ fontSize: '0.75em', color: 'rgba(255,255,255,0.7)' }}>{cert.issuer}{cert.date && ` — ${cert.date}`}</div>
              </div>)}
          </div>}
      </div>

      <div className="sidebar-main">
        {pi.summary && <div className="rt-section" style={{ marginTop: 0 }}>
            <div className="rt-section-title" style={{ borderBottomColor: color, color }}>About Me</div>
            <p className="rt-summary">{pi.summary}</p>
          </div>}

        {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
            <div className="rt-section-title" style={{ borderBottomColor: color, color }}>Professional Experience</div>
            {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title">{exp.position}</div>
                    <div className="rt-entry-subtitle">{exp.company}</div>
                  </div>
                  <div className="rt-entry-date">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
                </div>
                {exp.description && <div className="rt-entry-desc">{exp.description}</div>}
              </div>)}
          </div>}

        {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
            <div className="rt-section-title" style={{ borderBottomColor: color, color }}>Education</div>
            {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                    <div className="rt-entry-subtitle">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</div>
                  </div>
                  <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
                </div>
              </div>)}
          </div>}

        {resume.projects.some(p => p.name) && <div className="rt-section">
            <div className="rt-section-title" style={{ borderBottomColor: color, color }}>Projects</div>
            {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{ color }}>↗</a>}</div>
                {proj.technologies && <div className="rt-entry-subtitle" style={{ fontSize: '0.8em' }}>Tech: {proj.technologies}</div>}
                {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
              </div>)}
          </div>}
      </div>
    </div>;
}
