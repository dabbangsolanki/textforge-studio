const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function buildSentence(wordCount: number, offset: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[(offset + i) % LOREM_WORDS.length]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

export function generateLoremIpsum(
  mode: 'paragraphs' | 'sentences' | 'words' | 'list',
  count: number
): string {
  const safeCount = Math.max(1, Math.min(100, count));
  if (mode === 'words') {
    const out: string[] = [];
    for (let i = 0; i < safeCount; i++) {
      out.push(LOREM_WORDS[i % LOREM_WORDS.length]);
    }
    return out.join(' ');
  }
  if (mode === 'sentences') {
    return Array.from({ length: safeCount }, (_, i) => buildSentence(12 + (i % 6), i * 7)).join(' ');
  }
  if (mode === 'list') {
    return Array.from({ length: safeCount }, (_, i) => `- ${buildSentence(9 + (i % 5), i * 5)}`).join('\n');
  }
  return Array.from({ length: safeCount }, (_, pIdx) =>
    Array.from({ length: 4 }, (_, sIdx) => buildSentence(13 + ((pIdx + sIdx) % 5), (pIdx * 4 + sIdx) * 9)).join(' ')
  ).join('\n\n');
}

export function simpleMarkdownToHtml(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto my-3 text-xs"><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-3 italic text-slate-600 my-2">$1</blockquote>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>');
  html = html.replace(/^\s*[-*] (.*$)/gim, '<li class="ml-5 list-disc">$1</li>');
  html = html.replace(/\n{2,}/g, '</p><p class="my-2">');
  return `<p class="my-2">${html}</p>`;
}
