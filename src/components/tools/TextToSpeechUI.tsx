'use client';

import React, { useEffect, useState } from 'react';
import { Play, Square } from 'lucide-react';
import ToolShell from '@/components/ToolShell';

export default function TextToSpeechUI() {
  const [text, setText] = useState('Welcome to TextForge Studio. Paste any English text here to listen aloud.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      const enVoices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
      setVoices(enVoices);
      if (enVoices.length > 0 && !selectedVoice) setSelectedVoice(enVoices[0].name);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, [selectedVoice]);

  const speak = () => {
    if (!text.trim() || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const match = voices.find((v) => v.name === selectedVoice);
    if (match) utter.voice = match;
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
  };

  const stop = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  return (
    <ToolShell
      title="Text to Speech Reader"
      description="Listen to English text using your browser's native speech synthesis engine—zero API required."
      outputText={text}
      onClear={() => {
        stop();
        setText('');
      }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white max-w-xs"
        >
          {voices.length === 0 && <option value="">Default Browser Voice</option>}
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>

        <label className="text-xs flex items-center gap-2">
          Speed: {rate}x
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={speak}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Play className="w-3.5 h-3.5" /> Speak
          </button>
          <button
            onClick={stop}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700"
          >
            <Square className="w-3.5 h-3.5" /> Stop
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full rounded-lg border border-slate-300 p-3.5 text-sm"
      />
    </ToolShell>
  );
}
