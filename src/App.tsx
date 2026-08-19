import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowLeft, ChevronLeft, ChevronRight, Send, 
  Heart, Bot, Trophy, Clapperboard, Crown, Instagram, BookOpen, Camera, ShieldCheck, Star
} from 'lucide-react';
import { CELEBRITIES } from './data/celebrities';
import { Celebrity, InquiryFormData } from './types';
import { getStoredFavorites, toggleStoredFavorite, getStoredInquiries } from './utils/storage';

import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { BiographySection } from './components/BiographySection';
import { FilmographySection } from './components/FilmographySection';
import { AwardsSection } from './components/AwardsSection';
import { TitlesSection } from './components/TitlesSection';
import { SocialPostsSection } from './components/SocialPostsSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ContactFormModal } from './components/ContactFormModal';
import { DirectoryView } from './components/DirectoryView';
import { InquiryHistoryModal } from './components/InquiryHistoryModal';
import { AIChatModal } from './components/AIChatModal';

export default function App() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(CELEBRITIES);
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string | null>('leonardo-dicaprio');
  const [activeTab, setActiveTab] = useState<'biography' | 'films' | 'awards' | 'titles' | 'social' | 'gallery'>('biography');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<InquiryFormData[]>([]);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetCelebrity, setBookingTargetCelebrity] = useState<Celebrity | null>(null);
  const [isInquiryHistoryOpen, setIsInquiryHistoryOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Initialize storage & fetch server celebrities
  useEffect(() => {
    setFavorites(getStoredFavorites());
    setInquiries(getStoredInquiries());

    fetch('/api/celebrities')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch backend store');
      })
      .then((data: Celebrity[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setCelebrities(data);
        }
      })
      .catch((err) => console.log('Using static celebrities fallback'));

    // Check hash for deep link
    const hash = window.location.hash;
    if (hash.startsWith('#profile/')) {
      const id = hash.replace('#profile/', '');
      setSelectedCelebrityId(id);
    }
  }, []);

  const handleSearchGlobalAI = async (queryName: string) => {
    if (!queryName || !queryName.trim()) return;

    // Check if already in local state
    const clean = queryName.trim().toLowerCase();
    const existing = celebrities.find(
      (c) =>
        c.fullName.toLowerCase().includes(clean) ||
        c.knownAs.toLowerCase().includes(clean) ||
        c.id.toLowerCase() === clean.replace(/\s+/g, '-')
    );

    if (existing) {
      handleSelectCelebrity(existing.id);
      setSearchQuery('');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/celebrities/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryName.trim() }),
      });

      if (!res.ok) {
        throw new Error('Server generation failed');
      }

      const data = await res.json();
      if (data.celebrity && data.celebrity.id) {
        const newCeleb: Celebrity = data.celebrity;

        setCelebrities((prev) => {
          if (prev.some((c) => c.id === newCeleb.id)) {
            return prev;
          }
          return [newCeleb, ...prev];
        });

        handleSelectCelebrity(newCeleb.id);
        setSearchQuery('');
      } else {
        alert('Could not generate celebrity profile at this time.');
      }
    } catch (err) {
      console.error('Global AI Search Error:', err);
      alert('Failed to connect to global celebrity index. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSelectCelebrity = (id: string) => {
    setSelectedCelebrityId(id);
    setActiveTab('biography');
    window.location.hash = `#profile/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleStoredFavorite(id);
    setFavorites(updated);
  };

  const handleInquirySubmitted = (newInquiry: InquiryFormData) => {
    setInquiries(getStoredInquiries());
  };

  const currentCelebrity = celebrities.find((c) => c.id === selectedCelebrityId) || null;

  // Next and Prev celebrity navigation
  const currentIndex = celebrities.findIndex((c) => c.id === selectedCelebrityId);
  const prevCelebrity = currentIndex > 0 ? celebrities[currentIndex - 1] : null;
  const nextCelebrity = currentIndex < celebrities.length - 1 ? celebrities[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 flex flex-col antialiased">
      {/* Global Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        celebrities={celebrities}
        selectedCelebrityId={selectedCelebrityId}
        onSelectCelebrity={handleSelectCelebrity}
        onOpenDirectory={() => {
          setSelectedCelebrityId(null);
          window.location.hash = '#directory';
        }}
        favoritesCount={favorites.length}
        inquiriesCount={inquiries.length}
        onOpenFavorites={() => {
          // Filter directory by favorites or select first favorite
          if (favorites.length > 0) {
            handleSelectCelebrity(favorites[0]);
          } else {
            alert('No saved celebrities yet! Click the heart icon on any celebrity to save them.');
          }
        }}
        onOpenInquiries={() => setIsInquiryHistoryOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedCelebrityId && currentCelebrity ? (
          <div className="space-y-6">
            {/* Top Navigation Bar for Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCelebrityId(null);
                    window.location.hash = '#directory';
                  }}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  id="back-to-directory-button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Profiles</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">Select Profile:</span>
                  <select
                    value={selectedCelebrityId}
                    onChange={(e) => handleSelectCelebrity(e.target.value)}
                    className="bg-zinc-950 text-xs font-bold text-amber-400 px-3 py-1.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
                    id="profile-switcher-dropdown"
                  >
                    {celebrities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.knownAs} ({c.industry})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prev / Next Profile Shortcuts */}
              <div className="flex items-center gap-2">
                {prevCelebrity && (
                  <button
                    onClick={() => handleSelectCelebrity(prevCelebrity.id)}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden md:inline">{prevCelebrity.knownAs}</span>
                  </button>
                )}
                {nextCelebrity && (
                  <button
                    onClick={() => handleSelectCelebrity(nextCelebrity.id)}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span className="hidden md:inline">{nextCelebrity.knownAs}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Cover Banner */}
            <div className="relative rounded-3xl overflow-hidden h-48 sm:h-64 border border-zinc-800/80 shadow-2xl bg-zinc-950">
              <img
                src={currentCelebrity.coverBannerUrl}
                alt={`${currentCelebrity.knownAs} Cover`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {currentCelebrity.industry}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {currentCelebrity.occupation.join(' • ')}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1 flex items-center gap-2">
                    {currentCelebrity.knownAs}
                    <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAIChatOpen(true)}
                    className="px-3.5 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 font-bold text-xs rounded-xl border border-amber-500/30 backdrop-blur transition-all flex items-center gap-1.5 shadow"
                    id="open-ai-chat-button"
                  >
                    <Bot className="w-4 h-4" />
                    Ask AI Assistant
                  </button>
                </div>
              </div>
            </div>

            {/* Main Profile Grid: Left Sidebar + Right Tabbed Content */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* LEFT SIDEBAR (Best View Photo, Birth Details, Family Details, Hiring CTA) */}
              <LeftSidebar
                celebrity={currentCelebrity}
                isFavorite={favorites.includes(currentCelebrity.id)}
                onToggleFavorite={() => handleToggleFavorite(currentCelebrity.id)}
                onOpenBookingForm={() => {
                  setBookingTargetCelebrity(currentCelebrity);
                  setIsBookingModalOpen(true);
                }}
              />

              {/* RIGHT MAIN CONTENT AREA */}
              <div className="flex-1 w-full space-y-6">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800/80 overflow-x-auto no-scrollbar shadow-lg">
                  {[
                    { id: 'biography', label: 'Biography', icon: BookOpen },
                    { id: 'films', label: `Films (${currentCelebrity.films.length})`, icon: Clapperboard },
                    { id: 'awards', label: `Awards (${currentCelebrity.awards.filter(a => a.status === 'Won').length})`, icon: Trophy },
                    { id: 'titles', label: `Titles (${currentCelebrity.titles.length})`, icon: Crown },
                    { id: 'social', label: 'Social Posts', icon: Instagram },
                    { id: 'gallery', label: 'Photo Gallery', icon: Camera },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                          isActive
                            ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-extrabold'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                        }`}
                        id={`tab-${tab.id}`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Views */}
                {activeTab === 'biography' && <BiographySection celebrity={currentCelebrity} />}
                {activeTab === 'films' && (
                  <FilmographySection films={currentCelebrity.films} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'awards' && (
                  <AwardsSection awards={currentCelebrity.awards} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'titles' && (
                  <TitlesSection titles={currentCelebrity.titles} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'social' && (
                  <SocialPostsSection posts={currentCelebrity.socialPosts} celebrity={currentCelebrity} />
                )}
                {activeTab === 'gallery' && (
                  <PhotoGallerySection gallery={currentCelebrity.gallery} celebrity={currentCelebrity} />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Directory Catalog View */
          <DirectoryView
            celebrities={celebrities}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCelebrity={handleSelectCelebrity}
            onOpenBookingForm={(celeb) => {
              setBookingTargetCelebrity(celeb);
              setIsBookingModalOpen(true);
            }}
            onSearchGlobalAI={handleSearchGlobalAI}
            isGeneratingAI={isGeneratingAI}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-serif font-bold text-zinc-300 text-sm">CELEBVAULT PRO</span>
            <span>— Iconic Celebrity Directory & Booking Agency</span>
          </div>
          <p>© {new Date().getFullYear()} CelebVault Inc. All rights reserved. Built for global talent, filmography, and event representation.</p>
        </div>
      </footer>

      {/* Booking / Contact Modal */}
      {bookingTargetCelebrity && (
        <ContactFormModal
          celebrity={bookingTargetCelebrity}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setBookingTargetCelebrity(null);
          }}
          onInquirySubmitted={handleInquirySubmitted}
        />
      )}

      {/* Submitted Inquiries Drawer Modal */}
      <InquiryHistoryModal
        isOpen={isInquiryHistoryOpen}
        onClose={() => setIsInquiryHistoryOpen(false)}
        inquiries={inquiries}
      />

      {/* AI Assistant Chat Modal */}
      {currentCelebrity && (
        <AIChatModal
          celebrity={currentCelebrity}
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
        />
      )}
    </div>
  );
}
