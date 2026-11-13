'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { combineNames } from '@/lib/logic/listOperations';

export default function NameCombinerUI() {
  const [listA, setListA] = useState('Text\nWord\nQuick\nSmart');
  const [listB, setListB] = useState('Forge\nCraft\nLab\nStudio');
  const [separator, setSeparator] = useState('');

  const combined = combineNames(listA.split('\n'), listB.split('\n'), separator);
  const output = combined.join('\n');

  return (
    <ToolShell
      title="Name & Username Combiner"
      description="Combine two keyword lists to generate brand names, domain ideas, and social handles."
      outputText={output}
      onClear={() => {
        setListA('');
        setListB('');
      }}
    >
      <div className="flex items-center gap-3 mb-4 text-xs">
        <span className="font-medium text-slate-700">Separator:</span>
        {[
          { label: 'None (TextForge)', val: '' },
          { label: 'Hyphen (text-forge)', val: '-' },
          { label: 'Underscore (text_forge)', val: '_' },
          { label: 'Dot (text.forge)', val: '.' },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => setSeparator(opt.val)}
            className={`px-2.5 py-1.5 rounded border ${
              separator === opt.val ? 'bg-slate-900 text-white' : 'bg-white border-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Prefix Words</label>
          <textarea
            value={listA}
            onChange={(e) => setListA(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Suffix Words</label>
          <textarea
            value={listB}
            onChange={(e) => setListB(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Combinations ({combined.length})
          </label>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"
          />
        </div>
      </div>
    </ToolShell>
  );
}
