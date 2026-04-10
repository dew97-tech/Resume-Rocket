import './templateStyles.css';
export default function CreativeTemplate({
  resume,
  settings
}) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  const lightenColor = (hex, amt = 40) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + amt);
    const g = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const b = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return <div className="rt-container creative-template">

      <div className="creative-header" style={{
      background: `linear-gradient(135deg, ${color}, ${lightenColor(color, 60)})`
    }}>
        <h1 className="rt-name" style={{
        fontSize: '2em',
        color: '#fff'
      }}>{pi.fullName || 'Your Name'}</h1>
        <p className="rt-title" style={{
        color: 'rgba(255,255,255,0.85)',
        fontSize: '1.1em',
        marginTop: 4
      }}>{pi.title || 'Your Title'}</p>
        <div className="rt-contact" style={{
        color: 'rgba(255,255,255,0.8)',
        marginTop: 12
      }}>
          {pi.email && <span>✉ {pi.email}</span>}
          {pi.phone && <span>☎ {pi.phone}</span>}
          {pi.location && <span>📍 {pi.location}</span>}
          {pi.website && <span>🌐 {pi.website}</span>}
        </div>
      </div>


      <div className="creative-body">
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
            {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i} style={{
          paddingLeft: 16,
          borderLeft: `3px solid ${color}`
        }}>
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
            {resume.education.filter(e => e.institution || e.degree).map((edu, i) => <div className="rt-entry" key={i} style={{
          paddingLeft: 16,
          borderLeft: `3px solid ${color}`
        }}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                    <div className="rt-entry-subtitle">{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</div>
                  </div>
                  <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
                </div>
              </div>)}
          </div>}

        {resume.skills.some(s => s.items) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Skills</div>
            {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{
          marginBottom: 10
        }}>
                {skill.category && <div style={{
            fontWeight: 700,
            fontSize: '0.85em',
            marginBottom: 6,
            color
          }}>{skill.category}</div>}
                <div className="rt-skills-grid">
                  {skill.items.split(',').map((item, j) => <span className="rt-skill-tag" key={j} style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}30`
            }}>
                      {item.trim()}
                    </span>)}
                </div>
              </div>)}
          </div>}

        {resume.projects.some(p => p.name) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Projects</div>
            {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i} style={{
          paddingLeft: 16,
          borderLeft: `3px solid ${color}`
        }}>
                <div className="rt-entry-title">{proj.name}</div>
                {proj.technologies && <div className="rt-entry-subtitle" style={{
            fontSize: '0.8em'
          }}>Tech: {proj.technologies}</div>}
                {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
              </div>)}
          </div>}

        {resume.certifications.some(c => c.name) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Certifications</div>
            {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-header">
                  <div>
                    <div className="rt-entry-title">{cert.name}</div>
                    <div className="rt-entry-subtitle">{cert.issuer}</div>
                  </div>
                  <div className="rt-entry-date">{cert.date}</div>
                </div>
              </div>)}
          </div>}

        {(resume.languages || []).some(l => l.language) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Languages</div>
            <div className="rt-skills-grid">
              {(resume.languages || []).filter(l => l.language).map((lang, i) => <span className="rt-skill-tag" key={i} style={{
            background: `${color}15`,
            color,
            border: `1px solid ${color}30`
          }}>{lang.language} · {lang.proficiency}</span>)}
            </div>
          </div>}
      </div>
    </div>;
}
