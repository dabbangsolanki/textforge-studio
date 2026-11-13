'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import { toUnicodeStyle, UnicodeStyle } from '@/lib/logic/textTransforms';

const STYLES: { id: UnicodeStyle; name: string }[] = [
  { id: 'bold', name: 'Mathematical Bold' },
  { id: 'italic', name: 'Mathematical Italic' },
  { id: 'script', name: 'Cursive Script' },
  { id: 'monospace', name: 'Monospace Typewriter' },
];

export default function FancyFontUI() {
  const [text, setText] = useState('TextForge Studio');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyStyle = async (id: string, val: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <ToolShell
      title="Fancy Unicode Font Generator"
      description="Generate copy-pasteable Unicode text styles for Instagram, LinkedIn, X, and social bios."
      onClear={() => setText('')}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your name, headline, or bio..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm mb-5"
      />

      <div className="space-y-3">
        {STYLES.map((s) => {
          const styled = toUnicodeStyle(text, s.id);
          return (
            <div key={s.id} className="flex items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400">{s.name}</div>
                <div className="text-base text-slate-900 mt-0.5 break-all">{styled || '...'}</div>
              </div>
              <button
                onClick={() => copyStyle(s.id, styled)}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white border border-slate-300 hover:bg-slate-900 hover:text-white"
              >
                {copiedId === s.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === s.id ? 'Copied' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>
    </ToolShell>
  );
}
