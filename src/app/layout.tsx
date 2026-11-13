import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'TextForge Studio — 15 Free Online Text, Writing & Content Tools',
  description: 'A fast, privacy-first suite of 15 browser-based text and writing tools. No sign-up, no API limits, 100% client-side.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight text-slate-900">
              TextForge <span className="text-slate-500 font-normal">Studio</span>
            </Link>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
              15 Free Client-Side Tools
            </span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-white mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-slate-500">
            100% Browser-Based Processing • Your text never leaves your device.
          </div>
        </footer>
      </body>
    </html>
  );
}
