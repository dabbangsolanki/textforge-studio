import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TEXT_TOOLS_REGISTRY } from '@/lib/registry';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-2xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Everyday Text, Writing & Content Utilities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          15 fast, zero-API tools that run directly inside your browser for instant formatting, cleanup, comparison, and voice dictation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEXT_TOOLS_REGISTRY.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-900 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {tool.badge}
                </span>
                <span className="text-xs text-slate-400">#{tool.id}</span>
              </div>
              <h2 className="font-semibold text-slate-900 group-hover:underline">{tool.name}</h2>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{tool.shortDesc}</p>
            </div>

            <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-slate-900">
              Open Tool <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
