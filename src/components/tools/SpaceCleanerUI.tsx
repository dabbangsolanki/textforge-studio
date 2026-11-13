'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { cleanExtraSpaces } from '@/lib/logic/textTransforms';

export default function SpaceCleanerUI() {
  const [input, setInput] = useState('');
  const [removeLineBreaks, setRemoveLineBreaks] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);

  const output = cleanExtraSpaces(input, { removeLineBreaks, trimLines, collapseSpaces });

  return (
    <ToolShell
      title="Line Break & Space Cleaner"
      description="Strip extra whitespace, broken PDF line wraps, and leading/trailing spaces."
      outputText={output}
      onClear={() => setInput('')}
    >
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} />
          Collapse Multiple Spaces
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={removeLineBreaks} onChange={(e) => setRemoveLineBreaks(e.target.checked)} />
          Remove All Line Breaks
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
          Trim Line Edges
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste messy text here..."
          rows={9}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm"
        />
        <textarea
          readOnly
          value={output}
          placeholder="Cleaned output..."
          rows={9}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"
        />
      </div>
    </ToolShell>
  );
}
