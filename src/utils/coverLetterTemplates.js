export const coverLetterTones = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'confident', label: 'Confident', icon: '💪' },
  { value: 'enthusiastic', label: 'Enthusiastic', icon: '🔥' },
  { value: 'friendly', label: 'Friendly', icon: '😊' },
  { value: 'formal', label: 'Formal', icon: '🎩' },
  { value: 'bold', label: 'Bold', icon: '⚡' },
  { value: 'persuasive', label: 'Persuasive', icon: '🎯' },
  { value: 'minimalist', label: 'Minimalist', icon: '✨' },
];

function getToneOpening(tone, jobTitle, company) {
  const title = jobTitle || '[Position]';
  const co = company || '[Company]';
  const map = {
    professional: `I am writing to apply for the ${title} position at ${co}.`,
    confident: `I am writing to express my strong interest in the ${title} role at ${co}. I am confident I am the ideal candidate for this position.`,
    enthusiastic: `I am thrilled to apply for the ${title} position at ${co}! This opportunity aligns perfectly with my passion and expertise.`,
    friendly: `I hope this message finds you well! I was excited to come across the ${title} opening at ${co}, and I'd love to tell you a bit about myself.`,
    formal: `I respectfully submit my application for the ${title} position at ${co}, as advertised. I believe my qualifications merit your consideration.`,
    bold: `Let me be direct: I am exactly what ${co} needs for the ${title} role. Here's why you should hire me.`,
    persuasive: `Imagine having a ${title} who not only meets every requirement but exceeds expectations from day one. That's what I bring to ${co}.`,
    minimalist: `Re: ${title} position at ${co}.`,
  };
  return map[tone] || map.professional;
}

function getToneClosing(tone, name) {
  const n = name || '[Your Name]';
  const map = {
    professional: `Sincerely,\n${n}`,
    confident: `I look forward to discussing this opportunity with you.\n\nBest regards,\n${n}`,
    enthusiastic: `I can't wait to hear from you!\n\nWarmly,\n${n}`,
    friendly: `Thanks so much for reading — I'd love to chat!\n\nCheers,\n${n}`,
    formal: `I remain at your disposal for further discussion.\n\nRespectfully yours,\n${n}`,
    bold: `Let's make it happen.\n\n${n}`,
    persuasive: `The question isn't whether I'm the right fit — it's when we can start.\n\nBest,\n${n}`,
    minimalist: `Best,\n${n}`,
  };
  return map[tone] || map.professional;
}

export const coverLetterTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and structured — ideal for corporate roles',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      const opening = getToneOpening(tone, jobTitle, company);
      return `Dear Hiring Manager,

${opening} With my background in ${skillsList.length > 0 ? skillsList.slice(0, 3).join(', ') : '[your key skills]'}, I am confident that I would be an excellent addition to your team.

${experience || `Throughout my career, I have developed strong expertise in ${skillsList.length > 0 ? skillsList.join(', ') : '[relevant areas]'}. I have consistently demonstrated the ability to deliver results, collaborate effectively with cross-functional teams, and adapt to evolving business needs.`}

I am particularly drawn to ${company || '[Company]'} because of its commitment to innovation and excellence. I believe my skills in ${skillsList.length > 0 ? skillsList.slice(0, 2).join(' and ') : '[key areas]'} align perfectly with the requirements of this role.

I would welcome the opportunity to discuss how my experience and skills can contribute to the continued success of ${company || '[Company]'}. Thank you for considering my application.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern and engaging — perfect for startups and creative roles',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `Hi there,

When I saw the ${jobTitle || '[Position]'} opening at ${company || '[Company]'}, I knew I had to reach out. This isn't just another application — it's the intersection of what I love doing and what ${company || 'your company'} does best.

Here's what I bring to the table:
${skillsList.length > 0 ? skillsList.map(s => `• ${s}`).join('\n') : '• [Your key skills and achievements]'}

