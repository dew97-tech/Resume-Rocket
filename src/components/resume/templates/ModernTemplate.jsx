import './templateStyles.css';
export default function ModernTemplate({
  resume,
  settings
}) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container modern-template" style={{
    padding: 0
  }}>
      
      <div className="modern-sidebar" style={{
      background: color
    }}>
        <h1 className="rt-name" style={{
        fontSize: '1.4em',
        color: '#fff',
        marginBottom: 4
      }}>{pi.fullName || 'Your Name'}</h1>
        <p className="rt-title" style={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.9em'
      }}>{pi.title || 'Your Title'}</p>

        <div className="rt-section">
          <div className="rt-section-title">Contact</div>
          <div className="rt-contact">
            {pi.email && <span>✉ {pi.email}</span>}
            {pi.phone && <span>☎ {pi.phone}</span>}
            {pi.location && <span>📍 {pi.location}</span>}
            {pi.website && <span>🌐 {pi.website}</span>}
            {pi.linkedin && <span>in {pi.linkedin}</span>}
          </div>
        </div>

        {resume.skills.some(s => s.items) && <div className="rt-section">
            <div className="rt-section-title">Skills</div>
            {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{
          marginBottom: 10
        }}>
                {skill.category && <div style={{
            fontSize: '0.8em',
            fontWeight: 600,
            marginBottom: 4,
            color: 'rgba(255,255,255,0.9)'
          }}>{skill.category}</div>}
                <div className="rt-skills-grid">
                  {skill.items.split(',').map((item, j) => <span className="rt-skill-tag" key={j}>{item.trim()}</span>)}
                </div>
              </div>)}
          </div>}

        {resume.certifications.some(c => c.name) && <div className="rt-section">
            <div className="rt-section-title">Certifications</div>
            {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-title" style={{
            color: '#fff',
            fontSize: '0.85em'
          }}>{cert.name}</div>
                <div className="rt-entry-subtitle">{cert.issuer}</div>
                <div className="rt-entry-date">{cert.date}</div>
              </div>)}
          </div>}
      </div>

      
      <div className="modern-main">
        {pi.summary && <div className="rt-section" style={{
        marginTop: 0
      }}>
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Profile</div>
            <p className="rt-summary">{pi.summary}</p>
          </div>}

        {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Experience</div>
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
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Education</div>
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
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Projects</div>
            {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-title">{proj.name} {proj.link && <a className="rt-link" href={proj.link} style={{
              color
            }}>↗</a>}</div>
                {proj.technologies && <div className="rt-entry-subtitle" style={{
            fontSize: '0.8em'
          }}>Tech: {proj.technologies}</div>}
                {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
              </div>)}
          </div>}
      </div>
    </div>;
}