'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { generateSlug } from '@/lib/logic/textTransforms';

export default function SlugGeneratorUI() {
  const [title, setTitle] = useState('');
  const [sep, setSep] = useState<'-' | '_'>('-');
  const slug = generateSlug(title, sep);

  return (
    <ToolShell
      title="URL Slug Generator"
      description="Transform any headline or phrase into a clean, lowercase, URL-friendly slug."
      outputText={slug}
      onClear={() => setTitle('')}
    >
      <div className="flex items-center gap-3 mb-4 text-xs">
        <span className="font-medium text-slate-700">Separator:</span>
        <button
          onClick={() => setSep('-')}
          className={`px-3 py-1.5 rounded border ${sep === '-' ? 'bg-slate-900 text-white' : 'bg-white border-slate-300'}`}
        >
          Hyphen (-)
        </button>
        <button
          onClick={() => setSep('_')}
          className={`px-3 py-1.5 rounded border ${sep === '_' ? 'bg-slate-900 text-white' : 'bg-white border-slate-300'}`}
        >
          Underscore (_)
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter article title or product name..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm mb-4"
      />

      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm text-slate-800 break-all">
        {slug || 'your-clean-url-slug'}
      </div>
    </ToolShell>
  );
}
