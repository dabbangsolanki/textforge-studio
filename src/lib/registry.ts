export interface ToolMeta {
  id: number;
  slug: string;
  name: string;
  shortDesc: string;
  badge: string;
}

export const TEXT_TOOLS_REGISTRY: ToolMeta[] = [
  { id: 1, slug: 'word-character-counter', name: 'Word & Character Counter', shortDesc: 'Count words, characters, sentences, paragraphs, and reading time.', badge: 'Metrics' },
  { id: 2, slug: 'case-converter', name: 'Case Converter', shortDesc: 'Convert text to UPPERCASE, lowercase, Title, camelCase, or snake_case.', badge: 'Transform' },
  { id: 3, slug: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', shortDesc: 'Deduplicate lists, strip empty lines, and sort alphabetically.', badge: 'Cleanup' },
  { id: 4, slug: 'bulk-find-replace', name: 'Bulk Find & Replace', shortDesc: 'Run multiple find-and-replace rules simultaneously with Regex support.', badge: 'Editor' },
  { id: 5, slug: 'text-diff-checker', name: 'Text Diff Checker', shortDesc: 'Compare two text blocks side-by-side and highlight added or removed lines.', badge: 'Compare' },
  { id: 6, slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', shortDesc: 'Generate placeholder paragraphs, sentences, words, or bullet lists.', badge: 'Generator' },
  { id: 7, slug: 'reverse-upside-down-text', name: 'Reverse & Flip Text', shortDesc: 'Mirror characters, reverse word order, or flip text upside down.', badge: 'Fun' },
  { id: 8, slug: 'fancy-unicode-fonts', name: 'Fancy Unicode Font Generator', shortDesc: 'Create bold, italic, script, and monospace Unicode text for social bios.', badge: 'Social' },
  { id: 9, slug: 'markdown-html-previewer', name: 'Markdown to HTML Previewer', shortDesc: 'Write Markdown and preview live rendered output alongside clean HTML.', badge: 'Markup' },
  { id: 10, slug: 'url-slug-generator', name: 'URL Slug Generator', shortDesc: 'Convert titles into clean, lowercase, URL-safe slugs.', badge: 'Web' },
  { id: 11, slug: 'text-to-speech', name: 'Text to Speech Reader', shortDesc: 'Listen to any text using built-in browser voices with speed & pitch controls.', badge: 'Audio' },
  { id: 12, slug: 'speech-to-text', name: 'Speech to Text Voice Typing', shortDesc: 'Dictate notes directly via microphone using native browser speech recognition.', badge: 'Voice' },
  { id: 13, slug: 'extra-space-line-cleaner', name: 'Line Break & Space Cleaner', shortDesc: 'Clean messy PDF copy-pastes, extra spaces, and broken line wraps.', badge: 'Cleanup' },
  { id: 14, slug: 'readability-score-checker', name: 'Readability Score Checker', shortDesc: 'Audit content clarity with Flesch-Kincaid Reading Ease and Grade Level.', badge: 'Audit' },
  { id: 15, slug: 'name-username-combiner', name: 'Name & Username Combiner', shortDesc: 'Merge two keyword lists into brand names, domain ideas, and handles.', badge: 'Branding' },
];
