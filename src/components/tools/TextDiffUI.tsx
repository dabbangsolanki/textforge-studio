'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { computeLineDiff } from '@/lib/logic/diffEngine';

export default function TextDiffUI() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');

  const segments = computeLineDiff(original, modified);
  const diffSummary = segments
    .map((s) => `${s.type === 'added' ? '+ ' : s.type === 'removed' ? '- ' : '  '}${s.value}`)
    .join('\n');

  return (
    <ToolShell
      title="Text Diff Checker"
      description="Compare two versions of text line-by-line and highlight additions and deletions."
      outputText={diffSummary}
      onClear={() => {
        setOriginal('');
        setModified('');
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Original Text</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text..."
            rows={7}
            className="w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Modified Text</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text..."
            rows={7}
            className="w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 border-b border-slate-200">
          Comparison Output
        </div>
        <div className="p-3 font-mono text-xs space-y-1 max-h-80 overflow-y-auto">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className={
                seg.type === 'added'
                  ? 'bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded'
                  : seg.type === 'removed'
                  ? 'bg-rose-50 text-rose-900 line-through px-2 py-0.5 rounded'
                  : 'text-slate-700 px-2 py-0.5'
              }
            >
              <span className="inline-block w-4 font-bold">
                {seg.type === 'added' ? '+' : seg.type === 'removed' ? '-' : ' '}
              </span>
              {seg.value || ' '}
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
