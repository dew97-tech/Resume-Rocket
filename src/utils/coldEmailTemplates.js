export const EMAIL_CATEGORIES = [
  { id: 'job-application', label: 'Job Application', icon: '💼' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
  { id: 'freelancing', label: 'Freelancing', icon: '💻' },
  { id: 'internship', label: 'Internship', icon: '🎓' }
];

export const EMAIL_TONES = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'friendly', label: 'Friendly', icon: '😊' },
  { value: 'confident', label: 'Confident', icon: '💪' },
  { value: 'direct', label: 'Direct', icon: '🎯' }
];

function fill(template, form) {
  let text = template;
  const vars = {
    yourName: form.yourName || '[Your Name]',
    yourRole: form.yourRole || '[Your Role]',
    recipientName: form.recipientName || '',
    recipientRole: form.recipientRole || '[Recipient Role]',
    company: form.company || '[Company]',
    purpose: form.purpose || '[Your purpose]',
    skills: form.skills || '[Your skills]'
  };
  Object.entries(vars).forEach(([key, val]) => {
    text = text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val);
  });
  if (!vars.recipientName) {
    text = text.replace(/^Dear\s+[^,]+,\s*/gm, 'Dear Hiring Manager,\n');
  }
  return text;
}

export const coldEmailTemplates = [
  {
    id: 'cold-apply',
    category: 'job-application',
    name: 'Cold Email to Recruiter',
    description: 'Direct application email to a recruiter or hiring manager',
    generateSubject: (form) => `Application for ${form.yourRole || '[Position]'} at ${form.company || '[Company]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope this message finds you well. I am writing to express my strong interest in the {{yourRole}} position at {{company}}.

With my background in {{skills}}, I am confident I can make a meaningful contribution to your team. {{purpose}}

I would love the opportunity to discuss how my experience aligns with {{company}}'s goals. Thank you for considering my application.

Best regards,
{{yourName}}`, form)
  },
  {
    id: 'follow-up',
    category: 'job-application',
    name: 'Follow-Up After Applying',
    description: 'Polite follow-up after submitting an application',
    generateSubject: (form) => `Following Up on My Application — ${form.yourRole || '[Position]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope you're doing well. I recently applied for the {{yourRole}} position at {{company}} and wanted to follow up on my application.

I remain very enthusiastic about the opportunity to contribute to your team with my skills in {{skills}}. {{purpose}}

Please let me know if there are any updates regarding my application. I would be happy to provide any additional information.

Best regards,
{{yourName}}`, form)
  },
  {
    id: 'referral-request',
    category: 'job-application',
    name: 'Referral Request (Alumni)',
    description: 'Request a referral from an alumni or mutual connection',
    generateSubject: (form) => `Referral Request — ${form.yourRole || '[Position]'} at ${form.company || '[Company]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope you're doing well. I'm {{yourName}}, a fellow professional in {{skills}}. I noticed you're working at {{company}} and I'm incredibly impressed by your work there.

I'm currently exploring opportunities and would love to be considered for the {{yourRole}} role. Would you be open to a brief chat about your experience at {{company}} and any advice you might have?

{{purpose}}

Thank you so much for your time!

Warmly,
{{yourName}}`, form)
  },
  {
    id: 'linkedin-connect',
    category: 'networking',
    name: 'LinkedIn Connection Request',
    description: 'Professional LinkedIn connection message',
    generateSubject: () => '',
    generateBody: (form) => fill(`Hi {{recipientName}},

I came across your profile and was impressed by your work in {{skills}}. I'm {{yourName}}, a {{yourRole}}, and I'd love to connect and follow your journey at {{company}}.

{{purpose}}

Looking forward to connecting!`, form)
  },
  {
    id: 'informational-interview',
    category: 'networking',
    name: 'Informational Interview Request',
    description: 'Request a short chat to learn about someone\'s career path',
    generateSubject: (form) => `Quick Question — ${form.recipientName ? form.recipientName + ', ' : ''}${form.company || '[Company]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope this message finds you well. I'm {{yourName}}, a {{yourRole}} with experience in {{skills}}. I've been following {{company}}'s work and I'm genuinely inspired by the impact your team is making.

I would be grateful for the opportunity to ask you a few questions about your career journey and any advice you might have for someone looking to grow in this field. Would you be open to a 15-minute virtual coffee chat?

{{purpose}}

Thank you for your consideration!

Best,
{{yourName}}`, form)
  },
  {
    id: 'mentorship-request',
    category: 'networking',
    name: 'Mentorship Request',
    description: 'Politely ask someone to be a mentor',
    generateSubject: (form) => `Mentorship Inquiry — ${form.yourName || '[Your Name]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope you're doing well. My name is {{yourName}} and I'm a {{yourRole}} with a passion for {{skills}}.

I've been following your career at {{company}} and I deeply admire your expertise. I'm at a point where I could greatly benefit from guidance, and I was wondering if you'd be open to mentoring me on an informal basis — perhaps a monthly check-in call.

{{purpose}}

I understand you're busy and truly appreciate you considering this.

Thank you,
{{yourName}}`, form)
  },
  {
    id: 'upwork-proposal',
    category: 'freelancing',
    name: 'Upwork / Fiverr Proposal',
    description: 'Client outreach for freelance gigs',
    generateSubject: (form) => `Proposal: ${form.purpose || '[Project]'} — ${form.yourName || '[Your Name]'}`,
    generateBody: (form) => fill(`Hi {{recipientName}},

I came across your project and I believe I can help. I'm {{yourName}}, a {{yourRole}} with expertise in {{skills}}.

{{purpose}}

Here's what I can deliver:
• High-quality work tailored to your needs
• Clear and timely communication
• Reliable delivery within your timeline

I'd love to discuss your project in more detail. Let me know if you're available for a quick call.

Best,
{{yourName}}`, form)
  },
  {
    id: 'direct-client',
    category: 'freelancing',
    name: 'Direct Client Outreach',
    description: 'Reach out to potential clients directly',
    generateSubject: (form) => `Helping ${form.company || '[Company]'} with {{purpose || '[Your Service]'}}`,
    generateBody: (form) => fill(`Hi {{recipientName}},

I'm {{yourName}}, a {{yourRole}} specializing in {{skills}}. I've been following {{company}} and I think I can help with {{purpose}}.

I've helped similar businesses achieve measurable results, and I'd love to explore how I can do the same for you.

Would you be open to a brief 10-minute chat this week?

Best,
{{yourName}}`, form)
  },
  {
    id: 'portfolio-followup',
    category: 'freelancing',
    name: 'Portfolio Follow-Up',
    description: 'Follow up after sharing your portfolio',
    generateSubject: (form) => `Following Up — ${form.yourName || '[Your Name]'} / ${form.company || '[Project]'}`,
    generateBody: (form) => fill(`Hi {{recipientName}},

I hope you had a chance to look at my portfolio. I wanted to follow up and see if you have any questions about how I can help {{company}} with {{purpose}}.

My skills in {{skills}} align well with what you're looking for, and I'm excited about the possibility of working together.

Let me know if you'd like to discuss further!

Best,
{{yourName}}`, form)
  },
  {
    id: 'internship-inquiry',
    category: 'internship',
    name: 'Internship Inquiry',
    description: 'Ask about internship opportunities',
    generateSubject: (form) => `Internship Inquiry — ${form.yourRole || '[Your Interest]'} at ${form.company || '[Company]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

I hope this message finds you well. I'm {{yourName}}, a student/professional with a keen interest in {{skills}}.

I am writing to inquire about potential internship opportunities at {{company}}. I am eager to contribute to your team while learning from the best in the industry. {{purpose}}

I would greatly appreciate the chance to discuss how I can add value to {{company}} as an intern.

Thank you for your time.

Best regards,
{{yourName}}`, form)
  },
  {
    id: 'campus-recruitment',
    category: 'internship',
    name: 'Campus Recruitment Follow-Up',
    description: 'Follow up after a campus recruitment event',
    generateSubject: (form) => `Great Meeting You at Campus — ${form.yourName || '[Your Name]'}`,
    generateBody: (form) => fill(`Dear {{recipientName}},

It was a pleasure meeting you at the recent campus recruitment event. I was truly inspired by {{company}}'s vision and the work your team is doing.

I am {{yourName}}, a {{yourRole}} with skills in {{skills}}. I would love to explore how I can contribute to {{company}}'s success as an intern or entry-level team member.

{{purpose}}

Thank you for your time, and I hope to hear from you soon!

Best,
{{yourName}}`, form)
  },
  {
    id: 'linkedin-message',
    category: 'networking',
    name: 'LinkedIn Message (Job Interest)',
    description: 'Direct LinkedIn message expressing job interest',
    generateSubject: () => '',
    generateBody: (form) => fill(`Hi {{recipientName}},

I hope you're doing well. I'm {{yourName}}, a {{yourRole}} with experience in {{skills}}.

I noticed {{company}} is doing amazing work, and I'd love to explore if there are any opportunities to contribute. {{purpose}}

Would you be open to a quick chat?

Thanks,
{{yourName}}`, form)
  }
];
