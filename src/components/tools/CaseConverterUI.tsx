'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { CaseType, convertCase } from '@/lib/logic/textTransforms';

const MODES: { id: CaseType; label: string }[] = [
  { id: 'upper', label: 'UPPERCASE' },
  { id: 'lower', label: 'lowercase' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' },
];

export default function CaseConverterUI() {
  const [text, setText] = useState('');

  return (
    <ToolShell
      title="Case Converter"
      description="Convert text across UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case."
      outputText={text}
      onClear={() => setText('')}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setText((prev) => convertCase(prev, m.id))}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-900 hover:text-white transition"
          >
            {m.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text and click any case button above..."
        rows={10}
        className="w-full rounded-lg border border-slate-300 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </ToolShell>
  );
}
