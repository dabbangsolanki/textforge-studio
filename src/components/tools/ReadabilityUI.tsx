'use client';

import React, { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import { analyzeText } from '@/lib/logic/textMetrics';

export default function ReadabilityUI() {
  const [text, setText] = useState('');
  const audit = analyzeText(text);

  const report = `Readability Verdict: ${audit.readabilityVerdict}\nFlesch Reading Ease: ${audit.fleschReadingEase}/100\nGrade Level: ${audit.fleschKincaidGrade}\nAvg Words/Sentence: ${audit.avgWordsPerSentence}`;

  return (
    <ToolShell
      title="Readability Score Checker"
      description="Audit content clarity using Flesch Reading Ease, Flesch-Kincaid Grade Level, and sentence length."
      outputText={text ? report : ''}
      onClear={() => setText('')}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
          <div className="text-lg font-bold text-slate-900">{audit.fleschReadingEase}</div>
          <div className="text-xs text-slate-500">Reading Ease (0-100)</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
          <div className="text-lg font-bold text-slate-900">Grade {audit.fleschKincaidGrade}</div>
          <div className="text-xs text-slate-500">Flesch-Kincaid Level</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
          <div className="text-lg font-bold text-slate-900">{audit.avgWordsPerSentence}</div>
          <div className="text-xs text-slate-500">Words / Sentence</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
          <div className="text-lg font-bold text-emerald-700">{audit.readabilityVerdict}</div>
          <div className="text-xs text-slate-500">Clarity Rating</div>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your article, email, or copy to check readability..."
        rows={9}
        className="w-full rounded-lg border border-slate-300 p-3.5 text-sm"
      />
    </ToolShell>
  );
}
