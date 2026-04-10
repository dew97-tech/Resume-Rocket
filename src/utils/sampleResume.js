export const sampleResume = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Passionate software engineer with 8+ years of experience building scalable web applications and leading engineering teams. Specialized in React, Node.js, and cloud architecture. Proven track record of delivering high-impact products that serve millions of users. Strong advocate for clean code, testing, and continuous improvement.'
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: '',
      current: true,
      description: 'Led a team of 8 engineers to rebuild the core platform, improving performance by 40%. Architected microservices infrastructure handling 10M+ daily requests. Mentored junior developers and established coding standards adopted company-wide. Reduced deployment time from 2 hours to 15 minutes through CI/CD pipeline optimization.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      current: false,
      description: 'Built and launched the company\'s flagship SaaS product from scratch, growing to 50K+ active users. Implemented real-time collaboration features using WebSockets and Redis. Designed and maintained RESTful APIs serving mobile and web clients. Contributed to $5M Series A funding through technical demos and architecture presentations.'
    },
    {
      id: '3',
      company: 'Digital Agency Co.',
      position: 'Frontend Developer',
      startDate: 'Jun 2016',
      endDate: 'Feb 2018',
      current: false,
      description: 'Developed responsive web applications for 20+ enterprise clients. Migrated legacy jQuery codebase to React, reducing load time by 60%. Created a reusable component library that accelerated development across the team.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2014',
      endDate: '2016',
      gpa: '3.9'
    },
    {
      id: '2',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      startDate: '2010',
      endDate: '2014',
      gpa: '3.7'
    }
  ],
  skills: [
    {
      id: '1',
      category: 'Frontend',
      items: 'React, Next.js, TypeScript, Vue.js, Tailwind CSS, HTML5, CSS3, Webpack, Vite'
    },
    {
      id: '2',
      category: 'Backend',
      items: 'Node.js, Express, Python, Django, PostgreSQL, MongoDB, Redis, GraphQL'
    },
    {
      id: '3',
      category: 'DevOps & Tools',
      items: 'AWS, Docker, Kubernetes, CI/CD, Git, Terraform, Datadog, Figma'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'CloudDash — Real-time Analytics Platform',
      description: 'Built a real-time dashboard for monitoring cloud infrastructure metrics. Handles 1M+ data points per minute with sub-second latency. Features customizable widgets, alerts, and team collaboration.',
      technologies: 'React, D3.js, Node.js, WebSocket, InfluxDB, Docker',
      link: 'https://github.com/johndoe/clouddash'
    },
    {
      id: '2',
      name: 'TaskFlow — AI-Powered Project Management',
      description: 'Developed an intelligent project management tool that uses ML to predict task completion times and optimize team workload distribution. Served 5K+ teams in beta.',
      technologies: 'Next.js, Python, TensorFlow, PostgreSQL, Redis',
      link: 'https://github.com/johndoe/taskflow'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect — Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: ''
    },
    {
      id: '2',
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
      link: ''
    }
  ],
  languages: [
    {
      id: '1',
      language: 'English',
      proficiency: 'Native'
    },
    {
      id: '2',
      language: 'Spanish',
      proficiency: 'Conversational'
    },
    {
      id: '3',
      language: 'Japanese',
      proficiency: 'Basic'
    }
  ],
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
