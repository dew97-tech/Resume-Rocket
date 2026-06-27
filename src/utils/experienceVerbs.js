export const VERB_CATEGORIES = {
  leadership: ['Directed', 'Spearheaded', 'Orchestrated', 'Led', 'Championed', 'Managed', 'Supervised', 'Coordinated', 'Governed', 'Pioneered', 'Mentored', 'Steered'],
  technical: ['Engineered', 'Architected', 'Optimized', 'Developed', 'Built', 'Deployed', 'Implemented', 'Programmed', 'Coded', 'Migrated', 'Integrated', 'Automated', 'Refactored', 'Debugged'],
  creative: ['Designed', 'Conceptualized', 'Crafted', 'Created', 'Visualized', 'Innovated', 'Redesigned', 'Illustrated', 'Composed', 'Produced', 'Authored', 'Curated'],
  analytical: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Calculated', 'Modeled', 'Forecasted', 'Diagnosed', 'Audited', 'Measured', 'Quantified', 'Validated'],
  communication: ['Presented', 'Authored', 'Negotiated', 'Facilitated', 'Collaborated', 'Communicated', 'Wrote', 'Authored', 'Translated', 'Articulated', 'Advocated', 'Persuaded'],
  operational: ['Streamlined', 'Automated', 'Implemented', 'Standardized', 'Optimized', 'Overhauled', 'Consolidated', 'Centralized', 'Restructured', 'Transformed', 'Scaled', 'Reduced']
};

export const ALL_VERBS = Object.values(VERB_CATEGORIES).flat();

export function formatBullet(data, format) {
  const verb = data.verb || '[Verb]';
  const action = data.action || '[Action]';
  const metric = data.metric || '';
  const method = data.method || '';
  const context = data.context || '';

  switch (format) {
    case 'google-xyz': {
      let parts = [verb, action];
      if (metric) parts.push(`as measured by ${metric}`);
      if (method) parts.push(`by ${method}`);
      if (context) parts.push(`for ${context}`);
      return parts.join(', ') + '.';
    }
    case 'star': {
      let parts = [`${verb} ${action}`];
      if (metric) parts.push(`resulting in ${metric}`);
      if (method) parts.push(`using ${method}`);
      if (context) parts.push(`(${context})`);
      return parts.join(' ') + '.';
    }
    case 'power': {
      let main = `${verb} ${action}`;
      if (metric) main += ` (${metric})`;
      let suffix = [];
      if (method) suffix.push(method);
      if (context) suffix.push(context);
      if (suffix.length) main += ` — ${suffix.join(', ')}`;
      return main + '.';
    }
    default:
      return '';
  }
}

export const FORMAT_LABELS = [
  { id: 'google-xyz', name: 'Google XYZ', desc: '[Verb] [X], as measured by [Y], by [Z]' },
  { id: 'star', name: 'STAR Bullet', desc: '[Verb] [Action] resulting in [Result] using [Method]' },
  { id: 'power', name: 'Power Bullet', desc: '[Verb] [Action] ([Metric]) — [Context]' }
];
