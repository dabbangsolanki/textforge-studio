'use client';

import React, { useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import ToolShell from '@/components/ToolShell';

export default function SpeechToTextUI() {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Click Start Dictation and speak in English.');
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setStatusMsg('Dictation stopped.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatusMsg('Speech Recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setStatusMsg('Listening... speak clearly into your microphone.');
    };

    recognition.onresult = (event: any) => {
      let chunk = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          chunk += event.results[i][0].transcript + ' ';
        }
      }
      if (chunk) setTranscript((prev) => (prev ? `${prev.trim()} ${chunk}` : chunk));
    };

    recognition.onerror = (event: any) => {
      setStatusMsg(`Microphone notice: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <ToolShell
      title="Speech to Text Voice Typing"
      description="Dictate English notes hands-free using native browser speech recognition."
      outputText={transcript}
      onClear={() => setTranscript('')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          onClick={toggleListening}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-white ${
            listening ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-900 hover:bg-slate-800'
          }`}
        >
          {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {listening ? 'Stop Dictation' : 'Start Dictation'}
        </button>
        <span className="text-xs text-slate-600">{statusMsg}</span>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Your spoken English text will appear here..."
        rows={9}
        className="w-full rounded-lg border border-slate-300 p-3.5 text-sm"
      />
    </ToolShell>
  );
}
