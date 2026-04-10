import './templateStyles.css';
export default function ExecutiveTemplate({
  resume,
  settings
}) {
  const color = settings.primaryColor;
  const pi = resume.personalInfo;
  return <div className="rt-container executive-template" style={{
    padding: '40px 36px',
    fontFamily: "Georgia, 'Times New Roman', serif"
  }}>
      <div className="rt-header" style={{
      borderBottomColor: color
    }}>
        <h1 className="rt-name" style={{
        fontSize: '1.8em',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color
      }}>{pi.fullName || 'YOUR NAME'}</h1>
        <p className="rt-title" style={{
        fontSize: '0.95em',
        letterSpacing: '1px',
        color: '#666',
        marginTop: 4
      }}>{pi.title || 'Your Title'}</p>
        <div className="rt-contact" style={{
        marginTop: 12,
        gap: 20
      }}>
          {pi.email && <span>{pi.email}</span>}
          {pi.phone && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.website && <span>{pi.website}</span>}
          {pi.linkedin && <span>{pi.linkedin}</span>}
        </div>
      </div>

      {pi.summary && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color,
        fontFamily: "Georgia, serif"
      }}>Executive Summary</div>
          <p className="rt-summary" style={{
        fontStyle: 'italic'
      }}>{pi.summary}</p>
        </div>}

      {resume.experience.some(e => e.company || e.position) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color
      }}>Professional Experience</div>
          {resume.experience.filter(e => e.company || e.position).map((exp, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-header">
                <div>
                  <div className="rt-entry-title" style={{
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.95em'
            }}>{exp.position}</div>
                  <div className="rt-entry-subtitle" style={{
              fontStyle: 'italic'
            }}>{exp.company}</div>
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
                  <div className="rt-entry-title" style={{
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.95em'
            }}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                  <div className="rt-entry-subtitle" style={{
              fontStyle: 'italic'
            }}>{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</div>
                </div>
                <div className="rt-entry-date">{edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}</div>
              </div>
            </div>)}
        </div>}

      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24
    }}>
        {resume.skills.some(s => s.items) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Core Competencies</div>
            {resume.skills.filter(s => s.items).map((skill, i) => <div key={i} style={{
          marginBottom: 8
        }}>
                {skill.category && <strong style={{
            fontSize: '0.85em',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>{skill.category}</strong>}
                <div style={{
            fontSize: '0.85em',
            color: '#555',
            marginTop: 2
          }}>{skill.items}</div>
              </div>)}
          </div>}

        {resume.certifications.some(c => c.name) && <div className="rt-section">
            <div className="rt-section-title" style={{
          borderBottomColor: color,
          color
        }}>Certifications</div>
            {resume.certifications.filter(c => c.name).map((cert, i) => <div className="rt-entry" key={i}>
                <div className="rt-entry-title" style={{
            fontSize: '0.9em'
          }}>{cert.name}</div>
                <div className="rt-entry-subtitle" style={{
            fontStyle: 'italic'
          }}>{cert.issuer}{cert.date && ` · ${cert.date}`}</div>
              </div>)}
          </div>}
      </div>

      {resume.projects.some(p => p.name) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color
      }}>Notable Projects</div>
          {resume.projects.filter(p => p.name).map((proj, i) => <div className="rt-entry" key={i}>
              <div className="rt-entry-title" style={{
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.9em'
        }}>{proj.name}</div>
              {proj.technologies && <div className="rt-entry-subtitle" style={{
          fontSize: '0.8em',
          fontStyle: 'italic'
        }}>{proj.technologies}</div>}
              {proj.description && <div className="rt-entry-desc">{proj.description}</div>}
            </div>)}
        </div>}

      {(resume.languages || []).some(l => l.language) && <div className="rt-section">
          <div className="rt-section-title" style={{
        borderBottomColor: color,
        color
      }}>Languages</div>
          {(resume.languages || []).filter(l => l.language).map((lang, i) => <div className="rt-entry" key={i} style={{ marginBottom: 4 }}>
              <span className="rt-entry-title" style={{ fontSize: '0.9em' }}>{lang.language}</span>
              <span className="rt-entry-subtitle" style={{ fontStyle: 'italic', marginLeft: 8 }}>{lang.proficiency}</span>
            </div>)}
        </div>}
    </div>;
}