${experience || `I've spent my career building expertise in areas that directly align with this role. I thrive in environments where creativity meets problem-solving, and I'm passionate about delivering work that makes a real impact.`}

What excites me most about ${company || '[Company]'} is the opportunity to contribute to a team that values innovation and pushes boundaries. I'm not just looking for a job — I'm looking for the right fit, and I believe this is it.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Authoritative and results-driven — suited for senior positions',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `Dear Hiring Committee,

As an accomplished professional with extensive experience in ${skillsList.length > 0 ? skillsList.slice(0, 3).join(', ') : '[key areas]'}, I am presenting my candidacy for the ${jobTitle || '[Position]'} role at ${company || '[Company]'}.

${experience || `Over the course of my career, I have led high-performing teams, driven strategic initiatives, and delivered measurable business outcomes. My leadership philosophy centers on empowering teams, fostering innovation, and maintaining an unwavering focus on results.`}

Key qualifications I bring to this position include:
${skillsList.length > 0 ? skillsList.map(s => `• Demonstrated expertise in ${s}`).join('\n') : '• [Your key qualifications]'}

I am drawn to ${company || '[Company]'}'s vision and believe my strategic perspective and operational expertise would be invaluable in advancing your organizational objectives.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and concise — lets your credentials speak for themselves',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `${getToneOpening(tone, jobTitle, company)}

Core competencies: ${skillsList.length > 0 ? skillsList.join(' · ') : '[Your skills]'}

${experience || `My track record demonstrates consistent delivery and measurable impact in relevant areas.`}

Available for interview at your convenience.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Attention-grabbing and direct — for when you want to make an impact',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `${getToneOpening(tone, jobTitle, company)}

THE NUMBERS DON'T LIE:
${skillsList.length > 0 ? skillsList.map(s => `→ ${s}`).join('\n') : '→ [Your key differentiators]'}

${experience || `I don't just fill roles — I transform them. Every position I've held has seen measurable improvement because I bring energy, expertise, and an obsessive focus on outcomes.`}

${company || '[Company]'} doesn't need another application. You need a game-changer. That's me.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined and sophisticated — ideal for luxury, legal, and finance sectors',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `Dear Distinguished Hiring Committee,

It is with great pleasure that I present my application for the ${jobTitle || '[Position]'} role at ${company || '[Company]'}. Having cultivated a distinguished career in ${skillsList.length > 0 ? skillsList.slice(0, 3).join(', ') : '[your areas of expertise]'}, I am uniquely positioned to contribute to your esteemed organization.

${experience || `My professional journey has been marked by a steadfast commitment to excellence, a refined approach to problem-solving, and an unwavering dedication to fostering meaningful relationships with clients and colleagues alike.`}

I bring the following credentials to bear:
${skillsList.length > 0 ? skillsList.map(s => `◆ ${s}`).join('\n') : '◆ [Your distinguished qualifications]'}

I should be most grateful for the opportunity to discuss how my background and vision align with the high standards upheld by ${company || '[Company]'}.

${getToneClosing(tone, name)}`;
    }
  },
  {
    id: 'tech',
    name: 'Tech-Savvy',
    description: 'Developer-style with technical focus — for engineering and tech roles',
    generate: ({ name, jobTitle, company, skills, experience, tone }) => {
      const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      return `Hello ${company || '[Company]'} Team,

// ${getToneOpening(tone, jobTitle, company)}

## Tech Stack:
${skillsList.length > 0 ? skillsList.map(s => `- [x] ${s}`).join('\n') : '- [x] [Your technical skills]'}

## About Me:
${experience || `I write clean, scalable code and have a passion for building products that users love. I believe in test-driven development, continuous integration, and shipping fast without sacrificing quality.`}

## Why ${company || '[Company]'}?
Your engineering challenges excite me. I thrive in environments where complex problems meet elegant solutions, and ${company || 'your company'}'s tech stack aligns perfectly with my expertise.

// Ready to git commit to this role.

${getToneClosing(tone, name)}`;
    }
  }
];
