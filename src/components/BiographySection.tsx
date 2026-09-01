import React from 'react';
import { BookOpen, Quote, HeartHandshake, Sparkles, Trophy, ExternalLink, ShieldCheck, Tag, Globe, CheckCircle2, Database, Key } from 'lucide-react';
import { Celebrity } from '../types';

interface BiographySectionProps {
  celebrity: Celebrity;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ celebrity }) => {
  const { biography, factsWithSources, externalIdentity } = celebrity;

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Full Biography & Verified Facts</h2>
            <p className="text-xs text-zinc-400">Aggregated from Wikidata, Wikipedia, and verified public databases</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {celebrity.country && (
            <span className="inline-flex items-center gap-1 text-xs font-mono bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg border border-zinc-700">
              <Globe className="w-3 h-3 text-amber-400" />
              {celebrity.country}
            </span>
          )}
          {celebrity.category && (
            <span className="inline-flex items-center gap-1 text-xs font-mono bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Tag className="w-3 h-3" />
              {celebrity.category}
            </span>
          )}
        </div>
      </div>

      {/* Aliases & Alternate Names */}
      {celebrity.aliases && celebrity.aliases.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/60">
          <span className="text-zinc-500 font-mono uppercase text-[10px] font-bold">Also Known As:</span>
          {celebrity.aliases.map((alias, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 rounded-md border border-zinc-800 font-medium"
            >
              {alias}
            </span>
          ))}
        </div>
      )}

      {/* Featured Famous Quote Card */}
      {biography.famousQuote && (
        <div className="relative bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 p-5 rounded-2xl border border-amber-500/30 overflow-hidden shadow-lg">
          <Quote className="absolute top-3 right-3 w-16 h-16 text-amber-500/10 pointer-events-none" />
          <p className="text-base font-serif italic text-amber-200/90 relative z-10">
            "{biography.famousQuote}"
          </p>
          <span className="mt-2 block text-xs font-mono font-semibold uppercase tracking-widest text-amber-400">
            — {celebrity.knownAs}
          </span>
        </div>
      )}

      {/* Fact-Level Source Transparency Grid */}
      {factsWithSources && factsWithSources.length > 0 && (
        <div className="space-y-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Fact-Level Source Evidence & Citations
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Zero Hallucination Protocol</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {factsWithSources.map((fact, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-mono">{fact.label}</div>
                <div className="font-semibold text-zinc-100 truncate">{fact.value}</div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1 border-t border-zinc-800/60">
                  <span className="truncate text-amber-400/80">Src: {fact.sourceName}</span>
                  {fact.sourceUrl && (
                    <a
                      href={fact.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-amber-400 shrink-0 ml-1"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Identifiers */}
      {externalIdentity && (externalIdentity.wikidataId || externalIdentity.imdbId || externalIdentity.wikipediaUrl) && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/80 text-xs font-mono">
          <span className="text-zinc-500 uppercase text-[10px] font-bold flex items-center gap-1">
            <Key className="w-3 h-3 text-amber-400" /> External IDs:
          </span>
          {externalIdentity.wikidataId && (
            <a
              href={`https://www.wikidata.org/wiki/${externalIdentity.wikidataId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800/80 hover:bg-zinc-800 text-amber-300 rounded border border-zinc-700"
            >
              <span>Wikidata: {externalIdentity.wikidataId}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {externalIdentity.imdbId && (
            <a
              href={`https://www.imdb.com/name/${externalIdentity.imdbId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded border border-amber-500/20"
            >
              <span>IMDb: {externalIdentity.imdbId}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {externalIdentity.wikipediaUrl && (
            <a
              href={externalIdentity.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
            >
              <span>Wikipedia Article</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400">Executive Summary</h3>
        <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/60">
          {biography.summary}
        </p>
      </div>

      {/* Early Life & Formative Years */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Early Life & Beginnings
        </h3>
        <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/30 p-4 rounded-xl border border-zinc-800/40">
          {biography.earlyLife}
        </p>
      </div>

      {/* Career Highlights */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" /> Rise to Stardom & Key Breakthroughs
        </h3>
        <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/30 p-4 rounded-xl border border-zinc-800/40">
          {biography.careerHighlights}
        </p>
      </div>

      {/* Philanthropy & Global Initiatives */}
      {biography.philanthropicWork && (
        <div className="space-y-2">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400" /> Philanthropy & Causes
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed bg-emerald-950/10 p-4 rounded-xl border border-emerald-500/20">
            {biography.philanthropicWork}
          </p>
        </div>
      )}

      {/* Data Source & Provenance */}
      <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Source Provenance:{' '}
            <strong className="text-zinc-200">
              {celebrity.sourceProvenance || 'Aggregated from Wikipedia & Wikidata Official Public Records'}
            </strong>
          </span>
        </div>

        {celebrity.sources && celebrity.sources.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {celebrity.sources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 underline font-mono text-[11px]"
              >
                <span>{src.title}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
