import React, { useState } from 'react';
import { Film, Calendar, Clapperboard, Star, DollarSign, Search, ArrowUpDown } from 'lucide-react';
import { Film as FilmType } from '../types';

interface FilmographySectionProps {
  films: FilmType[];
  celebrityName: string;
}

export const FilmographySection: React.FC<FilmographySectionProps> = ({ films, celebrityName }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'rating-desc'>('year-desc');

  // Filter and sort films
  const filteredFilms = films
    .filter(
      (f) =>
        f.movieName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.director.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.genre.some((g) => g.toLowerCase().includes(filterQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'rating-desc') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
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
            <p className="text-xs text-zinc-400">Complete list of movies starring {celebrityName} with release dates</p>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search films or role..."
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
          </select>
        </div>
      </div>

      {/* Films Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group bg-zinc-950/70 rounded-xl border border-zinc-800/80 hover:border-amber-500/40 p-4 transition-all duration-200 flex gap-4 hover:shadow-lg hover:shadow-amber-500/5"
          >
            {/* Film Poster / Image */}
            <div className="relative shrink-0 w-24 h-36 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
              <img
                src={film.posterUrl}
                alt={film.movieName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80`;
                }}
              />
              <div className="absolute top-1 left-1 bg-zinc-950/80 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-amber-400 border border-zinc-800">
                {film.year}
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
                  <span className="text-zinc-500">Box Office:</span>
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
    </section>
  );
};
