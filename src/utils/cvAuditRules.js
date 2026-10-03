import { matchJobDescription } from './keywordMatch.js';

export const ACTION_VERBS = [
  'Achieved', 'Accelerated', 'Administered', 'Advised', 'Allocated', 'Analyzed',
  'Architected', 'Automated', 'Built', 'Championed', 'Closed', 'Collaborated',
  'Consolidated', 'Created', 'Cut', 'Decreased', 'Delegated', 'Delivered',
  'Deployed', 'Designed', 'Developed', 'Devised', 'Directed', 'Drove',
  'Eliminated', 'Enabled', 'Engineered', 'Established', 'Evaluated', 'Exceeded',
  'Expanded', 'Expedited', 'Generated', 'Grew', 'Implemented', 'Improved',
  'Increased', 'Initiated', 'Integrated', 'Introduced', 'Invented', 'Launched',
  'Led', 'Managed', 'Mentored', 'Migrated', 'Negotiated', 'Optimized',
  'Orchestrated', 'Overhauled', 'Pioneered', 'Prevented', 'Produced', 'Proposed',
  'Reorganized', 'Reduced', 'Reengineered', 'Resolved', 'Revamped', 'Scaled',
  'Simplified', 'Slashed', 'Spearheaded', 'Standardized', 'Streamlined',
  'Strengthened', 'Structured', 'Succeeded', 'Transformed', 'Upgraded'
];

export const BD_LEGACY_FIELDS = [
  'blood group', 'blood_group', 'religion', 'marital status', 'marital_status',
  'father\'s name', 'fathers name', 'mother\'s name', 'mothers name',
  'nationality', 'permanent address', 'permanent_address'
];

export const CATEGORY_WEIGHTS = {
  contact: 15,
  summary: 15,
  experience: 25,
  education: 10,
  skills: 10,
  formatting: 15,
  ats: 10
};

export function collectResumeText(resume = {}) {
  const parts = [
    resume.personalInfo?.fullName || '',
    resume.personalInfo?.title || '',
    resume.personalInfo?.summary || '',
    ...(resume.experience || []).map(e => `${e.position || ''} ${e.company || ''} ${e.description || ''}`),
    ...(resume.education || []).map(e => `${e.degree || ''} ${e.field || ''} ${e.institution || ''}`),
    ...(resume.skills || []).flatMap(s => (s.items || '').split(',')),
    ...(resume.projects || []).map(p => `${p.name || ''} ${p.description || ''}`),
    ...(resume.certifications || []).map(c => c.name || '')
  ];
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function collectDates(resume = {}) {
  const dates = [];
  (resume.experience || []).forEach(e => {
    if (e.startDate) dates.push(e.startDate);
    if (e.endDate) dates.push(e.endDate);
  });
  (resume.education || []).forEach(e => {
    if (e.startDate) dates.push(e.startDate);
    if (e.endDate) dates.push(e.endDate);
  });
  return dates;
}

function classifyDate(raw) {
  const s = (raw || '').trim();
  if (!s) return null;
  if (/^(present|current|now|ongoing)$/i.test(s)) return 'present';
  if (/^\d{4}$/.test(s)) return 'year';
  if (/^\d{4}[-/]\d{1,2}$/.test(s) || /^\d{1,2}[-/]\d{4}$/.test(s)) return 'numeric';
  if (/^[A-Za-z]{3,9}\.?\s+'?\d{2,4}$/.test(s)) return 'named';
  return 'other';
}

const ATS_HOSTILE_GLYPHS = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}]/u;

