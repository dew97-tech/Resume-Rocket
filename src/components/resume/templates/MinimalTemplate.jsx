import './templateStyles.css';
export default function MinimalTemplate({
  resume,
  settings
}) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container minimal-template" style={{
    padding: '40px 36px'
  }}>
      <div className="rt-header">
        <h1 className="rt-name" style={{
        fontSize: '2em',
        fontWeight: 300,
        letterSpacing: '2px'
      }}>{pi.fullName || 'Your Name'}</h1>
        <p className="rt-title" style={{
        fontSize: '1em',
        color: '#888',
        fontWeight: 300
      }}>{pi.title || 'Your Title'}</p>
        <div className="rt-contact" style={{
        marginTop: 12,
        gap: 16
      }}>
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.website && <span>{pi.website}</span>}
        </div>
      </div>

      {pi.summary && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>About</div>
          <p className="rt-summary">{pi.summary}</p>
        </div>}

      {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Experience</div>
          {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-header">
                <div>
                  <div className="rt-entry-title" style={{
              fontWeight: 600
            }}>{exp.position} <span style={{
                fontWeight: 400,
                color: '#888'
              }}>at {exp.company}</span></div>
                </div>
                <div className="rt-entry-date">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) && ' — '}{exp.current ? 'Present' : exp.endDate}</div>
              </div>
              {exp.description && <div className="rt-entry-desc">{exp.description}</div>}
            </div>)}
        </div>}

      {resume.education.some(e => e.institution || e.degree) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Education</div>
          {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-header">
                <div>
                  <div className="rt-entry-title" style={{
              fontWeight: 600
            }}>{edu.degree}{edu.field && ` — ${edu.field}`}</div>
                  <div className="rt-entry-subtitle">{edu.institution}{edu.gpa && ` · ${edu.gpa}`}</div>
                </div>
                <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
              </div>
            </div>)}
        </div>}

      {resume.skills.some(s => s.items) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Skills</div>
          <div className="rt-skills-grid" style={{
        gap: 6
      }}>
            {resume.skills.filter(s => s.items).flatMap(s => s.items.split(',')).map((item, i) => <span className="rt-skill-tag" key={i} style={{
          background: '#f5f5f5',
          color: '#555',
          border: '1px solid #e0e0e0'
        }}>
                {item.trim()}
              </span>)}
          </div>
        </div>}

      {resume.projects.some(p => p.name) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Projects</div>
          {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-title" style={{
          fontWeight: 600
        }}>{proj.name}</div>
              {proj.technologies && <div className="rt-entry-subtitle" style={{
          fontSize: '0.8em'
        }}>{proj.technologies}</div>}
              {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
            </div>)}
        </div>}

      {resume.certifications.some(c => c.name) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Certifications</div>
          {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
              <span className="rt-entry-title" style={{
          fontWeight: 600
        }}>{cert.name}</span>
              {cert.issuer && <span style={{
          color: '#888',
          fontSize: '0.85em'
        }}> · {cert.issuer}</span>}
              {cert.date && <span style={{
          color: '#aaa',
          fontSize: '0.8em'
        }}> · {cert.date}</span>}
            </div>)}
        </div>}

      {(resume.languages || []).some(l => l.language) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: '#e0e0e0',
        color: '#999'
      }}>Languages</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {(resume.languages || []).filter(l => l.language).map((lang, i) => <span key={i} style={{ fontSize: '0.85em', color: '#555' }}>
                <strong>{lang.language}</strong> — {lang.proficiency}
              </span>)}
          </div>
        </div>}
    </div>;
}
