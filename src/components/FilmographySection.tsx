import React, { useState } from 'react';
import {
  Film,
  Calendar,
  Clapperboard,
  Star,
  DollarSign,
  Search,
  Maximize2,
  X,
  Sparkles,
  Info,
} from 'lucide-react';
import { Film as FilmType } from '../types';
import { getSafeImageUrl } from '../utils/imageUrl';

interface FilmographySectionProps {
  films: FilmType[];
  celebrityName: string;
}

export const FilmographySection: React.FC<FilmographySectionProps> = ({ films = [], celebrityName }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'rating-desc' | 'name-asc'>('year-desc');
  const [selectedFilm, setSelectedFilm] = useState<FilmType | null>(null);

  const safeFilms = Array.isArray(films) ? films : [];

  // Extract unique genres
  const allGenres = ['All', ...Array.from(new Set(
    safeFilms.flatMap((f) => (Array.isArray(f.genre) ? f.genre : [f.genre || ''])).filter(Boolean)
  ))].slice(0, 8);

  // Filter and sort films
  const filteredFilms = safeFilms
    .filter((f) => {
      const q = filterQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (f.movieName && f.movieName.toLowerCase().includes(q)) ||
        (f.role && f.role.toLowerCase().includes(q)) ||
        (f.director && f.director.toLowerCase().includes(q)) ||
        (Array.isArray(f.genre) && f.genre.some((g) => g.toLowerCase().includes(q)));

      const matchesGenre =
        selectedGenre === 'All' ||
        (Array.isArray(f.genre) && f.genre.includes(selectedGenre));

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'year-desc') return (b.year || 0) - (a.year || 0);
      if (sortBy === 'year-asc') return (a.year || 0) - (b.year || 0);
      if (sortBy === 'rating-desc') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      if (sortBy === 'name-asc') return (a.movieName || '').localeCompare(b.movieName || '');
      return 0;
    });

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Clapperboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Filmography & Major Works</h2>
            <p className="text-xs text-zinc-400">
              Complete catalog of feature films, awards works & key projects for {celebrityName} ({safeFilms.length} Total)
            </p>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search film, director, genre..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 pl-8 pr-3 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500/60 w-36 sm:w-48"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-950 text-xs text-zinc-300 px-2.5 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500/60"
          >
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="name-asc">Title A–Z</option>
          </select>
        </div>
      </div>

      {/* Genre Filter Pill Ribbon */}
      {allGenres.length > 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-zinc-500 text-[11px] font-mono uppercase mr-1 shrink-0">Genre:</span>
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                selectedGenre === genre
                  ? 'bg-amber-500 text-zinc-950 font-bold border-amber-500 shadow-sm'
                  : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Films Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            onClick={() => setSelectedFilm(film)}
            className="group bg-zinc-950/70 rounded-xl border border-zinc-800/80 hover:border-amber-500/40 p-4 transition-all duration-200 flex gap-4 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer relative"
          >
            {/* Film Poster / Image */}
            <div className="relative shrink-0 w-28 h-40 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 shadow-md">
              <img
                src={getSafeImageUrl(film.posterUrl)}
                alt={film.movieName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // If image fails, replace with a clean fallback pattern
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const fallback = target.parentElement.querySelector('.poster-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />

              {/* Fallback stylized artwork if poster is unavailable */}
              <div className="poster-fallback hidden absolute inset-0 bg-gradient-to-b from-amber-950/40 via-zinc-900 to-zinc-950 p-2.5 flex-col justify-between text-center items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mt-2">
                  <Film className="w-4 h-4" />
                </div>
                <div className="my-auto">
                  <span className="font-serif font-bold text-xs text-amber-200 line-clamp-2 leading-tight">
                    {film.movieName}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">Official Entry</span>
              </div>

              {/* Year badge */}
              <div className="absolute top-1.5 left-1.5 bg-zinc-950/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono font-bold text-amber-400 border border-zinc-800">
                {film.year}
              </div>

              <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/90 p-1 rounded-md text-amber-400">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>

            {/* Film Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-base text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {film.movieName}
                  </h3>
                  {film.rating && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {film.rating}
                    </span>
                  )}
                </div>

                {/* Release Date Highlight */}
                <div className="flex items-center gap-1.5 text-xs text-amber-300/90 mt-1 font-medium bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Release Date: {film.releaseDate}</span>
                </div>

                {/* Character Role */}
                <p className="text-xs text-zinc-300 mt-2">
                  <span className="text-zinc-500 font-mono">Role:</span>{' '}
                  <span className="font-semibold text-amber-200">{film.role}</span>
                </p>

                {/* Director */}
                <p className="text-xs text-zinc-400 mt-0.5">
                  <span className="text-zinc-500 font-mono">Director:</span> {film.director}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {film.genre.map((g) => (
                    <span key={g} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box Office earnings footer */}
              {film.boxOffice && (
                <div className="text-[11px] text-zinc-400 mt-2 pt-2 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-zinc-500">Box Office / Status:</span>
                  <span className="font-semibold text-emerald-400">{film.boxOffice}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredFilms.length === 0 && (
        <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-zinc-800 text-zinc-500 text-sm">
          No films match your search term "{filterQuery}".
        </div>
      )}

      {/* Film Poster & Details Modal */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="w-32 h-44 shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-700 shadow-md">
                <img
                  src={getSafeImageUrl(selectedFilm.posterUrl)}
                  alt={selectedFilm.movieName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {selectedFilm.year} Release
                </span>
                <h3 className="text-lg font-serif font-bold text-white">{selectedFilm.movieName}</h3>
                <p className="text-xs text-zinc-300">
                  <span className="text-zinc-500">Character Role: </span>
                  <span className="font-semibold text-amber-300">{selectedFilm.role}</span>
                </p>
                <p className="text-xs text-zinc-400">
                  <span className="text-zinc-500">Director: </span>
                  {selectedFilm.director}
                </p>
                <p className="text-xs text-emerald-400 font-semibold">
                  <span className="text-zinc-500 font-normal">Box Office: </span>
                  {selectedFilm.boxOffice}
                </p>
              </div>
            </div>

            {selectedFilm.synopsis && (
              <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-400" /> Synopsis & Plot Overview
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{selectedFilm.synopsis}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedFilm.genre.map((g) => (
                <span key={g} className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
