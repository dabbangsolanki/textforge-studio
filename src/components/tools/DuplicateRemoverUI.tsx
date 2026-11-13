'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { deduplicateLines } from '@/lib/logic/listOperations';

export default function DuplicateRemoverUI() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const { output, removedCount } = deduplicateLines(input, { caseSensitive, sortOrder, removeEmpty });

  return (
    <ToolShell
      title="Remove Duplicate Lines"
      description="Remove duplicate entries from any list, strip blank lines, and sort alphabetically."
      outputText={output}
      onClear={() => setInput('')}
    >
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case Sensitive
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          Remove Empty Lines
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
          className="border border-slate-300 rounded-md px-2.5 py-1 bg-white"
        >
          <option value="none">Keep Original Order</option>
          <option value="asc">Sort A → Z</option>
          <option value="desc">Sort Z → A</option>
        </select>
        <span className="ml-auto font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Removed: {removedCount} lines
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste lines here (one per line)..."
          rows={10}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <textarea
          readOnly
          value={output}
          placeholder="Clean unique lines appear here..."
          rows={10}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"
        />
      </div>
    </ToolShell>
  );
}
