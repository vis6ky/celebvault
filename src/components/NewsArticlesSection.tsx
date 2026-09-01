import React, { useState } from 'react';
import { Newspaper, ExternalLink, RefreshCw, Calendar, Globe, Sparkles, AlertCircle } from 'lucide-react';
import { NewsArticle, Celebrity } from '../types';

interface NewsArticlesSectionProps {
  celebrity: Celebrity;
  onRefreshNews?: () => void;
  isRefreshing?: boolean;
}

export const NewsArticlesSection: React.FC<NewsArticlesSectionProps> = ({
  celebrity,
  onRefreshNews,
  isRefreshing = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const articles: NewsArticle[] = Array.isArray(celebrity.latestNews) ? celebrity.latestNews : [];

  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.source && a.source.toLowerCase().includes(q)) ||
      (a.snippet && a.snippet.toLowerCase().includes(q))
    );
  });

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-white">Latest News & Media Coverage</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Aggregated from reputable international news outlets and journalistic publications ({articles.length} Stories)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {articles.length > 0 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 px-3 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500/60 w-36 sm:w-44"
              />
            </div>
          )}

          {onRefreshNews && (
            <button
              onClick={onRefreshNews}
              disabled={isRefreshing}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 rounded-lg border border-zinc-700 transition-colors disabled:opacity-50"
              id="refresh-news-btn"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Retrieving Live Feeds...' : 'Refresh News Feed'}
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl bg-zinc-950/40 border border-dashed border-zinc-800 space-y-3">
          <Globe className="w-10 h-10 text-zinc-600 mx-auto" />
          <p className="text-sm text-zinc-400 font-medium">
            {searchQuery ? `No articles matching "${searchQuery}"` : 'No recent news articles aggregated yet.'}
          </p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Click 'Refresh News Feed' to fetch the latest breaking headlines and media mentions from global journalistic feeds.
          </p>
          {onRefreshNews && (
            <button
              onClick={onRefreshNews}
              disabled={isRefreshing}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Fetch Live News
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-950/90 transition-all duration-300 shadow-md"
            >
              <div className="space-y-3">
                {/* Meta info */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                    <Globe className="w-3 h-3" />
                    {article.source}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    {article.publishedAt}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Snippet */}
                {article.snippet && (
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {article.snippet}
                  </p>
                )}
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  Verified Journalistic Source
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 font-medium group/link"
                >
                  Read Story
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Provenance note */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/60 text-[11px] text-zinc-400">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          News articles are aggregated in real-time from open RSS media feeds. CelebVault Pro does not author or alter external journalistic reporting.
        </span>
      </div>
    </section>
  );
};
