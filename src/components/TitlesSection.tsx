import React from 'react';
import { Crown, Medal, Star, Shield, Award, Landmark } from 'lucide-react';
import { CelebrityTitle } from '../types';

interface TitlesSectionProps {
  titles: CelebrityTitle[];
  celebrityName: string;
}

export const TitlesSection: React.FC<TitlesSectionProps> = ({ titles, celebrityName }) => {
  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-4">
        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
          <Crown className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Titles & Prestigious Honors</h2>
          <p className="text-xs text-zinc-400">Official titles, state decorations, and global honors bestowed on {celebrityName}</p>
        </div>
      </div>

      <div className="space-y-3">
        {titles.map((title) => (
          <div
            key={title.id}
            className="p-4 bg-gradient-to-r from-zinc-950/90 to-zinc-950/50 rounded-xl border border-zinc-800/80 hover:border-amber-500/40 transition-all flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
              <Medal className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-serif font-bold text-base text-zinc-100 group-hover:text-amber-300 transition-colors">
                  {title.titleName}
                </h3>
                <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 w-fit">
                  Year Conferred: {title.yearWon}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium mt-1">
                <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Conferred by: <strong className="text-zinc-200">{title.conferredBy}</strong></span>
              </div>

              <p className="text-xs text-zinc-300 mt-2 leading-relaxed bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/60">
                {title.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {titles.length === 0 && (
        <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-zinc-800 text-zinc-500 text-sm">
          No official titles recorded for this profile.
        </div>
      )}
    </section>
  );
};
