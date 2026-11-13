'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { generateLoremIpsum } from '@/lib/logic/generators';

export default function LoremIpsumUI() {
  const [mode, setMode] = useState<'paragraphs' | 'sentences' | 'words' | 'list'>('paragraphs');
  const [count, setCount] = useState(3);
  const output = generateLoremIpsum(mode, count);

  return (
    <ToolShell
      title="Lorem Ipsum Generator"
      description="Generate clean placeholder paragraphs, sentences, words, or bullet points for mockups."
      outputText={output}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'paragraphs' | 'sentences' | 'words' | 'list')}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="list">Bullet List</option>
        </select>

        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value) || 1)}
          className="w-24 border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <textarea
        readOnly
        value={output}
        rows={10}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm leading-relaxed"
      />
    </ToolShell>
  );
}
