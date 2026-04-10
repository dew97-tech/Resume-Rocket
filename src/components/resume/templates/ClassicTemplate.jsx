import './templateStyles.css';
export default function ClassicTemplate({
  resume,
  settings
}) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container classic-template">
      <div className="rt-header" style={{
      borderBottomColor: color
    }}>
        <h1 className="rt-name" style={{
        fontSize: '1.8em',
        color
      }}>{pi.fullName || 'Your Name'}</h1>
        <p className="rt-title">{pi.title || 'Your Title'}</p>
        <div className="rt-contact">
          {pi.email && <span>✉ {pi.email}</span>}
          {pi.phone && <span>☎ {pi.phone}</span>}
          {pi.location && <span>📍 {pi.location}</span>}
          {pi.website && <span>🌐 {pi.website}</span>}
          {pi.linkedin && <span>in {pi.linkedin}</span>}
        </div>
      </div>

      {pi.summary && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color
      }}>Summary</div>
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

      {resume.skills.some(s => s.items) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color
      }}>Skills</div>
          {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{
        marginBottom: 8
      }}>
              {skill.category && <strong style={{
          fontSize: '0.85em'
        }}>{skill.category}: </strong>}
              <span style={{
          fontSize: '0.85em',
          color: '#555'
        }}>{skill.items}</span>
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
          color: '#555',
          border: `1px solid ${color}30`
        }}>{lang.language} — {lang.proficiency}</span>)}
          </div>
        </div>}
    </div>;
}
