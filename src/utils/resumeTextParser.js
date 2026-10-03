const SECTION_ALIASES = {
  summary: ['summary', 'professional summary', 'profile', 'about', 'about me', 'objective', 'career objective'],
  experience: ['experience', 'work experience', 'professional experience', 'employment', 'employment history', 'work history'],
  education: ['education', 'academic background', 'academics', 'education & training'],
  skills: ['skills', 'technical skills', 'core competencies', 'competencies', 'technologies', 'tech stack'],
  projects: ['projects', 'personal projects', 'key projects', 'selected projects'],
  certifications: ['certifications', 'certificates', 'licenses', 'licenses & certifications']
};

const MONTH = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?';
const DATE_TOKEN = `(?:${MONTH}\\s*,?\\s*\\d{2,4}|\\d{1,2}[/-]\\d{4}|\\d{4})`;
const DATE_RANGE_RE = new RegExp(`(${DATE_TOKEN})\\s*(?:-|–|—|to)\\s*(${DATE_TOKEN}|present|current|now)`, 'i');

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/;
const LINKEDIN_RE = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,;]+/i;
const WEBSITE_RE = /(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:dev|io|com|net|org|me|co)\b(?:\/[^\s,;]*)?/i;

function matchSection(line) {
  const cleaned = line.toLowerCase().replace(/[^a-z& ]/g, '').trim();
  if (!cleaned || cleaned.length > 40) return null;
  for (const [key, aliases] of Object.entries(SECTION_ALIASES)) {
    if (aliases.includes(cleaned)) return key;
  }
  return null;
}

function splitBlocks(lines) {
  const blocks = [];
  let current = [];
  lines.forEach(line => {
    if (!line.trim()) {
      if (current.length) blocks.push(current);
      current = [];
    } else {
      current.push(line.trim());
    }
  });
  if (current.length) blocks.push(current);
  return blocks;
}

function extractDates(text) {
  const m = text.match(DATE_RANGE_RE);
  if (!m) return { startDate: '', endDate: '', current: false };
  const end = m[2];
  const isCurrent = /present|current|now/i.test(end);
  return {
    startDate: m[1].trim(),
    endDate: isCurrent ? '' : end.trim(),
    current: isCurrent
  };
}

function guessTitleCompany(firstLine) {
  const parts = firstLine.split(/\s*[|•·–—]\s*|\s+at\s+|\s*,\s*/).filter(Boolean);
  return {
    position: parts[0] || '',
    company: parts[1] || ''
  };
}

function parseSkills(lines) {
  const items = lines
    .join(', ')
    .split(/[,;|•·]|\s{3,}/)
    .map(s => s.replace(/^[-*▪◦]\s*/, '').trim())
    .filter(s => s && s.length < 60);
  return items.length ? [{ id: 'parsed-1', category: 'Skills', items: items.join(', ') }] : [];
}

export function parseResumeText(text) {
  const rawLines = (text || '').split(/\r?\n/).map(l => l.trim());
  const personalInfo = {
    fullName: '', title: '', email: '', phone: '', location: '',
    website: '', linkedin: '', summary: ''
  };

  personalInfo.email = (text.match(EMAIL_RE) || [''])[0];
  const phoneMatch = text.match(PHONE_RE);
  personalInfo.phone = phoneMatch ? phoneMatch[0] : '';
  personalInfo.linkedin = (text.match(LINKEDIN_RE) || [''])[0];

  const websiteMatch = text.match(WEBSITE_RE);
  if (websiteMatch
    && !personalInfo.email.includes(websiteMatch[0])
    && !personalInfo.linkedin.includes(websiteMatch[0])) {
    personalInfo.website = websiteMatch[0];
  }

  const headerLines = rawLines.slice(0, 8).filter(Boolean);
  if (headerLines.length) {
    personalInfo.fullName = headerLines[0]
      .split(/\s*[|•·–—]\s*|\s{2,}/)[0]
      .slice(0, 50)
      .trim();
    if (headerLines[1] && !EMAIL_RE.test(headerLines[1]) && !PHONE_RE.test(headerLines[1])) {
      personalInfo.title = headerLines[1].split(/\s*[|•·–—]\s*|\s{2,}/)[0].slice(0, 60).trim();
    }
  }

  const locationSegment = rawLines.slice(0, 8)
    .flatMap(l => l.split(/\s*[|•·]\s*/))
    .find(seg =>
      /,/.test(seg)
      && !EMAIL_RE.test(seg)
      && !PHONE_RE.test(seg)
      && !/https?:|linkedin|@/.test(seg)
      && seg.length < 60
      && seg.trim() !== personalInfo.fullName
      && /[a-z]/i.test(seg)
    );
  personalInfo.location = (locationSegment || '').trim();

  const sections = {};
  let current = null;
  const sectionOrderRaw = [];
  rawLines.forEach(line => {
    const key = matchSection(line);
    if (key) {
      current = key;
      if (!sectionOrderRaw.includes(key)) sectionOrderRaw.push(key);
      sections[key] = sections[key] || [];
    } else if (current && line) {
      sections[current].push(line);
    }
  });

  if (sections.summary?.length) {
    personalInfo.summary = sections.summary.join(' ');
  }

  const experience = splitBlocks(sections.experience || []).map((block, i) => {
    const first = block[0] || '';
    const { position, company } = guessTitleCompany(first);
    const dates = extractDates(block.slice(0, 2).join(' '));
    return {
      id: `parsed-exp-${i + 1}`,
      company,
      position,
      startDate: dates.startDate,
      endDate: dates.endDate,
      current: dates.current,
      description: block.slice(1).filter(l => !(DATE_RANGE_RE.test(l) && l.length < 40)).join('\n') || first
    };
  });

  const education = splitBlocks(sections.education || []).map((block, i) => {
    const dates = extractDates(block.slice(0, 2).join(' '));
    return {
      id: `parsed-edu-${i + 1}`,
      institution: block[0] || '',
      degree: block[1] && /degree|b\.?sc|b\.?a|m\.?sc|m\.?a|mba|phd|bachelor|master|diploma|hsc|ssc|honours/i.test(block[1])
        ? block[1]
        : '',
      field: '',
      startDate: dates.startDate,
      endDate: dates.endDate,
      gpa: ''
    };
  });

  const skills = parseSkills(sections.skills || []);

  const sectionOrder = ['personalInfo'];
  ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'].forEach(k => {
    if (sectionOrderRaw.includes(k) || (k === 'skills' && skills.length)) sectionOrder.push(k);
  });

  return {
    personalInfo,
    experience,
    education,
    skills,
    projects: [],
    certifications: [],
    sectionOrder,
    _meta: {
      sectionsDetected: sectionOrderRaw,
      experienceCount: experience.length,
      educationCount: education.length,
      skillCount: skills.length ? skills[0].items.split(',').length : 0
    }
  };
}
