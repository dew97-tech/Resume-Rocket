import './templateStyles.css';

export default function NeobrutalistTemplate({ resume, settings }) {
  const accent = settings.primaryColor || '#FFE600';
  const pi = resume.personalInfo;

  return (
    <div
      className="rt-container neobrutalist-template"
      style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Top Header Card */}
      <div
        style={{
          border: '2.5px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          padding: '18px 22px',
          marginBottom: '20px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1
              style={{
                fontSize: '1.9em',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                margin: 0,
                textTransform: 'uppercase',
                color: '#000000',
              }}
            >
              {pi.fullName || 'Your Name'}
            </h1>
            <div
              style={{
                display: 'inline-block',
                marginTop: '6px',
                padding: '3px 10px',
                backgroundColor: accent,
                border: '1.5px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                fontSize: '0.85em',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              {pi.title || 'Professional Title'}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '0.8em',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {pi.email && <span>✉ {pi.email}</span>}
            {pi.phone && <span>☎ {pi.phone}</span>}
            {pi.location && <span>📍 {pi.location}</span>}
            {pi.website && <span>🌐 {pi.website}</span>}
            {pi.linkedin && <span>in {pi.linkedin}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {pi.summary && (
        <div className="rt-section" style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.9em',
              fontWeight: 900,
              textTransform: 'uppercase',
              padding: '2px 8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}
          >
            Profile Summary
          </div>
          <p
            style={{
              fontSize: '0.88em',
              lineHeight: 1.6,
              margin: 0,
              borderLeft: `3px solid ${accent}`,
              paddingLeft: '12px',
            }}
          >
            {pi.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.experience && resume.experience.some((e) => e.company || e.position) && (
        <div className="rt-section" style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.9em',
              fontWeight: 900,
              textTransform: 'uppercase',
              padding: '2px 8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Work Experience
          </div>
          {resume.experience
            .filter((e) => e.company || e.position)
            .map((exp, i) => (
              <div
                key={i}
                style={{
                  border: '1.5px solid #000000',
                  boxShadow: '3px 3px 0px #000000',
                  padding: '12px 16px',
                  marginBottom: '10px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <div>
                    <span style={{ fontSize: '0.95em', fontWeight: 800 }}>{exp.position}</span>
                    <span style={{ fontSize: '0.85em', fontWeight: 700, color: '#4B5563', marginLeft: '8px' }}>
                      @ {exp.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75em',
                      fontWeight: 700,
                      backgroundColor: accent,
                      padding: '2px 6px',
                      border: '1px solid #000',
                    }}
                  >
                    {exp.startDate}
                    {exp.startDate && (exp.endDate || exp.current) && ' — '}
                    {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ fontSize: '0.82em', lineHeight: 1.5, margin: 0, color: '#1F2937' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.some((e) => e.institution || e.degree) && (
        <div className="rt-section" style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.9em',
              fontWeight: 900,
              textTransform: 'uppercase',
              padding: '2px 8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Education
          </div>
          {resume.education
            .filter((e) => e.institution || e.degree)
            .map((edu, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1.5px dashed #000000',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9em', fontWeight: 800 }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.8em', color: '#4B5563' }}>{edu.institution}</div>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75em', fontWeight: 700 }}>
                  {edu.graduationDate}
                </span>
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.some((s) => s.items) && (
        <div className="rt-section" style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.9em',
              fontWeight: 900,
              textTransform: 'uppercase',
              padding: '2px 8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginBottom: '10px',
            }}
          >
            Skills & Competencies
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {resume.skills
              .filter((s) => s.items)
              .flatMap((skill) => skill.items.split(','))
              .map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.78em',
                    fontWeight: 800,
                    padding: '3px 8px',
                    border: '1.5px solid #000000',
                    boxShadow: '2px 2px 0px #000000',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {item.trim()}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.some((p) => p.name) && (
        <div className="rt-section" style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.9em',
              fontWeight: 900,
              textTransform: 'uppercase',
              padding: '2px 8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginBottom: '10px',
            }}
          >
            Projects
          </div>
          {resume.projects
            .filter((p) => p.name)
            .map((proj, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '0.88em', fontWeight: 800 }}>
                  {proj.name} {proj.link && <span style={{ fontSize: '0.8em', color: '#4B5563' }}>({proj.link})</span>}
                </div>
                {proj.description && (
                  <p style={{ fontSize: '0.8em', color: '#374151', margin: '2px 0 0' }}>{proj.description}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
