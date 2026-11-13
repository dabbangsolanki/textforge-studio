'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { reverseOrFlipText } from '@/lib/logic/textTransforms';

export default function ReverseTextUI() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'reverse' | 'reverseWords' | 'upsideDown'>('reverse');
  const output = reverseOrFlipText(text, mode);

  return (
    <ToolShell
      title="Reverse & Flip Text"
      description="Mirror characters backwards, reverse word order, or flip text upside down."
      outputText={output}
      onClear={() => setText('')}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'reverse', label: 'Reverse Characters' },
          { id: 'reverseWords', label: 'Reverse Words' },
          { id: 'upsideDown', label: 'Upside Down Flip' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as 'reverse' | 'reverseWords' | 'upsideDown')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
              mode === item.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text here..."
          rows={7}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm"
        />
        <textarea
          readOnly
          value={output}
          placeholder="Transformed output..."
          rows={7}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"
        />
      </div>
    </ToolShell>
  );
}
