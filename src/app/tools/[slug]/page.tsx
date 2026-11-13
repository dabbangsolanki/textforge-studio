import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TEXT_TOOLS_REGISTRY } from '@/lib/registry';
import WordCounterUI from '@/components/tools/WordCounterUI';
import CaseConverterUI from '@/components/tools/CaseConverterUI';
import DuplicateRemoverUI from '@/components/tools/DuplicateRemoverUI';
import BulkFindReplaceUI from '@/components/tools/BulkFindReplaceUI';
import TextDiffUI from '@/components/tools/TextDiffUI';
import LoremIpsumUI from '@/components/tools/LoremIpsumUI';
import ReverseTextUI from '@/components/tools/ReverseTextUI';
import FancyFontUI from '@/components/tools/FancyFontUI';
import MarkdownPreviewUI from '@/components/tools/MarkdownPreviewUI';
import SlugGeneratorUI from '@/components/tools/SlugGeneratorUI';
import TextToSpeechUI from '@/components/tools/TextToSpeechUI';
import SpeechToTextUI from '@/components/tools/SpeechToTextUI';
import SpaceCleanerUI from '@/components/tools/SpaceCleanerUI';
import ReadabilityUI from '@/components/tools/ReadabilityUI';
import NameCombinerUI from '@/components/tools/NameCombinerUI';

export function generateStaticParams() {
  return TEXT_TOOLS_REGISTRY.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = TEXT_TOOLS_REGISTRY.find((t) => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.name} — TextForge Studio`,
    description: tool.shortDesc,
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  switch (params.slug) {
    case 'word-character-counter':
      return <WordCounterUI />;
    case 'case-converter':
      return <CaseConverterUI />;
    case 'remove-duplicate-lines':
      return <DuplicateRemoverUI />;
    case 'bulk-find-replace':
      return <BulkFindReplaceUI />;
    case 'text-diff-checker':
      return <TextDiffUI />;
    case 'lorem-ipsum-generator':
      return <LoremIpsumUI />;
    case 'reverse-upside-down-text':
      return <ReverseTextUI />;
    case 'fancy-unicode-fonts':
      return <FancyFontUI />;
    case 'markdown-html-previewer':
      return <MarkdownPreviewUI />;
    case 'url-slug-generator':
      return <SlugGeneratorUI />;
    case 'text-to-speech':
      return <TextToSpeechUI />;
    case 'speech-to-text':
      return <SpeechToTextUI />;
    case 'extra-space-line-cleaner':
      return <SpaceCleanerUI />;
    case 'readability-score-checker':
      return <ReadabilityUI />;
    case 'name-username-combiner':
      return <NameCombinerUI />;
    default:
      notFound();
  }
}
