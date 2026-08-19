import React, { useState } from 'react';
import { Award as AwardIcon, Trophy, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Award } from '../types';

interface AwardsSectionProps {
  awards: Award[];
  celebrityName: string;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ awards, celebrityName }) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Won' | 'Nominated'>('Won');

  const filteredAwards = awards.filter((a) => {
    if (filterStatus === 'Won') return a.status === 'Won';
    if (filterStatus === 'Nominated') return a.status === 'Nominated';
    return true;
  });

  const wonCount = awards.filter((a) => a.status === 'Won').length;

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Awards & Major Accolades</h2>
            <p className="text-xs text-zinc-400">
              Honors received by {celebrityName} ({wonCount} Wins)
            </p>
          </div>
        </div>

        {/* Filter Pill */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {(['Won', 'All', 'Nominated'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filterStatus === status
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Awards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAwards.map((award) => (
          <div
            key={award.id}
            className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 hover:border-amber-500/30 transition-all flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 fill-amber-400/20" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif font-bold text-sm text-zinc-100 group-hover:text-amber-300 transition-colors">
                  {award.awardName}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${
                    award.status === 'Won'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {award.status} • {award.year}
                </span>
              </div>

              <p className="text-xs text-zinc-300 font-medium mt-1">{award.category}</p>

              {award.project && (
                <p className="text-xs text-zinc-500 mt-0.5">
                  Project: <span className="text-amber-200/80 italic">{award.project}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAwards.length === 0 && (
        <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-zinc-800 text-zinc-500 text-sm">
          No awards found for filter status "{filterStatus}".
        </div>
      )}
    </section>
  );
};
