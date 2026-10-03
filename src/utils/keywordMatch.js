const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'all', 'also', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers',
  'him', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'its',
  'just', 'me', 'more', 'most', 'my', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'our', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
  'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those', 'through',
  'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which',
  'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your', 'yours'
]);

const JD_BOILERPLATE = new Set([
  'experience', 'work', 'working', 'team', 'teams', 'ability', 'able', 'skills', 'skill', 'role', 'roles',
  'job', 'company', 'candidate', 'candidates', 'applicant', 'applicants', 'apply', 'application', 'applications',
  'position', 'responsibilities', 'responsibility', 'requirements', 'requirement', 'qualification',
  'qualifications', 'preferred', 'required', 'require', 'requires', 'plus', 'etc', 'including', 'include',
  'includes', 'strong', 'excellent', 'good', 'great', 'knowledge', 'understanding', 'years', 'year',
  'new', 'well', 'using', 'use', 'used', 'help', 'ensure', 'support', 'across', 'within', 'join',
  'looking', 'seeking', 'related', 'field', 'degree', 'bachelor', 'bachelors', 'masters', 'equivalent',
  'similar', 'least', 'must', 'may', 'per', 'day', 'time', 'people', 'person', 'world', 'fast', 'based',
  'opportunity', 'opportunities', 'environment', 'business', 'benefits', 'salary', 'remote', 'hybrid',
  'onsite', 'office', 'full', 'part', 'contract', 'location', 'date', 'posted', 'equal', 'employer',
  'please', 'want', 'need', 'needs', 'like', 'workplace', 'culture', 'growth', 'benefit', 'modern',
  'familiarity', 'communication', 'teamwork', 'web', 'join', 'our', 'platform', 'building', 'build'
]);

const TOKEN_SOURCE = '[a-z][a-z0-9+#./\\-]*';

function isContent(token) {
  return token.length > 1
    && !STOPWORDS.has(token)
    && !JD_BOILERPLATE.has(token)
    && !/^\d+$/.test(token);
}

function tokenizeWithPositions(text) {
  const tokens = [];
  const re = new RegExp(TOKEN_SOURCE, 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    const token = m[0].replace(/[.+/#\-]+$/, '');
    if (token) {
      tokens.push({ token, start: m.index, end: m.index + m[0].length });
    }
  }
  return tokens;
}

export function extractKeywords(text, limit = 40) {
  const lower = (text || '').toLowerCase();
  const raw = tokenizeWithPositions(lower);

  const unigramCounts = new Map();
  const bigramCounts = new Map();

  for (let i = 0; i < raw.length; i++) {
    const { token, end } = raw[i];
    if (isContent(token)) {
      unigramCounts.set(token, (unigramCounts.get(token) || 0) + 1);

      const next = raw[i + 1];
      const gap = next ? lower.slice(end, next.start) : null;
      const adjacent = next && gap !== null && gap.length > 0 && /^\s+$/.test(gap);
      if (adjacent && isContent(next.token) && next.token !== token) {
        const bigram = `${token} ${next.token}`;
        bigramCounts.set(bigram, (bigramCounts.get(bigram) || 0) + 1);
      }
    }
  }

  const repeatedBigrams = [...bigramCounts.entries()].filter(([, count]) => count >= 2);
  const coveredWords = new Set(repeatedBigrams.flatMap(([bigram]) => bigram.split(' ')));

  const terms = [
    ...repeatedBigrams.map(([term, count]) => ({ term, count })),
    ...[...unigramCounts.entries()]
      .filter(([term]) => !coveredWords.has(term))
      .map(([term, count]) => ({ term, count }))
  ];

  return terms
    .sort((a, b) => b.count - a.count || b.term.length - a.term.length)
    .slice(0, limit);
}

function termInText(term, text) {
  if (term.includes(' ')) return text.includes(term);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
}

export function matchJobDescription(resumeText, jdText) {
  const keywords = extractKeywords(jdText || '');
  const text = (resumeText || '').toLowerCase();
  const matched = [];
  const missing = [];

  keywords.forEach(k => (termInText(k.term, text) ? matched : missing).push(k));

  const percentage = keywords.length
    ? Math.round((matched.length / keywords.length) * 100)
    : 0;

  return { percentage, matched, missing, total: keywords.length };
}
