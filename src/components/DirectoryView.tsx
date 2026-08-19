import React, { useState } from 'react';
import { Star, Sparkles, Trophy, Clapperboard, Heart, Send, Search, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Globe, Bot } from 'lucide-react';
import { Celebrity } from '../types';

interface DirectoryViewProps {
  celebrities: Celebrity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCelebrity: (id: string) => void;
  onOpenBookingForm: (celebrity: Celebrity) => void;
  onSearchGlobalAI: (queryName: string) => Promise<void>;
  isGeneratingAI: boolean;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  celebrities,
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  favorites,
  onToggleFavorite,
  onSelectCelebrity,
  onOpenBookingForm,
  onSearchGlobalAI,
  isGeneratingAI,
}) => {
  const [aiSearchInput, setAiSearchInput] = useState('');

  // Filter celebrities
  const filtered = celebrities.filter((celeb) => {
    const matchesIndustry =
      selectedIndustry === 'All' || celeb.industry === selectedIndustry;

    const matchesSearch =
      !searchQuery.trim() ||
      celeb.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      celeb.knownAs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      celeb.occupation.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
      celeb.films.some((f) => f.movieName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      celeb.awards.some((a) => a.awardName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesIndustry && matchesSearch;
  });

  const popularQuickSearches = [
    'Shah Rukh Khan',
    'Virat Kohli',
    'Amitabh Bachchan',
    'Deepika Padukone',
    'Prabhas',
    'Rajinikanth',
    'Alia Bhatt',
    'Akshay Kumar',
    'Ranbir Kapoor',
    'A.R. Rahman',
    'Diljit Dosanjh',
    'Salman Khan',
    'MS Dhoni',
    'Pedro Pascal',
    'Taylor Swift',
  ];

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiSearchInput.trim()) {
      onSearchGlobalAI(aiSearchInput.trim());
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Directory Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/80 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Official Roster & Global Talent Index
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Explore Iconic Celebrities, <br />
            <span className="text-amber-400">Unique Profiles & Global Search</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            Browse complete, unique profiles featuring best view portrait photos, birth and family heritage, filmographies with release dates, awards won, titles conferred, social posts, and direct agency booking forms.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{celebrities.length} Loaded Profiles</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>10,000+ AI Global Index</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Agency Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global AI Search Box Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Bot className="w-4 h-4" /> Global Celebrity Instant Search Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Search ANY Celebrity Across India & Worldwide
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Type any Indian or international celebrity name to fetch or generate a complete, unique profile with birth details, family heritage, filmography, awards, and booking options.
            </p>
          </div>
        </div>

        <form onSubmit={handleGlobalSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              value={aiSearchInput}
              onChange={(e) => setAiSearchInput(e.target.value)}
              placeholder="e.g. Amitabh Bachchan, Deepika Padukone, Virat Kohli, Allu Arjun, Rajinikanth..."
              className="w-full bg-zinc-950 text-sm text-zinc-100 placeholder-zinc-500 rounded-xl pl-11 pr-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-500 font-medium"
              id="global-ai-search-input"
            />
          </div>
          <button
            type="submit"
            disabled={isGeneratingAI || !aiSearchInput.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
            id="global-ai-search-button"
          >
            {isGeneratingAI ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Searching & Generating Profile...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Fetch Unique Profile</span>
              </>
            )}
          </button>
        </form>

        {/* Popular Quick-Click Chips */}
        <div className="pt-2">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
            Popular Global & Indian Icons (Click to load instantly):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularQuickSearches.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setAiSearchInput(name);
                  onSearchGlobalAI(name);
                }}
                disabled={isGeneratingAI}
                className="text-xs bg-zinc-950 hover:bg-amber-500/10 text-zinc-300 hover:text-amber-400 px-3 py-1 rounded-lg border border-zinc-800/80 hover:border-amber-500/40 transition-all font-medium disabled:opacity-50"
              >
                + {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Grid Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">
            Celebrity Roster ({filtered.length})
          </h2>
          <p className="text-xs text-zinc-400">
            {selectedIndustry !== 'All' ? `Filtered by ${selectedIndustry}` : 'Showing all global and Indian celebrity icons'}
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((celeb) => {
          const isFav = favorites.includes(celeb.id);
          const awardsWon = celeb.awards.filter((a) => a.status === 'Won').length;

          return (
            <div
              key={celeb.id}
              className="group bg-zinc-900/90 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Card Photo Header */}
              <div
                onClick={() => onSelectCelebrity(celeb.id)}
                className="relative h-72 overflow-hidden bg-zinc-950 cursor-pointer"
              >
                <img
                  src={celeb.bestViewPhoto}
                  alt={celeb.knownAs}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized high quality portrait if URL fails
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Industry Badge */}
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 border border-zinc-800">
                  {celeb.industry}
                </div>

                {/* Favorite Heart button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(celeb.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                    isFav
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-zinc-950/80 text-zinc-300 hover:text-white border-zinc-800'
                  }`}
                  title="Bookmark"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                </button>

                {/* Overlay Name & Tagline */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                      {celeb.knownAs}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">{celeb.shortTagline}</p>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Occupations */}
                  <div className="flex flex-wrap gap-1.5">
                    {celeb.occupation.map((occ) => (
                      <span
                        key={occ}
                        className="text-[11px] bg-zinc-950 text-zinc-300 px-2.5 py-0.5 rounded-md border border-zinc-800"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>

                  {/* Key Highlights (Films & Awards) */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Films / Projects</span>
                      <span className="font-semibold text-zinc-200 flex items-center gap-1">
                        <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                        {celeb.films.length} Works
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Awards Won</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        {awardsWon} Wins
                      </span>
                    </div>
                  </div>

                  {/* Birth Quick Note */}
                  <div className="text-xs text-zinc-400">
                    <span className="text-zinc-500">Born:</span> {celeb.birthDetails.dateOfBirth} ({celeb.birthDetails.age} yrs)
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCelebrity(celeb.id)}
                    className="flex-1 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    id={`view-profile-${celeb.id}`}
                  >
                    View Unique Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenBookingForm(celeb)}
                    className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
                    title="Hire / Invite / Collaborate"
                    id={`hire-celebrity-${celeb.id}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Hire
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4">
          <Search className="w-10 h-10 text-amber-500/80 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Direct Match in Active List</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Searching for <span className="text-amber-400 font-bold">"{searchQuery}"</span>? Click below to instantly query our 10,000+ Global Celebrity AI Database to generate a complete profile with filmography, awards, family details, and booking options.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {searchQuery.trim() && (
              <button
                onClick={() => onSearchGlobalAI(searchQuery.trim())}
                disabled={isGeneratingAI}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Generating "{searchQuery}"...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Search Global Index for "{searchQuery}"</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('All');
              }}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
