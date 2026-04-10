import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
const ResumeContext = createContext();
const defaultResume = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: ''
  },
  experience: [{
    id: '1',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }],
  education: [{
    id: '1',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  }],
  skills: [{
    id: '1',
    category: 'Technical',
    items: ''
  }],
  projects: [{
    id: '1',
    name: '',
    description: '',
    technologies: '',
    link: ''
  }],
  certifications: [{
    id: '1',
    name: '',
    issuer: '',
    date: '',
    link: ''
  }],
  languages: [{
    id: '1',
    language: '',
    proficiency: 'Fluent'
  }],
  sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
  settings: {
    template: 'modern',
    primaryColor: '#7c5cfc',
    secondaryColor: '#c084fc',
    fontFamily: 'Inter',
    fontSize: 10,
    lineSpacing: 1.4,
    sectionSpacing: 16,
    marginSize: 32
  }
};
function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload
        }
      };
    case 'SET_EXPERIENCE':
      return {
        ...state,
        experience: action.payload
      };
    case 'UPDATE_EXPERIENCE':
      {
        const exp = [...state.experience];
        exp[action.index] = {
          ...exp[action.index],
          ...action.payload
        };
        return {
          ...state,
          experience: exp
        };
      }
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }]
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((_, i) => i !== action.index)
      };
    case 'SET_EDUCATION':
      return {
        ...state,
        education: action.payload
      };
    case 'UPDATE_EDUCATION':
      {
        const edu = [...state.education];
        edu[action.index] = {
          ...edu[action.index],
          ...action.payload
        };
        return {
          ...state,
          education: edu
        };
      }
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }]
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.index)
      };
    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.payload
      };
    case 'UPDATE_SKILL':
      {
        const skills = [...state.skills];
        skills[action.index] = {
          ...skills[action.index],
          ...action.payload
        };
        return {
          ...state,
          skills: skills
        };
      }
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, {
          id: Date.now().toString(),
          category: '',
          items: ''
        }]
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.index)
      };
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload
      };
    case 'UPDATE_PROJECT':
      {
        const projects = [...state.projects];
        projects[action.index] = {
          ...projects[action.index],
          ...action.payload
        };
        return {
          ...state,
          projects: projects
        };
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, {
          id: Date.now().toString(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }]
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.index)
      };
    case 'SET_CERTIFICATIONS':
      return {
        ...state,
        certifications: action.payload
      };
    case 'UPDATE_CERTIFICATION':
      {
        const certs = [...state.certifications];
        certs[action.index] = {
          ...certs[action.index],
          ...action.payload
        };
        return {
          ...state,
          certifications: certs
        };
      }
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, {
          id: Date.now().toString(),
          name: '',
          issuer: '',
          date: '',
          link: ''
        }]
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((_, i) => i !== action.index)
      };
    case 'SET_SECTION_ORDER':
      return {
        ...state,
        sectionOrder: action.payload
      };
    case 'UPDATE_LANGUAGE':
      {
        const langs = [...state.languages];
        langs[action.index] = {
          ...langs[action.index],
          ...action.payload
        };
        return {
          ...state,
          languages: langs
        };
      }
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, {
          id: Date.now().toString(),
          language: '',
          proficiency: 'Fluent'
        }]
      };
    case 'REMOVE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter((_, i) => i !== action.index)
      };
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
    case 'LOAD_RESUME':
      return {
        ...action.payload
      };
    case 'RESET_RESUME':
      return {
        ...defaultResume
      };
    default:
      return state;
  }
}
export function ResumeProvider({
  children
}) {
  const [resume, dispatch] = useReducer(resumeReducer, defaultResume, initial => {
    try {
      const saved = localStorage.getItem('rf-resume');
      return saved ? {
        ...initial,
        ...JSON.parse(saved)
      } : initial;
    } catch {
      return initial;
    }
  });
  const saveTimerRef = useRef(null);
  const debouncedSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem('rf-resume', JSON.stringify(resume));
    }, 800);
  }, [resume]);
  useEffect(() => {
    debouncedSave();
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [debouncedSave]);
  return <ResumeContext.Provider value={{
    resume,
    dispatch
  }}>
      {children}
    </ResumeContext.Provider>;
}
export const useResume = () => useContext(ResumeContext);
