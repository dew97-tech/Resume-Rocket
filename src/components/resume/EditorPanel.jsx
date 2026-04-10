import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiAward, FiBook, FiBriefcase, FiChevronDown, FiFileText, FiFolder, FiGlobe, FiPlus, FiStar, FiTrash2, FiUser } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import { useToast } from '../../contexts/ToastContext';
const sectionMeta = {
  personalInfo: {
    icon: <FiUser />,
    label: 'Personal Information'
  },
  summary: {
    icon: <FiFileText />,
    label: 'Professional Summary'
  },
  experience: {
    icon: <FiBriefcase />,
    label: 'Work Experience'
  },
  education: {
    icon: <FiBook />,
    label: 'Education'
  },
  skills: {
    icon: <FiStar />,
    label: 'Skills'
  },
  projects: {
    icon: <FiFolder />,
    label: 'Projects'
  },
  certifications: {
    icon: <FiAward />,
    label: 'Certifications'
  },
  languages: {
    icon: <FiGlobe />,
    label: 'Languages'
  }
};
export default function EditorPanel() {
  const {
    resume,
    dispatch
  } = useResume();
  const toast = useToast();
  const [openSections, setOpenSections] = useState(['personalInfo']);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const toggleSection = key => {
    setOpenSections(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };
  const isOpen = key => openSections.includes(key);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = resume.sectionOrder.indexOf(active.id);
      const newIndex = resume.sectionOrder.indexOf(over.id);
      dispatch({ type: 'SET_SECTION_ORDER', payload: arrayMove(resume.sectionOrder, oldIndex, newIndex) });
    }
  };

  return <div className="editor-panel">
      <div className="editor-header">
        <h2>Resume Editor</h2>
        <p>Fill in your details below — changes appear instantly in the preview.</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resume.sectionOrder} strategy={verticalListSortingStrategy}>
          {resume.sectionOrder.map(sectionKey => {
      const meta = sectionMeta[sectionKey];
      if (!meta) return null;
      return <SortableSection key={sectionKey} sectionKey={sectionKey} meta={meta} isOpen={isOpen(sectionKey)} onToggle={() => toggleSection(sectionKey)}>
                    {sectionKey === 'personalInfo' && <PersonalInfoForm />}
                    {sectionKey === 'summary' && <SummaryForm />}
                    {sectionKey === 'experience' && <ExperienceForm />}
                    {sectionKey === 'education' && <EducationForm />}
                    {sectionKey === 'skills' && <SkillsForm />}
                    {sectionKey === 'projects' && <ProjectsForm />}
                    {sectionKey === 'certifications' && <CertificationsForm />}
                    {sectionKey === 'languages' && <LanguagesForm />}
                  </SortableSection>;
    })}
        </SortableContext>
      </DndContext>
    </div>;
}
function SortableSection({ sectionKey, meta, isOpen, onToggle, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionKey });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return <div className="editor-section" ref={setNodeRef} style={style}>
      <div className={`section-header ${isOpen ? 'open' : ''}`} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onToggle()}>
        <div className="section-header-left" onClick={onToggle} style={{ flex: 1, cursor: 'pointer' }}>
          <span className="drag-handle" {...attributes} {...listeners} title="Drag to reorder" onClick={e => e.stopPropagation()}>⠿</span>
          <span className="section-header-icon">{meta.icon}</span>
          {meta.label}
        </div>
        <FiChevronDown className={`section-chevron ${isOpen ? 'open' : ''}`} onClick={onToggle} style={{ cursor: 'pointer' }} />
      </div>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.25
      }} style={{
        overflow: 'hidden'
      }}>
              <div className="section-body">
                {children}
              </div>
            </motion.div>}
      </AnimatePresence>
    </div>;
}
function PersonalInfoForm() {
  const {
    resume,
    dispatch
  } = useResume();
  const pi = resume.personalInfo;
  const update = (field, value) => dispatch({
    type: 'SET_PERSONAL_INFO',
    payload: {
      [field]: value
    }
  });
  return <>
      <div className="grid-2">
        <div className="form-group">
          <label>Full Name</label>
          <input className="glass-input" placeholder="John Doe" value={pi.fullName} onChange={e => update('fullName', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input className="glass-input" placeholder="Software Engineer" value={pi.title} onChange={e => update('title', e.target.value)} />
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Email</label>
          <input className="glass-input" type="email" placeholder="john@example.com" value={pi.email} onChange={e => update('email', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input className="glass-input" placeholder="+1 (555) 123-4567" value={pi.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Location</label>
          <input className="glass-input" placeholder="New York, NY" value={pi.location} onChange={e => update('location', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input className="glass-input" placeholder="https://yoursite.com" value={pi.website} onChange={e => update('website', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input className="glass-input" placeholder="linkedin.com/in/johndoe" value={pi.linkedin} onChange={e => update('linkedin', e.target.value)} />
      </div>
    </>;
}
function SummaryForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <div className="form-group">
      <label>Professional Summary</label>
      <textarea className="glass-input" rows={4} placeholder="A brief overview of your professional background, key skills, and career goals..." value={resume.personalInfo.summary} onChange={e => dispatch({
      type: 'SET_PERSONAL_INFO',
      payload: {
        summary: e.target.value
      }
    })} style={{
      resize: 'vertical',
      minHeight: 80
    }} />
    </div>;
}
function ExperienceForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <>
      {resume.experience.map((exp, i) => <div className="entry-card" key={exp.id}>
          <div className="grid-2">
            <div className="form-group">
              <label>Company</label>
              <input className="glass-input" placeholder="Acme Corp" value={exp.company} onChange={e => dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: i,
            payload: {
              company: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input className="glass-input" placeholder="Senior Developer" value={exp.position} onChange={e => dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: i,
            payload: {
              position: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Start Date</label>
              <input className="glass-input" placeholder="Jan 2022" value={exp.startDate} onChange={e => dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: i,
            payload: {
              startDate: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input className="glass-input" placeholder="Present" value={exp.endDate} disabled={exp.current} onChange={e => dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: i,
            payload: {
              endDate: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" checked={exp.current} onChange={e => dispatch({
          type: 'UPDATE_EXPERIENCE',
          index: i,
          payload: {
            current: e.target.checked,
            endDate: e.target.checked ? 'Present' : ''
          }
        })} />
            <span>Currently working here</span>
          </div>
          <div className="form-group" style={{
        marginTop: 8
      }}>
            <label>Description</label>
            <textarea className="glass-input" rows={3} placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={e => dispatch({
          type: 'UPDATE_EXPERIENCE',
          index: i,
          payload: {
            description: e.target.value
          }
        })} style={{
          resize: 'vertical'
        }} />
          </div>
          {resume.experience.length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_EXPERIENCE',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_EXPERIENCE'
    })}><FiPlus size={16} /> Add Experience</button>
    </>;
}
function EducationForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <>
      {resume.education.map((edu, i) => <div className="entry-card" key={edu.id}>
          <div className="grid-2">
            <div className="form-group">
              <label>Institution</label>
              <input className="glass-input" placeholder="MIT" value={edu.institution} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              institution: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input className="glass-input" placeholder="Bachelor of Science" value={edu.degree} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              degree: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Field of Study</label>
              <input className="glass-input" placeholder="Computer Science" value={edu.field} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              field: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input className="glass-input" placeholder="3.8/4.0" value={edu.gpa} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              gpa: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Start Date</label>
              <input className="glass-input" placeholder="Sep 2018" value={edu.startDate} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              startDate: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input className="glass-input" placeholder="Jun 2022" value={edu.endDate} onChange={e => dispatch({
            type: 'UPDATE_EDUCATION',
            index: i,
            payload: {
              endDate: e.target.value
            }
          })} />
            </div>
          </div>
          {resume.education.length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_EDUCATION',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_EDUCATION'
    })}><FiPlus size={16} /> Add Education</button>
    </>;
}
function SkillsForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <>
      {resume.skills.map((skill, i) => <div className="entry-card" key={skill.id}>
          <div className="form-group" style={{
        marginBottom: 8
      }}>
            <label>Category</label>
            <input className="glass-input" placeholder="e.g. Programming Languages" value={skill.category} onChange={e => dispatch({
          type: 'UPDATE_SKILL',
          index: i,
          payload: {
            category: e.target.value
          }
        })} />
          </div>
          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <input className="glass-input" placeholder="JavaScript, Python, React, Node.js" value={skill.items} onChange={e => dispatch({
          type: 'UPDATE_SKILL',
          index: i,
          payload: {
            items: e.target.value
          }
        })} />
          </div>
          {resume.skills.length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_SKILL',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_SKILL'
    })}><FiPlus size={16} /> Add Skill Category</button>
    </>;
}
function ProjectsForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <>
      {resume.projects.map((proj, i) => <div className="entry-card" key={proj.id}>
          <div className="grid-2">
            <div className="form-group">
              <label>Project Name</label>
              <input className="glass-input" placeholder="My Awesome Project" value={proj.name} onChange={e => dispatch({
            type: 'UPDATE_PROJECT',
            index: i,
            payload: {
              name: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>Link</label>
              <input className="glass-input" placeholder="https://github.com/..." value={proj.link} onChange={e => dispatch({
            type: 'UPDATE_PROJECT',
            index: i,
            payload: {
              link: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="form-group">
            <label>Technologies</label>
            <input className="glass-input" placeholder="React, Node.js, MongoDB" value={proj.technologies} onChange={e => dispatch({
          type: 'UPDATE_PROJECT',
          index: i,
          payload: {
            technologies: e.target.value
          }
        })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="glass-input" rows={2} placeholder="Brief description of the project..." value={proj.description} onChange={e => dispatch({
          type: 'UPDATE_PROJECT',
          index: i,
          payload: {
            description: e.target.value
          }
        })} style={{
          resize: 'vertical'
        }} />
          </div>
          {resume.projects.length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_PROJECT',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_PROJECT'
    })}><FiPlus size={16} /> Add Project</button>
    </>;
}
function CertificationsForm() {
  const {
    resume,
    dispatch
  } = useResume();
  return <>
      {resume.certifications.map((cert, i) => <div className="entry-card" key={cert.id}>
          <div className="grid-2">
            <div className="form-group">
              <label>Certification Name</label>
              <input className="glass-input" placeholder="AWS Solutions Architect" value={cert.name} onChange={e => dispatch({
            type: 'UPDATE_CERTIFICATION',
            index: i,
            payload: {
              name: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input className="glass-input" placeholder="Amazon Web Services" value={cert.issuer} onChange={e => dispatch({
            type: 'UPDATE_CERTIFICATION',
            index: i,
            payload: {
              issuer: e.target.value
            }
          })} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Date</label>
              <input className="glass-input" placeholder="Dec 2023" value={cert.date} onChange={e => dispatch({
            type: 'UPDATE_CERTIFICATION',
            index: i,
            payload: {
              date: e.target.value
            }
          })} />
            </div>
            <div className="form-group">
              <label>Credential Link</label>
              <input className="glass-input" placeholder="https://..." value={cert.link} onChange={e => dispatch({
            type: 'UPDATE_CERTIFICATION',
            index: i,
            payload: {
              link: e.target.value
            }
          })} />
            </div>
          </div>
          {resume.certifications.length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_CERTIFICATION',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_CERTIFICATION'
    })}><FiPlus size={16} /> Add Certification</button>
    </>;
}
function LanguagesForm() {
  const { resume, dispatch } = useResume();
  const proficiencies = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Beginner'];
  return <>
      {(resume.languages || []).map((lang, i) => <div className="entry-card" key={lang.id}>
          <div className="grid-2">
            <div className="form-group">
              <label>Language</label>
              <input className="glass-input" placeholder="e.g. English" value={lang.language} onChange={e => dispatch({
            type: 'UPDATE_LANGUAGE',
            index: i,
            payload: { language: e.target.value }
          })} />
            </div>
            <div className="form-group">
              <label>Proficiency</label>
              <select className="glass-input" value={lang.proficiency} onChange={e => dispatch({
            type: 'UPDATE_LANGUAGE',
            index: i,
            payload: { proficiency: e.target.value }
          })}>
                {proficiencies.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {(resume.languages || []).length > 1 && <div className="entry-actions">
              <button className="remove-btn" onClick={() => dispatch({
          type: 'REMOVE_LANGUAGE',
          index: i
        })}><FiTrash2 size={14} /> Remove</button>
            </div>}
        </div>)}
      <button className="add-btn" onClick={() => dispatch({
      type: 'ADD_LANGUAGE'
    })}><FiPlus size={16} /> Add Language</button>
    </>;
}
