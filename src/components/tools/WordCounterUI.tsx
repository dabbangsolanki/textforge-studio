'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { analyzeText } from '@/lib/logic/textMetrics';

export default function WordCounterUI() {
  const [text, setText] = useState('');
  const stats = analyzeText(text);

  const cards = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'No Spaces', value: stats.charactersNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Read Time', value: `${stats.readingTimeSec}s` },
  ];

  return (
    <ToolShell
      title="Word & Character Counter"
      description="Count words, characters, sentences, paragraphs, and estimated reading time in real time."
      outputText={text}
      onClear={() => setText('')}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-slate-900">{c.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={10}
        className="w-full rounded-lg border border-slate-300 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </ToolShell>
  );
}