function checkContact(resume) {
  const p = resume.personalInfo || {};
  const rules = [];
  let points = 0;
  const max = 15;

  rules.push({
    id: 'contact-email',
    category: 'contact',
    label: 'Email address provided',
    status: p.email ? 'pass' : 'fail',
    message: p.email ? `${p.email}` : 'Add your email address.',
    points: p.email ? 3 : 0
  });

  rules.push({
    id: 'contact-phone',
    category: 'contact',
    label: 'Phone number provided',
    status: p.phone ? 'pass' : 'fail',
    message: p.phone ? `${p.phone}` : 'Add a phone number recruiters can reach you at.',
    points: p.phone ? 3 : 0
  });

  rules.push({
    id: 'contact-linkedin',
    category: 'contact',
    label: 'LinkedIn URL included',
    status: p.linkedin ? 'pass' : 'warn',
    message: p.linkedin ? 'LinkedIn profile linked' : 'Add your LinkedIn profile URL — recruiters expect it.',
    points: p.linkedin ? 3 : 0
  });

  rules.push({
    id: 'contact-location',
    category: 'contact',
    label: 'Location listed (city-level)',
    status: p.location && p.location.length < 60 ? 'pass' : 'warn',
    message: p.location ? `${p.location}` : 'Add at least your city (not full address).',
    points: p.location && p.location.length < 60 ? 3 : 0
  });

  const allText = collectResumeText(resume).toLowerCase();
  const legacyFound = BD_LEGACY_FIELDS.filter(f => allText.includes(f.toLowerCase()));
  const hasContent = allText.length > 0;
  rules.push({
    id: 'contact-bd-legacy',
    category: 'contact',
    label: 'No outdated personal fields (blood group, religion, marital status)',
    status: !hasContent ? 'warn' : legacyFound.length === 0 ? 'pass' : 'fail',
    message: !hasContent
      ? 'Add resume content to scan for outdated personal fields.'
      : legacyFound.length === 0
        ? 'No outdated personal fields detected.'
        : `Remove outdated fields (found: ${legacyFound.slice(0, 3).join(', ')}) — they are not ATS-safe and invite bias.`,
    points: hasContent && legacyFound.length === 0 ? 3 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkSummary(resume) {
  const p = resume.personalInfo || {};
  const summary = p.summary || '';
  const rules = [];
  let points = 0;
  const max = 15;
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  rules.push({
    id: 'summary-exists',
    category: 'summary',
    label: 'Professional summary exists',
    status: summary.trim() ? 'pass' : 'fail',
    message: summary.trim() ? `${wordCount} words` : 'Your summary is the first thing recruiters read.',
    points: summary.trim() ? 4 : 0
  });

  rules.push({
    id: 'summary-length',
    category: 'summary',
    label: 'Summary length (30–100 words recommended)',
    status: wordCount >= 30 && wordCount <= 100 ? 'pass' : wordCount > 0 ? 'warn' : 'fail',
    message: wordCount >= 30 && wordCount <= 100 ? 'Ideal length' : wordCount > 100 ? 'Consider shortening to 100 words or less.' : 'Aim for 30–100 words.',
    points: wordCount >= 30 && wordCount <= 100 ? 5 : wordCount > 0 ? 2 : 0
  });

  const hasFirstPerson = /\b(I am|I'm|I have|I've|my|me)\b/i.test(summary);
  rules.push({
    id: 'summary-no-first-person',
    category: 'summary',
    label: 'No first-person language ("I am", "my")',
    status: summary.trim() && !hasFirstPerson ? 'pass' : summary.trim() ? 'warn' : 'fail',
    message: hasFirstPerson ? 'Avoid "I am", "my" — use implied first person.' : 'No first-person detected.',
    points: summary.trim() && !hasFirstPerson ? 3 : 0
  });

  const startsWithRole = /^(?:Results-driven|Experienced|Innovative|Dedicated|Detail-oriented|Passionate|Dynamic|Senior|Lead|Principal)\s/i.test(summary.trim()) || /(?:engineer|developer|designer|manager|analyst|consultant|specialist|lead|director|architect)/i.test(summary.trim().split(/[.!]/)[0]);
  rules.push({
    id: 'summary-role-keyword',
    category: 'summary',
    label: 'Starts with role-related keyword',
    status: summary.trim() && startsWithRole ? 'pass' : summary.trim() ? 'warn' : 'fail',
    message: startsWithRole ? 'Strong opening' : 'Open with your role or a key trait.',
    points: summary.trim() && startsWithRole ? 3 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkExperience(resume) {
  const exp = resume.experience || [];
  const rules = [];
  let points = 0;
  const max = 25;

  const hasEntries = exp.some(e => e.company || e.position);
  rules.push({
    id: 'exp-has-entries',
    category: 'experience',
    label: 'At least 1 experience entry',
    status: hasEntries ? 'pass' : 'fail',
    message: hasEntries ? `${exp.filter(e => e.company || e.position).length} entries found` : 'Add at least one work experience entry.',
    points: hasEntries ? 5 : 0
  });

  const allDescriptions = exp.filter(e => e.description).map(e => e.description);
  const hasActionVerbs = allDescriptions.some(d => ACTION_VERBS.some(v => new RegExp('\\b' + v + '\\b', 'i').test(d)));
  rules.push({
    id: 'exp-action-verbs',
    category: 'experience',
    label: 'Uses strong action verbs',
    status: hasActionVerbs ? 'pass' : 'warn',
    message: hasActionVerbs ? 'Strong verbs detected' : 'Start bullet points with action verbs like "Developed", "Led", "Optimized".',
    points: hasActionVerbs ? 6 : 0
  });

  const hasQuantified = allDescriptions.some(d => /\d+%|\d+x|\$\d+|\d+[-\s]?(?:fold|figure|digit|person|user|client|employee|member|project)s?/.test(d));
  rules.push({
    id: 'exp-quantified',
    category: 'experience',
    label: 'Includes quantified results (%, $, numbers)',
    status: hasQuantified ? 'pass' : 'warn',
    message: hasQuantified ? 'Numbers found in descriptions' : 'Add metrics — "%", "$", or counts make impact measurable.',
    points: hasQuantified ? 6 : 0
  });

  const hasDateRanges = exp.some(e => e.startDate && (e.endDate || e.current));
  rules.push({
    id: 'exp-dates',
    category: 'experience',
    label: 'Date ranges present',
    status: hasDateRanges ? 'pass' : 'warn',
    message: hasDateRanges ? 'Dates found' : 'Include start and end dates for each role.',
    points: hasDateRanges ? 4 : 0
  });

  const genericPatterns = /\b(?:responsible for|duties included|tasks included|worked on|involved in)\b/i;
  const noGeneric = allDescriptions.every(d => !genericPatterns.test(d));
  rules.push({
    id: 'exp-no-generic',
    category: 'experience',
    label: 'No generic descriptions ("responsible for", "duties")',
    status: hasEntries && !noGeneric ? 'warn' : hasEntries ? 'pass' : 'warn',
    message: !hasEntries
      ? 'Add experience entries to review wording.'
      : noGeneric
        ? 'Clean descriptions'
        : 'Replace "responsible for" with action verbs.',
    points: hasEntries && noGeneric ? 4 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkEducation(resume) {
  const edu = resume.education || [];
  const rules = [];
  let points = 0;
  const max = 10;

  const hasEntries = edu.some(e => e.institution || e.degree);
  rules.push({
    id: 'edu-has-entries',
    category: 'education',
    label: 'At least 1 education entry',
    status: hasEntries ? 'pass' : 'fail',
    message: hasEntries ? 'Education section present' : 'Add your education details.',
    points: hasEntries ? 3 : 0
  });

  const hasInstitution = edu.some(e => e.institution);
  rules.push({
    id: 'edu-institution',
    category: 'education',
    label: 'Institution name included',
    status: hasInstitution ? 'pass' : hasEntries ? 'warn' : 'fail',
    message: hasInstitution ? 'Institution(s) listed' : 'Include the institution name.',
    points: hasInstitution ? 3 : 0
  });

  const hasDegree = edu.some(e => e.degree);
  rules.push({
    id: 'edu-degree',
    category: 'education',
    label: 'Degree / qualification included',
    status: hasDegree ? 'pass' : hasEntries ? 'warn' : 'fail',
    message: hasDegree ? 'Degree(s) listed' : 'Include your degree or qualification.',
    points: hasDegree ? 2 : 0
  });

  const hasDates = edu.some(e => e.startDate || e.endDate);
  rules.push({
    id: 'edu-dates',
    category: 'education',
    label: 'Education dates included',
    status: hasDates ? 'pass' : hasEntries ? 'warn' : 'fail',
    message: hasDates ? 'Dates present' : 'Add graduation or expected dates.',
    points: hasDates ? 2 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkSkills(resume) {
  const skills = resume.skills || [];
  const rules = [];
  let points = 0;
  const max = 10;

  const allItems = skills.flatMap(s => s.items ? s.items.split(',').map(i => i.trim()).filter(Boolean) : []);
  const uniqueSkills = new Set(allItems);

  rules.push({
    id: 'skills-count',
    category: 'skills',
    label: 'At least 3 skills listed',
    status: uniqueSkills.size >= 3 ? 'pass' : uniqueSkills.size > 0 ? 'warn' : 'fail',
    message: uniqueSkills.size >= 3 ? `${uniqueSkills.size} skills found` : uniqueSkills.size > 0 ? `Only ${uniqueSkills.size} — add more relevant skills.` : 'Add at least 3 skills.',
    points: uniqueSkills.size >= 3 ? 4 : uniqueSkills.size > 0 ? 1 : 0
  });

  const categoryNames = [...new Set(skills.map(s => (s.category || '').trim()).filter(Boolean))];
  const realCategories = categoryNames.filter(c => c.toLowerCase() !== 'technical');
  let catStatus = 'fail';
  let catPoints = 0;
  let catMsg = 'Add skills to organize into categories.';
  if (allItems.length > 0 && realCategories.length > 0) {
    catStatus = 'pass';
    catPoints = 3;
    catMsg = `Categories detected (${realCategories.slice(0, 3).join(', ')})`;
  } else if (allItems.length > 0) {
    catStatus = 'warn';
    catPoints = 1;
    catMsg = 'Group skills by category (Frontend, Backend, Tools) for better scannability.';
  }
  rules.push({
    id: 'skills-categorized',
    category: 'skills',
    label: 'Skills organized by category',
    status: catStatus,
    message: catMsg,
    points: catPoints
  });

  const softSkills = ['communication', 'teamwork', 'leadership', 'problem solving', 'time management', 'critical thinking', 'adaptability', 'creativity', 'collaboration', 'work ethic', 'attention to detail', 'interpersonal', 'multitasking', 'organizational'];
  const hasOnlySoft = allItems.length > 0 && allItems.every(s => softSkills.some(ss => s.toLowerCase().includes(ss)));
  rules.push({
    id: 'skills-no-soft-only',
    category: 'skills',
    label: 'Technical / hard skills present (not only soft skills)',
    status: allItems.length === 0 || !hasOnlySoft ? 'pass' : 'warn',
    message: hasOnlySoft ? 'Add technical skills like programming languages, tools, or frameworks.' : 'Good mix of skills',
    points: allItems.length > 0 && !hasOnlySoft ? 3 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkFormatting(resume) {
  const rules = [];
  let points = 0;
  const max = 15;

  const order = resume.sectionOrder || [];
  const recommendedOrder = ['personalInfo', 'summary', 'experience', 'education', 'skills'];
  const presentSections = order.filter(s => recommendedOrder.includes(s));
  const expectedOrder = recommendedOrder.filter(s => presentSections.includes(s));
  const followsOrder = presentSections.length > 0 && presentSections.every((s, i) => s === expectedOrder[i]);
  rules.push({
    id: 'fmt-section-order',
    category: 'formatting',
    label: 'Sections follow recommended order',
    status: order.length === 0 ? 'fail' : followsOrder ? 'pass' : 'warn',
    message: order.length === 0
      ? 'Section order is missing.'
      : followsOrder
        ? 'Summary → Experience → Education → Skills'
        : 'Reorder sections — Summary, then Experience, Education, Skills reads best for recruiters.',
    points: order.length === 0 ? 0 : followsOrder ? 3 : 1
  });

  const hasProjects = resume.projects && resume.projects.some(p => p.name);
  const hasCerts = resume.certifications && resume.certifications.some(c => c.name);
  rules.push({
    id: 'fmt-projects-certs',
    category: 'formatting',
    label: 'Bonus sections (projects / certifications)',
    status: hasProjects || hasCerts ? 'pass' : 'warn',
    message: hasProjects && hasCerts ? 'Projects & Certifications present' : hasProjects ? 'Projects section found' : hasCerts ? 'Certifications found' : 'Add projects or certifications to stand out.',
    points: hasProjects && hasCerts ? 4 : hasProjects || hasCerts ? 2 : 0
  });

  const allText = [
    resume.personalInfo?.summary || '',
    ...(resume.experience || []).map(e => e.description || ''),
    ...(resume.skills || []).flatMap(s => s.items || ''),
    ...(resume.projects || []).map(p => p.description || '')
  ].join(' ');
  const totalChars = allText.length;

  let status = 'pass';
  let msg = `${totalChars} characters`;
  let pts = 3;
  if (totalChars < 200) { status = 'fail'; msg += ' — too short, add more content.'; pts = 0; }
  else if (totalChars > 3000) { status = 'warn'; msg += ' — consider trimming for readability.'; pts = 1; }
  else if (totalChars > 200) { pts = 3; }

  rules.push({
    id: 'fmt-content-length',
    category: 'formatting',
    label: 'Total content length (200–3000 chars recommended)',
    status,
    message: msg,
    points: pts
  });

  const descriptions = (resume.experience || []).filter(e => (e.description || '').trim());
  const longDescriptions = descriptions.filter(e => e.description.length > 600);
  rules.push({
    id: 'fmt-bullet-length',
    category: 'formatting',
    label: 'Experience descriptions are scannable',
    status: descriptions.length === 0 ? 'warn' : longDescriptions.length === 0 ? 'pass' : 'warn',
    message: descriptions.length === 0
      ? 'Add experience descriptions to review readability.'
      : longDescriptions.length === 0
        ? 'Descriptions are concise'
        : `${longDescriptions.length} description(s) over 600 characters — break into shorter bullet points.`,
    points: descriptions.length > 0 && longDescriptions.length === 0 ? 2 : 0
  });

  const dateValues = collectDates(resume);
  const knownFamilies = [...new Set(
    dateValues.map(classifyDate).filter(c => c && c !== 'present' && c !== 'other')
  )];
  const mixedDates = knownFamilies.length > 1;
  rules.push({
    id: 'fmt-consistent-dates',
    category: 'formatting',
    label: 'Date format consistency',
    status: dateValues.length === 0 ? 'warn' : mixedDates ? 'warn' : 'pass',
    message: dateValues.length === 0
      ? 'Add dates to experience and education.'
      : mixedDates
        ? `Mixed date formats detected (${knownFamilies.length} styles) — pick one, e.g. "Jan 2020" or "2020-01".`
        : 'Dates use a consistent format',
    points: dateValues.length > 0 && !mixedDates ? 3 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkATS(resume) {
  const rules = [];
  let points = 0;
  const max = 10;

  const hasSkills = resume.skills && resume.skills.some(s => s.items);
  const skillItems = hasSkills ? resume.skills.flatMap(s => s.items.split(',').map(i => i.trim().toLowerCase()).filter(Boolean)) : [];
  const expDescriptions = (resume.experience || []).map(e => e.description || '').join(' ').toLowerCase();

  const matched = skillItems.filter(s => {
    if (!s) return false;
    const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(expDescriptions);
  });
  rules.push({
    id: 'ats-skills-in-exp',
    category: 'ats',
    label: 'Skills mentioned in experience descriptions',
    status: matched.length >= 2 ? 'pass' : matched.length > 0 ? 'warn' : 'fail',
    message: matched.length >= 2 ? `${matched.length} skills cross-referenced` : 'Reference your key skills in experience bullet points for ATS alignment.',
    points: matched.length >= 2 ? 4 : matched.length > 0 ? 1 : 0
  });

  const resumeText = collectResumeText(resume);
  const hostileGlyph = ATS_HOSTILE_GLYPHS.test(resumeText);
  rules.push({
    id: 'ats-clean-content',
    category: 'ats',
    label: 'No emoji or special symbols in content',
    status: resumeText.length === 0 ? 'warn' : hostileGlyph ? 'fail' : 'pass',
    message: resumeText.length === 0
      ? 'Add resume content to scan for ATS-hostile characters.'
      : hostileGlyph
        ? 'Emoji or special symbols detected — ATS parsers often drop or garble them.'
        : 'No problematic characters detected',
    points: resumeText.length > 0 && !hostileGlyph ? 3 : 0
  });

  const classifiedDates = collectDates(resume).map(classifyDate).filter(Boolean);
  const noDates = classifiedDates.length === 0;
  const unreadableDates = classifiedDates.filter(c => c === 'other').length;
  const knownDateFamilies = [...new Set(classifiedDates.filter(c => c !== 'present' && c !== 'other'))];
  const datesAtsFriendly = !noDates && unreadableDates === 0 && knownDateFamilies.length <= 1;
  rules.push({
    id: 'ats-date-format',
    category: 'ats',
    label: 'Machine-readable date formats',
    status: datesAtsFriendly ? 'pass' : 'warn',
    message: noDates
      ? 'Add dates to experience and education — ATS parsers expect them.'
      : unreadableDates > 0
        ? 'Some dates are not machine-readable — use "Jan 2020", "2020-01" or "2020".'
        : knownDateFamilies.length > 1
          ? 'Mixed date styles — standardize for ATS parsing.'
          : 'Dates look consistent',
    points: datesAtsFriendly ? 3 : 0
  });

  const total = rules.reduce((s, r) => s + r.points, 0);
  return { rules, points: total, max };
}

function checkJobMatch(jdMatch) {
  const max = 10;
  const points = Math.round((jdMatch.percentage / 100) * max);
  const topMissing = jdMatch.missing.slice(0, 5).map(m => m.term);
  return {
    rules: [{
      id: 'jd-keyword-coverage',
      category: 'jd',
      label: 'Keyword coverage vs job description',
      status: jdMatch.percentage >= 70 ? 'pass' : jdMatch.percentage >= 40 ? 'warn' : 'fail',
      message: `${jdMatch.total} key terms extracted — ${jdMatch.percentage}% found${topMissing.length ? `, missing: ${topMissing.join(', ')}` : ''}.`,
      points
    }],
    points,
    max
  };
}

export function auditResume(resumeData, options = {}) {
  const resume = resumeData || {};
  const categories = [
    { id: 'contact', label: 'Contact & Identity', ...checkContact(resume) },
    { id: 'summary', label: 'Professional Summary', ...checkSummary(resume) },
    { id: 'experience', label: 'Experience Quality', ...checkExperience(resume) },
    { id: 'education', label: 'Education', ...checkEducation(resume) },
    { id: 'skills', label: 'Skills', ...checkSkills(resume) },
    { id: 'formatting', label: 'Formatting & Structure', ...checkFormatting(resume) },
    { id: 'ats', label: 'ATS Compatibility', ...checkATS(resume) }
  ];

  const jdText = (options.jobDescription || '').trim();
  let jdMatch = null;
  if (jdText) {
    jdMatch = matchJobDescription(collectResumeText(resume), jdText);
    categories.push({ id: 'jd', label: 'Job Description Match', ...checkJobMatch(jdMatch) });
  }

  const allRules = categories.flatMap(c => c.rules);
  const totalScore = categories.reduce((s, c) => s + c.points, 0);
  const maxScore = categories.reduce((s, c) => s + c.max, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const issues = allRules
    .filter(r => r.status !== 'pass')
    .map(r => ({
      category: r.category,
      label: r.label,
      message: r.message,
      status: r.status
    }));

  return { score: totalScore, maxScore, percentage, categories, issues, jdMatch };
}
