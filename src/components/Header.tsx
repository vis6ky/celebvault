import React, { useState } from 'react';
import { Search, Sparkles, Heart, FileText, Star, X, Building2, Film, Music, Trophy, Globe, Loader2, ArrowRight } from 'lucide-react';
import { Celebrity } from '../types';
import { getSafeImageUrl, getMonogramFallback } from '../utils/imageUrl';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  celebrities: Celebrity[];
  selectedCelebrityId: string | null;
  onSelectCelebrity: (id: string) => void;
  onOpenDirectory: () => void;
  onSearchGlobalAI?: (query: string) => Promise<void>;
  isDiscovering?: boolean;
  favoritesCount: number;
  inquiriesCount: number;
  onOpenFavorites: () => void;
  onOpenInquiries: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  celebrities,
  selectedCelebrityId,
  onSelectCelebrity,
  onOpenDirectory,
  onSearchGlobalAI,
  isDiscovering = false,
  favoritesCount,
  inquiriesCount,
  onOpenFavorites,
  onOpenInquiries,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter celebrities for quick search dropdown
  const searchResults = searchQuery.trim()
    ? celebrities.filter(
        (c) =>
          c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.knownAs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.occupation && c.occupation.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase()))) ||
          (c.films && c.films.some((f) => f.movieName.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : [];

  const industries = [
    'All',
    'Indian Cinema',
    'Indian Sports',
    'Hollywood',
    'Music',
    'Sports',
    'Global Cinema',
    'European Cinema',
    'K-Pop & Asian Pop',
    'Latin Music',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if there is an exact or top match
    if (searchResults.length > 0) {
      onSelectCelebrity(searchResults[0].id);
      setSearchQuery('');
      setIsSearchFocused(false);
      return;
    }

    // Otherwise trigger global AI discovery
    if (onSearchGlobalAI) {
      onSearchGlobalAI(searchQuery.trim());
      setIsSearchFocused(false);
    } else {
      onOpenDirectory();
    }
  };

  const handleIndustryClick = (ind: string) => {
    setSelectedIndustry(ind);
    // If currently on a profile detail view, return to Directory to display the filtered public figures
    if (selectedCelebrityId) {
      onOpenDirectory();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={onOpenDirectory}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            id="header-logo-button"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-zinc-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Star className="w-5 h-5 fill-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  CELEB<span className="text-amber-400">VAULT</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PRO
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">Global Celebrity Profiles & Booking Agency</p>
            </div>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="relative flex-1 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                placeholder="Search celebrities, films, awards, or type any name worldwide..."
                className="w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 rounded-xl pl-10 pr-10 py-2.5 border border-zinc-800 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
                id="celebrity-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-0.5"
                  id="search-clear-button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Quick search dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-zinc-800/50">
                <div className="p-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-950/70 flex items-center justify-between">
                  <span>Matching Profiles ({searchResults.length})</span>
                  <span className="text-[10px] font-mono text-zinc-500">Press Enter to select or discover</span>
                </div>

                {searchResults.slice(0, 5).map((celeb) => (
                  <button
                    key={celeb.id}
                    type="button"
                    onClick={() => {
                      onSelectCelebrity(celeb.id);
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left p-3 hover:bg-zinc-800/80 flex items-center gap-3 transition-colors group"
                  >
                    <img
                      src={getSafeImageUrl(celeb.avatarPhoto)}
                      alt={celeb.knownAs}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30 group-hover:border-amber-400"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getMonogramFallback(celeb.knownAs, celeb.category);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-zinc-100 group-hover:text-amber-400 truncate">
                          {celeb.knownAs}
                        </span>
                        <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                          {celeb.industry}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {(celeb.occupation || []).join(' • ')}
                      </p>
                    </div>
                  </button>
                ))}

                {/* Global AI Discovery Option inside dropdown */}
                {onSearchGlobalAI && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchGlobalAI(searchQuery.trim());
                      setIsSearchFocused(false);
                    }}
                    disabled={isDiscovering}
                    className="w-full text-left p-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 flex items-center justify-between transition-colors border-t border-amber-500/20 group"
                  >
                    <div className="flex items-center gap-2.5">
                      {isDiscovering ? (
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      )}
                      <span className="text-xs font-semibold">
                        Discover & verify <strong>"{searchQuery}"</strong> via Global Archives...
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenDirectory}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                !selectedCelebrityId
                  ? 'bg-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
              id="directory-nav-button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Directory</span>
            </button>

            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-400 rounded-xl transition-all"
              title="Saved Favorites"
              id="favorites-nav-button"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenInquiries}
              className="relative p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-400 rounded-xl transition-all"
              title="Submitted Inquiries & Booking History"
              id="inquiries-nav-button"
            >
              <FileText className="w-4 h-4" />
              {inquiriesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                  {inquiriesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Industry Pill Filter Ribbon */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-mono mr-1 shrink-0">Filter:</span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => handleIndustryClick(ind)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all border ${
                selectedIndustry === ind
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
