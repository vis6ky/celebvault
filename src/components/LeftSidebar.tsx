import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Heart, Award, Send, 
  CheckCircle2, Sparkles, DollarSign, Ruler, Clock, 
  Globe, Instagram, Twitter, Facebook, ExternalLink, Maximize2, ShieldCheck, UserCheck
} from 'lucide-react';
import { Celebrity } from '../types';

interface LeftSidebarProps {
  celebrity: Celebrity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenBookingForm: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  celebrity,
  isFavorite,
  onToggleFavorite,
  onOpenBookingForm,
}) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const { birthDetails, familyDetails } = celebrity;

  return (
    <aside className="w-full lg:w-96 shrink-0 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-6 text-zinc-100 self-start sticky top-24">
      {/* 1. Best View Photo Card */}
      <div className="relative group rounded-xl overflow-hidden border border-zinc-700/60 shadow-lg bg-zinc-950">
        <img
          src={celebrity.bestViewPhoto}
          alt={`${celebrity.knownAs} Best View Photo`}
          className="w-full h-[380px] object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => setIsPhotoExpanded(true)}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80`;
          }}
          id="best-view-photo-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

        {/* Floating Controls on Photo */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setIsPhotoExpanded(true)}
            className="p-2 bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 rounded-lg backdrop-blur border border-zinc-700/80 shadow transition-all hover:scale-105"
            title="Expand High-Res Photo"
            id="expand-photo-button"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-lg backdrop-blur border transition-all hover:scale-105 shadow ${
              isFavorite
                ? 'bg-rose-500/90 text-white border-rose-400'
                : 'bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 border-zinc-700/80'
            }`}
            title={isFavorite ? 'Remove from Saved' : 'Save Celebrity'}
            id="toggle-favorite-button"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Overlay Info at bottom of Photo */}
        <div className="absolute bottom-3 left-3 right-3 p-3 bg-zinc-950/80 backdrop-blur-md rounded-xl border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider text-amber-400 uppercase font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Best View Portrait
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                celebrity.isAvailableForHiring
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              {celebrity.isAvailableForHiring ? '● Available for Hiring' : '○ Booking Restricted'}
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-white mt-1 flex items-center gap-1.5">
            {celebrity.knownAs}
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          </h2>
          <p className="text-xs text-zinc-400 line-clamp-1">{celebrity.shortTagline}</p>
        </div>
      </div>

      {/* Booking / Hire CTA Button */}
      <button
        onClick={onOpenBookingForm}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-zinc-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
        id="hire-collaborate-sidebar-button"
      >
        <Send className="w-4 h-4" />
        Hire, Invite or Collaborate
      </button>

      {/* Quick Overview Stats Grid */}
      <div className="grid grid-cols-3 gap-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 text-center">
        <div className="p-1.5">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Active Years</span>
          <span className="text-xs font-bold text-amber-400">{celebrity.activeYears}</span>
        </div>
        <div className="p-1.5 border-x border-zinc-800">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Est. Net Worth</span>
          <span className="text-xs font-bold text-emerald-400">{celebrity.netWorth}</span>
        </div>
        <div className="p-1.5">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Height</span>
          <span className="text-xs font-bold text-zinc-200">{celebrity.height}</span>
        </div>
      </div>

      {/* 2. Birth Details Section */}
      <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          Birth Details
        </h3>

        <div className="space-y-2.5 text-xs text-zinc-300">
          <div className="flex items-start justify-between gap-2">
            <span className="text-zinc-500 shrink-0">Full Legal Name</span>
            <span className="font-semibold text-zinc-100 text-right">{birthDetails.dateOfBirth ? celebrity.fullName : 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-zinc-500">Date of Birth</span>
            <span className="font-medium text-zinc-100">{birthDetails.dateOfBirth}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-zinc-500">Age</span>
            <span className="font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {birthDetails.age} Years
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-zinc-500 shrink-0">Place of Birth</span>
            <span className="font-medium text-zinc-200 text-right flex items-center gap-1 justify-end">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              {birthDetails.placeOfBirth}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-zinc-500">Zodiac Sign</span>
            <span className="font-medium text-zinc-300">{birthDetails.zodiacSign}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-zinc-500">Nationality</span>
            <span className="font-medium text-zinc-200">{birthDetails.nationality}</span>
          </div>
        </div>
      </div>

      {/* 3. Family Details Section */}
      <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
          <Users className="w-4 h-4 text-amber-400" />
          Family Details
        </h3>

        <div className="space-y-3 text-xs">
          {/* Parents */}
          <div>
            <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-1">Parents</span>
            <ul className="space-y-1 pl-2 border-l-2 border-amber-500/30 text-zinc-200">
              {familyDetails.parents.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Spouse / Partner */}
          {familyDetails.spouseOrPartner && (
            <div>
              <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-1">Spouse / Partner</span>
              <p className="text-zinc-200 font-medium pl-2 border-l-2 border-rose-500/30">{familyDetails.spouseOrPartner}</p>
            </div>
          )}

          {/* Children */}
          {familyDetails.children && familyDetails.children.length > 0 && (
            <div>
              <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-1">Children</span>
              <ul className="space-y-1 pl-2 border-l-2 border-emerald-500/30 text-zinc-200">
                {familyDetails.children.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Siblings */}
          {familyDetails.siblings && familyDetails.siblings.length > 0 && (
            <div>
              <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-1">Siblings</span>
              <p className="text-zinc-300 text-xs pl-2 border-l-2 border-zinc-700">
                {familyDetails.siblings.join(', ')}
              </p>
            </div>
          )}

          {/* Notable Relatives / Ancestry */}
          {familyDetails.notableRelatives && familyDetails.notableRelatives.length > 0 && (
            <div>
              <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-1">Heritage & Relatives</span>
              <p className="text-zinc-400 text-xs italic">
                {familyDetails.notableRelatives.join('; ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80 space-y-2">
        <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-2">Official Social Handles</span>
        <div className="flex flex-wrap gap-2">
          {celebrity.socialLinks.instagram && (
            <a
              href={celebrity.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-rose-400 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
          )}
          {celebrity.socialLinks.x && (
            <a
              href={celebrity.socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-sky-400 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" /> X
            </a>
          )}
          {celebrity.socialLinks.facebook && (
            <a
              href={celebrity.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-blue-400 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
          )}
          {celebrity.socialLinks.website && (
            <a
              href={celebrity.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 rounded-lg border border-zinc-800 flex items-center gap-1.5 text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Website
            </a>
          )}
        </div>
      </div>

      {/* High-Res Photo Modal */}
      {isPhotoExpanded && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setIsPhotoExpanded(false)}
              className="absolute top-4 right-4 p-3 bg-zinc-900 text-white rounded-full hover:bg-amber-500 hover:text-zinc-950 transition-colors z-10"
              id="close-expanded-photo"
            >
              ✕
            </button>
            <img
              src={celebrity.bestViewPhoto}
              alt={celebrity.knownAs}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-zinc-800"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold font-serif text-white">{celebrity.knownAs}</h3>
              <p className="text-sm text-zinc-400">{celebrity.shortTagline}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
