export type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab';

export function convertCase(text: string, type: CaseType): string {
  const words = text.trim().split(/[\s_-]+/).filter(Boolean);
  switch (type) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'camel':
      return words
        .map((w, i) =>
          i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join('');
    case 'snake':
      return words.map((w) => w.toLowerCase()).join('_');
    case 'kebab':
      return words.map((w) => w.toLowerCase()).join('-');
  }
}

export function generateSlug(text: string, separator: '-' | '_' = '-'): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, separator);
}

export function cleanExtraSpaces(
  text: string,
  options: { removeLineBreaks: boolean; trimLines: boolean; collapseSpaces: boolean }
): string {
  let result = text;
  if (options.trimLines) {
    result = result
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }
  if (options.removeLineBreaks) {
    result = result.replace(/\r?\n+/g, ' ');
  } else {
    result = result.replace(/\n{3,}/g, '\n\n');
  }
  if (options.collapseSpaces) {
    result = result.replace(/[ \t]{2,}/g, ' ');
  }
  return result.trim();
}

const FLIP_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  '?': '¿', '!': '¡', '.': '˙', ',': "'",
};

export function reverseOrFlipText(text: string, mode: 'reverse' | 'reverseWords' | 'upsideDown'): string {
  if (mode === 'reverse') return Array.from(text).reverse().join('');
  if (mode === 'reverseWords') return text.split(/\s+/).reverse().join(' ');
  return Array.from(text.toLowerCase())
    .reverse()
    .map((ch) => FLIP_MAP[ch] || ch)
    .join('');
}

export type UnicodeStyle = 'bold' | 'italic' | 'script' | 'monospace';

export function toUnicodeStyle(text: string, style: UnicodeStyle): string {
  const offsets: Record<UnicodeStyle, { upper: number; lower: number }> = {
    bold: { upper: 0x1d400, lower: 0x1d41a },
    italic: { upper: 0x1d434, lower: 0x1d44e },
    script: { upper: 0x1d49c, lower: 0x1d4b6 },
    monospace: { upper: 0x1d670, lower: 0x1d68a },
  };
  const { upper, lower } = offsets[style];
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(upper + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(lower + (code - 97));
      return char;
    })
    .join('');
}
