export function generateReadme(config) {
  const lines = [];
  const { basic, about, tech, social, stats, visitor, custom } = config;

  if (basic?.name) {
    const greeting = basic.greeting || 'Hi there';
    lines.push(`# ${greeting}, I'm ${basic.name}! 👋`);
    if (basic.tagline) lines.push(`\n${basic.tagline}`);
    lines.push('');
  }

  if (about?.bio) {
    lines.push('## 🚀 About Me');
    lines.push('');
    about.bio.split('\n').filter(Boolean).forEach(p => lines.push(p));
    lines.push('');
    if (about.currentlyLearning) {
      lines.push(`- 🔭 I'm currently working on **${about.currentlyLearning}**`);
    }
    if (about.funFact) {
      lines.push(`- ⚡ Fun fact: ${about.funFact}`);
    }
    lines.push('');
  }

  if (tech?.length > 0) {
    lines.push('## 🛠️ Tech Stack');
    lines.push('');
    const grouped = {};
    tech.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    });
    Object.entries(grouped).forEach(([cat, items]) => {
      const categoryLabel = cat.charAt(0).toUpperCase() + cat.slice(1);
      lines.push(`### ${categoryLabel}`);
      lines.push('');
      const badges = items.map(t =>
        `![${t.label}](https://img.shields.io/badge/${encodeURIComponent(t.label)}-${t.color}?style=for-the-badge&logo=${t.logo}&logoColor=white)`
      );
      lines.push(badges.join(' '));
      lines.push('');
    });
  }

  if (social?.length > 0) {
    lines.push('## 🌐 Connect with Me');
    lines.push('');
    const badges = social.map(s =>
      `[![${s.label}](https://img.shields.io/badge/${encodeURIComponent(s.label)}-${s.color}?style=for-the-badge&logo=${s.logo}&logoColor=white)](${s.url})`
    );
    lines.push(badges.join(' '));
    lines.push('');
  }

  if (stats?.show && stats.username) {
    lines.push('## 📊 GitHub Stats');
    lines.push('');
    const theme = stats.theme || 'default';
    const username = stats.username;
    if (stats.showStats) {
      lines.push(`![${username}'s Stats](https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=true&hide_border=true&count_private=true)`);
    }
    if (stats.showStreak) {
      lines.push(`![${username}'s Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=true)`);
    }
    if (stats.showTopLangs) {
      lines.push(`![${username}'s Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&show_icons=true&hide_border=true&layout=compact)`);
    }
    lines.push('');
  }

  if (visitor?.show) {
    lines.push('---');
    const style = visitor.style || 'flat';
    lines.push('');
    lines.push(`![Profile views](https://visitcount.itsvg.in/api?id=${visitor.username || 'your-username'}&icon=0&color=${visitor.color || '6'})`);
    lines.push('');
  }

  if (custom?.showTrophies && stats?.username) {
    lines.push('## 🏆 GitHub Trophies');
    lines.push('');
    lines.push(`![](https://github-profile-trophy.vercel.app/?username=${stats.username}&theme=${stats.theme || 'radical'}&no-frame=true&no-bg=false&margin-w=4)`);
    lines.push('');
  }

  if (custom?.showSnake && stats?.username) {
    lines.push('---');
    lines.push('');
    lines.push(`![Snake animation](https://github.com/${stats.username}/${stats.username}/blob/output/github-contribution-grid-snake.svg)`);
    lines.push('');
  }

  return lines.join('\n').trim();
}

export function renderMarkdownToHtml(md) {
  let html = md;

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;" />');

  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/---/g, '<hr />');

  html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');

  html = html.replace(/(<br \/>){3,}/g, '<br /><br />');

  html = `<div class="readme-rendered">${html}</div>`;

  return html;
}
