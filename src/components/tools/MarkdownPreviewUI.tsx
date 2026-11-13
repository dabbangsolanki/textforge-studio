'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { simpleMarkdownToHtml } from '@/lib/logic/generators';

export default function MarkdownPreviewUI() {
  const [md, setMd] = useState('# Hello World\n\nWrite **bold**, *italic*, `inline code`, or lists:\n\n- Fast browser rendering\n- Clean HTML export');
  const html = simpleMarkdownToHtml(md);

  return (
    <ToolShell
      title="Markdown to HTML Previewer"
      description="Write Markdown on the left and inspect live rendered preview and HTML markup."
      outputText={html}
      onClear={() => setMd('')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Markdown Input</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-slate-300 p-3 font-mono text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Live Rendered Preview</label>
          <div
            className="w-full h-[232px] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Generated HTML</label>
        <textarea
          readOnly
          value={html}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-slate-900 text-emerald-300 font-mono p-3 text-xs"
        />
      </div>
    </ToolShell>
  );
}
