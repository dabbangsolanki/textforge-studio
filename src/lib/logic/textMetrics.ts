export interface TextAuditResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  syllables: number;
  readingTimeSec: number;
  speakingTimeSec: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  readabilityVerdict: 'Very Easy' | 'Easy' | 'Standard' | 'Fairly Difficult' | 'Difficult';
  avgWordsPerSentence: number;
}

function countSyllablesInWord(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function analyzeText(input: string): TextAuditResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      syllables: 0,
      readingTimeSec: 0,
      speakingTimeSec: 0,
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      readabilityVerdict: 'Standard',
      avgWordsPerSentence: 0,
    };
  }

  const wordList = trimmed.split(/\s+/).filter(Boolean);
  const words = wordList.length;
  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, '').length;
  const sentences = Math.max(1, trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length);
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const syllables = wordList.reduce((acc, w) => acc + countSyllablesInWord(w), 0);

  const avgWordsPerSentence = Number((words / sentences).toFixed(1));
  const avgSyllablesPerWord = syllables / words;

  const rawEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschReadingEase = Math.max(0, Math.min(100, Number(rawEase.toFixed(1))));
  const rawGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const fleschKincaidGrade = Math.max(0, Number(rawGrade.toFixed(1)));

  let readabilityVerdict: TextAuditResult['readabilityVerdict'] = 'Standard';
  if (fleschReadingEase >= 80) readabilityVerdict = 'Very Easy';
  else if (fleschReadingEase >= 70) readabilityVerdict = 'Easy';
  else if (fleschReadingEase >= 50) readabilityVerdict = 'Standard';
  else if (fleschReadingEase >= 30) readabilityVerdict = 'Fairly Difficult';
  else readabilityVerdict = 'Difficult';

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    syllables,
    readingTimeSec: Math.ceil((words / 225) * 60),
    speakingTimeSec: Math.ceil((words / 130) * 60),
    fleschReadingEase,
    fleschKincaidGrade,
    readabilityVerdict,
    avgWordsPerSentence,
  };
}
