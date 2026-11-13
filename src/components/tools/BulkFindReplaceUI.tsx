'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import { bulkFindAndReplace, ReplaceRule } from '@/lib/logic/listOperations';

export default function BulkFindReplaceUI() {
  const [text, setText] = useState('');
  const [rules, setRules] = useState<ReplaceRule[]>([
    { id: '1', find: '', replace: '', useRegex: false, caseSensitive: false },
  ]);

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { id: String(Date.now()), find: '', replace: '', useRegex: false, caseSensitive: false },
    ]);
  };

  const updateRule = (id: string, patch: Partial<ReplaceRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRule = (id: string) => {
    setRules((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  const { output, totalMatches, error } = bulkFindAndReplace(text, rules);

  return (
    <ToolShell
      title="Bulk Find & Replace"
      description="Run multiple find-and-replace rules at once with optional Regex and case sensitivity."
      outputText={output}
      onClear={() => setText('')}
    >
      <div className="space-y-2.5 mb-5">
        {rules.map((rule) => (
          <div key={rule.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <input
              type="text"
              value={rule.find}
              onChange={(e) => updateRule(rule.id, { find: e.target.value })}
              placeholder="Find text or regex..."
              className="sm:col-span-4 border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white"
            />
            <input
              type="text"
              value={rule.replace}
              onChange={(e) => updateRule(rule.id, { replace: e.target.value })}
              placeholder="Replace with..."
              className="sm:col-span-4 border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white"
            />
            <div className="sm:col-span-4 flex items-center justify-between gap-2 text-xs">
              <label className="inline-flex items-center gap-1">
                <input type="checkbox" checked={rule.useRegex} onChange={(e) => updateRule(rule.id, { useRegex: e.target.checked })} />
                Regex
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="checkbox" checked={rule.caseSensitive} onChange={(e) => updateRule(rule.id, { caseSensitive: e.target.checked })} />
                Case
              </label>
              <button onClick={() => removeRule(rule.id)} className="text-rose-600 hover:text-rose-800 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={addRule}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-800 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Rule
          </button>
          <span className="text-xs font-medium text-slate-600">Total Replacements: {totalMatches}</span>
        </div>
        {error && <p className="text-xs text-rose-600">Regex Error: {error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Original text..."
          rows={9}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm"
        />
        <textarea
          readOnly
          value={output}
          placeholder="Updated output..."
          rows={9}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm"
        />
      </div>
    </ToolShell>
  );
}
