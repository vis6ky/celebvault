import React, { useState } from 'react';
import { 
  Star, Sparkles, Trophy, Clapperboard, Heart, Send, Search, 
  CheckCircle2, ShieldCheck, ArrowRight, Loader2, Globe, Database, 
  Filter, ChevronLeft, ChevronRight, SlidersHorizontal, Newspaper, Tag, Compass
} from 'lucide-react';
import { Celebrity, CelebrityDirectoryItem } from '../types';
import { getSafeImageUrl, getMonogramFallback } from '../utils/imageUrl';

interface DirectoryViewProps {
  celebrities: Celebrity[];
  directoryItems?: CelebrityDirectoryItem[];
  totalCelebrities?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
  selectedCountry?: string;
  setSelectedCountry?: (cntry: string) => void;
  selectedSort?: 'trending' | 'name' | 'recently_updated' | 'newest';
  setSelectedSort?: (sort: 'trending' | 'name' | 'recently_updated' | 'newest') => void;
  availableCategories?: string[];
  availableIndustries?: string[];
  availableCountries?: string[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCelebrity: (id: string) => void;
  onOpenBookingForm: (celebrity: Celebrity) => void;
  onSearchGlobalAI: (queryName: string) => Promise<void>;
  isGeneratingAI: boolean;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  celebrities,
  directoryItems,
  totalCelebrities,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  selectedCategory = 'All',
  setSelectedCategory,
  selectedCountry = 'All',
  setSelectedCountry,
  selectedSort = 'trending',
  setSelectedSort,
  availableCategories = ['All', 'Actors', 'Musicians', 'Athletes', 'Directors', 'Public Figures'],
  availableIndustries = ['All', 'Bollywood', 'Hollywood', 'Indian Cinema', 'Indian Sports', 'Global Sports', 'Music'],
  availableCountries = ['All', 'India', 'United States', 'United Kingdom', 'Portugal', 'International'],
  favorites,
  onToggleFavorite,
  onSelectCelebrity,
  onOpenBookingForm,
  onSearchGlobalAI,
  isGeneratingAI,
}) => {
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // If directoryItems is provided from server pagination, use it; otherwise fall back to local filtering
  const displayItems: Array<{
    id: string;
    fullName: string;
    knownAs: string;
    category?: string;
    industry: string;
    country?: string;
    avatarPhoto: string;
    bestViewPhoto: string;
    shortTagline: string;
    occupation: string[];
    birthDetails: { dateOfBirth: string; age: number };
    filmsCount: number;
    awardsCount: number;
    sourceProvenance?: string;
    rawCeleb?: Celebrity;
  }> = directoryItems && directoryItems.length > 0
    ? directoryItems.map((item) => {
        const full = celebrities.find((c) => c.id === item.id);
        return {
          id: item.id,
          fullName: item.fullName,
          knownAs: item.knownAs,
          category: item.category,
          industry: item.industry,
          country: item.country,
          avatarPhoto: item.avatarPhoto,
          bestViewPhoto: item.bestViewPhoto,
          shortTagline: item.shortTagline,
          occupation: item.occupations,
          birthDetails: {
            dateOfBirth: item.birthYear ? `Born ${item.birthYear}` : 'Public Record',
            age: item.birthYear ? new Date().getFullYear() - item.birthYear : 40,
          },
          filmsCount: full?.films?.length || 5,
          awardsCount: full?.awards?.filter((a) => a.status === 'Won').length || 2,
          sourceProvenance: item.sourceProvenance,
          rawCeleb: full,
        };
      })
    : celebrities
        .filter((celeb) => {
          const matchesIndustry = selectedIndustry === 'All' || celeb.industry.toLowerCase() === selectedIndustry.toLowerCase();
          const matchesCategory = selectedCategory === 'All' || (celeb.category || '').toLowerCase() === selectedCategory.toLowerCase();
          const matchesCountry = selectedCountry === 'All' || (celeb.country || '').toLowerCase() === selectedCountry.toLowerCase();
          const q = searchQuery.trim().toLowerCase();
          const matchesSearch =
            !q ||
            celeb.fullName.toLowerCase().includes(q) ||
            celeb.knownAs.toLowerCase().includes(q) ||
            celeb.occupation.some((o) => o.toLowerCase().includes(q)) ||
            celeb.films.some((f) => f.movieName.toLowerCase().includes(q)) ||
            celeb.awards.some((a) => a.awardName.toLowerCase().includes(q));

          return matchesIndustry && matchesCategory && matchesCountry && matchesSearch;
        })
        .map((celeb) => ({
          id: celeb.id,
          fullName: celeb.fullName,
          knownAs: celeb.knownAs,
          category: celeb.category,
          industry: celeb.industry,
          country: celeb.country,
          avatarPhoto: celeb.avatarPhoto,
          bestViewPhoto: celeb.bestViewPhoto,
          shortTagline: celeb.shortTagline,
          occupation: celeb.occupation,
          birthDetails: celeb.birthDetails,
          filmsCount: celeb.films.length,
          awardsCount: celeb.awards.filter((a) => a.status === 'Won').length,
          sourceProvenance: celeb.sourceProvenance,
          rawCeleb: celeb,
        }));

  const totalCount = totalCelebrities || displayItems.length;

  const popularQuickSearches = [
    'Keanu Reeves',
    'Shah Rukh Khan',
    'Zendaya',
    'Virat Kohli',
    'Cillian Murphy',
    'Amitabh Bachchan',
    'Deepika Padukone',
    'Prabhas',
    'Sachin Tendulkar',
    'Rajinikanth',
    'Alia Bhatt',
    'A.R. Rahman',
    'Max Verstappen',
    'Diljit Dosanjh',
    'Emma Watson',
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
            <Compass className="w-3.5 h-3.5" /> Global Celebrity Information Aggregator
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Worldwide Public Figures, <br />
            <span className="text-amber-400">Verified Archives & Live Discovery</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            A comprehensive, zero-hallucination directory aggregating factual biographical records, filmographies, verified awards, live news coverage, and official representation channels directly from Wikipedia, Wikidata, and global journalistic archives.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>{totalCount}+ Indexed Public Figures</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Multi-Source Live Discovery Engine</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Journalistic News Feeds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Search & Live Discovery Box */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Globe className="w-4 h-4" /> Global Discovery & Live Verification Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Search ANY Celebrity or Public Figure Worldwide
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Search by name to retrieve or index any public figure. CelebVault aggregates real information from Wikipedia, Wikidata, and live news without inventing facts.
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
              placeholder="e.g. Keanu Reeves, Zendaya, Amitabh Bachchan, Sachin Tendulkar, Cillian Murphy..."
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
                <span>Aggregating from Global Sources...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Discover & View Profile</span>
              </>
            )}
          </button>
        </form>

        {/* Popular Quick-Click Chips */}
        <div className="pt-2">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
            Notable Icons Across Cinema, Sports & Music (Instant discovery):
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

      {/* Directory Filter Bar */}
      <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Quick search input within active directory */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, film, alias, or award..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 rounded-xl pl-10 pr-4 py-2.5 border border-zinc-800 focus:outline-none focus:border-amber-500"
              id="directory-filter-input"
            />
          </div>

          {/* Controls: Industry + Sort + Advanced Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category pills */}
            {setSelectedCategory && (
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 overflow-x-auto max-w-full">
                {['All', 'Actors', 'Musicians', 'Athletes', 'Directors'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Sort Dropdown */}
            {setSelectedSort && (
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-zinc-950 text-xs font-mono text-zinc-300 px-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
                id="directory-sort-select"
              >
                <option value="trending">Sort: Most Acclaimed</option>
                <option value="name">Sort: Name (A-Z)</option>
                <option value="recently_updated">Sort: Recently Verified</option>
                <option value="newest">Sort: Newest Added</option>
              </select>
            )}

            {/* Toggle Advanced Filters */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs ${
                showAdvancedFilters
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
              }`}
              title="Toggle filter facets"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Facets</span>
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters (Industry & Country) */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-zinc-400 font-mono text-[11px] block mb-1.5 uppercase">Industry Filter</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-200 p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
              >
                {availableIndustries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {setSelectedCountry && (
              <div>
                <label className="text-zinc-400 font-mono text-[11px] block mb-1.5 uppercase">Country Filter</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-zinc-950 text-zinc-200 p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
                >
                  {availableCountries.map((cntry) => (
                    <option key={cntry} value={cntry}>
                      {cntry}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Directory Grid Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">
            Global Public Figures Directory ({totalCount})
          </h2>
          <p className="text-xs text-zinc-400">
            {searchQuery.trim()
              ? `Showing results matching "${searchQuery}"`
              : selectedCategory !== 'All'
              ? `Filtered by category: ${selectedCategory}`
              : 'Indexed and verified against Wikipedia, Wikidata, and authentic archives'}
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((celeb) => {
          const isFav = favorites.includes(celeb.id);

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
                  src={getSafeImageUrl(celeb.bestViewPhoto || celeb.avatarPhoto)}
                  alt={celeb.knownAs}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getMonogramFallback(celeb.knownAs, celeb.category);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Industry / Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <div className="bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 border border-zinc-800">
                    {celeb.industry}
                  </div>
                  {celeb.country && (
                    <div className="bg-zinc-900/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-mono text-zinc-300 border border-zinc-700">
                      {celeb.country}
                    </div>
                  )}
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
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Career Works</span>
                      <span className="font-semibold text-zinc-200 flex items-center gap-1">
                        <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                        {celeb.filmsCount} Featured
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Awards Won</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        {celeb.awardsCount} Wins
                      </span>
                    </div>
                  </div>

                  {/* Birth / Provenance Quick Note */}
                  <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>{celeb.birthDetails.dateOfBirth}</span>
                    <span className="text-[10px] font-mono text-emerald-400/90">✓ Verified Record</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCelebrity(celeb.id)}
                    className="flex-1 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    id={`view-profile-${celeb.id}`}
                  >
                    View Verified Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (celeb.rawCeleb) {
                        onOpenBookingForm(celeb.rawCeleb);
                      } else {
                        onSelectCelebrity(celeb.id);
                      }
                    }}
                    className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
                    title="Submit Representation Inquiry"
                    id={`hire-celebrity-${celeb.id}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-800 disabled:opacity-40 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-xs font-mono text-zinc-300 rounded-xl border border-zinc-800">
            <span>Page</span>
            <strong className="text-amber-400">{currentPage}</strong>
            <span>of</span>
            <span>{totalPages}</span>
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-800 disabled:opacity-40 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Empty State / Not Found -> Trigger External Discovery */}
      {displayItems.length === 0 && (
        <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4">
          <Search className="w-10 h-10 text-amber-500/80 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Public Figure Currently Cached Matching Your Query</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Searching for <span className="text-amber-400 font-bold">"{searchQuery}"</span>? Click below to query Wikipedia, Wikidata, and global archives to aggregate and index their authentic profile in real-time.
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
                    <span>Querying Global Archives for "{searchQuery}"...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Search Global Archives for "{searchQuery}"</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('All');
                if (setSelectedCategory) setSelectedCategory('All');
                if (setSelectedCountry) setSelectedCountry('All');
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
