import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, ArrowLeft, ChevronLeft, ChevronRight, Send, 
  Heart, Bot, Trophy, Clapperboard, Crown, Instagram, BookOpen, Camera, ShieldCheck, Star, Newspaper, RefreshCw, CheckCircle2, AlertCircle
} from 'lucide-react';
import { CELEBRITIES } from './data/celebrities';
import { Celebrity, InquiryFormData, CelebrityDirectoryItem } from './types';
import { getStoredFavorites, toggleStoredFavorite, getStoredInquiries } from './utils/storage';

import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { BiographySection } from './components/BiographySection';
import { FilmographySection } from './components/FilmographySection';
import { AwardsSection } from './components/AwardsSection';
import { TitlesSection } from './components/TitlesSection';
import { SocialPostsSection } from './components/SocialPostsSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { NewsArticlesSection } from './components/NewsArticlesSection';
import { ContactFormModal } from './components/ContactFormModal';
import { DirectoryView } from './components/DirectoryView';
import { InquiryHistoryModal } from './components/InquiryHistoryModal';
import { AIChatModal } from './components/AIChatModal';

export default function App() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(CELEBRITIES);
  const [directoryItems, setDirectoryItems] = useState<CelebrityDirectoryItem[]>([]);
  const [totalCelebrities, setTotalCelebrities] = useState<number>(CELEBRITIES.length);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string | null>('leonardo-dicaprio');
  const [activeTab, setActiveTab] = useState<'biography' | 'films' | 'awards' | 'titles' | 'social' | 'gallery' | 'news'>('biography');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSort, setSelectedSort] = useState<'trending' | 'name' | 'recently_updated' | 'newest'>('trending');

  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<InquiryFormData[]>([]);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetCelebrity, setBookingTargetCelebrity] = useState<Celebrity | null>(null);
  const [isInquiryHistoryOpen, setIsInquiryHistoryOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Helper to show brief notification
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // Fetch paginated directory from server
  const fetchDirectory = useCallback(async (page: number = 1) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '18',
        search: searchQuery,
        industry: selectedIndustry,
        category: selectedCategory,
        country: selectedCountry,
        sort: selectedSort,
      });

      const res = await fetch(`/api/directory?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          setDirectoryItems(data.items);
          setTotalCelebrities(data.total || data.items.length);
          setCurrentPage(data.page || 1);
          setTotalPages(data.totalPages || 1);
        }
      }
    } catch (err) {
      console.log('Directory pagination error, fallback to memory list', err);
    }
  }, [searchQuery, selectedIndustry, selectedCategory, selectedCountry, selectedSort]);

  // Initial load & hash change listener
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
          setTotalCelebrities(data.length);
        }
      })
      .catch((err) => console.log('Using static celebrities fallback', err));

    fetchDirectory(1);

    // Synchronize current URL hash
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#profile/')) {
        const parts = hash.replace('#profile/', '').split('/');
        const id = parts[0];
        const tab = parts[1] as any;
        if (id) {
          setSelectedCelebrityId(id);
          if (tab && ['biography', 'films', 'awards', 'titles', 'social', 'gallery', 'news'].includes(tab)) {
            setActiveTab(tab);
          }
        }
      } else if (hash === '#directory' || hash === '' || hash === '#') {
        setSelectedCelebrityId(null);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // Refetch directory when filters change
  useEffect(() => {
    fetchDirectory(currentPage);
  }, [fetchDirectory, currentPage]);

  // Fetch a single celebrity and hydrate store
  const loadCelebrityProfile = async (id: string) => {
    setSelectedCelebrityId(id);

    const existing = celebrities.find((c) => c.id === id);
    if (
      existing &&
      existing.biography?.summary &&
      existing.films &&
      existing.films.length > 0 &&
      existing.awards &&
      existing.awards.length > 0
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/celebrities/${id}`);
      if (res.ok) {
        const celeb: Celebrity = await res.json();
        setCelebrities((prev) => {
          const index = prev.findIndex((c) => c.id === celeb.id);
          if (index >= 0) {
            const next = [...prev];
            next[index] = celeb;
            return next;
          }
          return [celeb, ...prev];
        });
        setSelectedCelebrityId(celeb.id);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  // Discover & Aggregate new celebrity using global multi-source pipeline
  const handleSearchGlobalDiscovery = async (queryName: string) => {
    if (!queryName || !queryName.trim()) return;

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

    setIsDiscovering(true);
    showToast(`Searching Wikipedia, Wikidata & Google News for "${queryName.trim()}"...`, 'info');

    try {
      // Primary discovery endpoint
      const res = await fetch('/api/celebrities/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryName.trim() }),
      });

      if (!res.ok) {
        // Fallback to legacy endpoint if needed
        const fallbackRes = await fetch('/api/celebrities/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryName.trim() }),
        });
        if (!fallbackRes.ok) throw new Error('Discovery failed');
        const fallbackData = await fallbackRes.json();
        if (fallbackData.celebrity) {
          handleSuccessfulDiscovery(fallbackData.celebrity);
          return;
        }
      }

      const data = await res.json();
      if (data.celebrity && data.celebrity.id) {
        handleSuccessfulDiscovery(data.celebrity);
      } else {
        showToast('Could not find verified public records for this name. Please verify spelling.', 'error');
      }
    } catch (err) {
      console.error('Discovery Pipeline Error:', err);
      showToast('Failed to connect to external data archives. Please try again.', 'error');
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleSuccessfulDiscovery = (newCeleb: Celebrity) => {
    setCelebrities((prev) => {
      const idx = prev.findIndex((c) => c.id === newCeleb.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = newCeleb;
        return next;
      }
      return [newCeleb, ...prev];
    });

    handleSelectCelebrity(newCeleb.id);
    setSearchQuery('');
    fetchDirectory(1);
    showToast(`Successfully verified & indexed "${newCeleb.knownAs}"!`, 'success');
  };

  // Refresh profile facts and news incrementally
  const handleRefreshProfile = async () => {
    if (!selectedCelebrityId) return;

    setIsRefreshing(true);
    showToast('Checking external sources for live updates & breaking news...', 'info');

    try {
      const res = await fetch(`/api/celebrities/${selectedCelebrityId}/refresh`, {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.celebrity) {
          const updatedCeleb: Celebrity = data.celebrity;
          setCelebrities((prev) =>
            prev.map((c) => (c.id === updatedCeleb.id ? updatedCeleb : c))
          );
          showToast(
            data.updated
              ? `Profile synchronized with latest records! (${data.changedFields?.join(', ') || 'Updated'})`
              : 'Profile is already up-to-date with verified sources.',
            'success'
          );
        }
      } else {
        showToast('Incremental sync completed.', 'info');
      }
    } catch (err) {
      console.error('Refresh error:', err);
      showToast('Failed to refresh live records.', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectCelebrity = (id: string) => {
    loadCelebrityProfile(id);
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
    showToast('Representation inquiry received! Forwarded to talent desk.', 'success');
  };

  const currentCelebrity = celebrities.find((c) => c.id === selectedCelebrityId) || null;

  // Next and Prev celebrity navigation
  const currentIndex = celebrities.findIndex((c) => c.id === selectedCelebrityId);
  const prevCelebrity = currentIndex > 0 ? celebrities[currentIndex - 1] : null;
  const nextCelebrity = currentIndex < celebrities.length - 1 ? celebrities[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 flex flex-col antialiased">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-mono font-medium backdrop-blur-lg ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-950/50'
                : notification.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-950/50'
                : 'bg-zinc-900/90 text-amber-300 border-amber-500/40 shadow-zinc-950/50'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={(ind) => {
          setSelectedIndustry(ind);
          if (selectedCelebrityId) {
            setSelectedCelebrityId(null);
            window.location.hash = '#directory';
          }
        }}
        celebrities={celebrities}
        selectedCelebrityId={selectedCelebrityId}
        onSelectCelebrity={handleSelectCelebrity}
        onOpenDirectory={() => {
          setSelectedCelebrityId(null);
          window.location.hash = '#directory';
        }}
        onSearchGlobalAI={handleSearchGlobalDiscovery}
        isDiscovering={isDiscovering}
        favoritesCount={favorites.length}
        inquiriesCount={inquiries.length}
        onOpenFavorites={() => {
          if (favorites.length > 0) {
            handleSelectCelebrity(favorites[0]);
          } else {
            showToast('No saved public figures yet! Click the heart icon on any profile to save.', 'info');
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
                  <span>Global Directory</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">Public Figure:</span>
                  <select
                    value={selectedCelebrityId}
                    onChange={(e) => handleSelectCelebrity(e.target.value)}
                    className="bg-zinc-950 text-xs font-bold text-amber-400 px-3 py-1.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
                    id="profile-switcher-dropdown"
                  >
                    {celebrities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.knownAs} ({c.industry || c.category || 'Figure'})
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {currentCelebrity.industry}
                    </span>
                    {currentCelebrity.country && (
                      <span className="text-xs font-mono bg-zinc-900/80 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                        {currentCelebrity.country}
                      </span>
                    )}
                    <span className="text-xs text-zinc-400 font-mono">
                      {(currentCelebrity.occupation || []).join(' • ')}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1 flex items-center gap-2">
                    {currentCelebrity.knownAs}
                    <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshProfile}
                    disabled={isRefreshing}
                    className="px-3 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-mono text-xs rounded-xl border border-zinc-700 backdrop-blur transition-all flex items-center gap-1.5 shadow disabled:opacity-50"
                    title="Synchronize records with live external archives"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Syncing...' : 'Sync Sources'}</span>
                  </button>

                  <button
                    onClick={() => setIsAIChatOpen(true)}
                    className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs rounded-xl border border-amber-500/30 backdrop-blur transition-all flex items-center gap-1.5 shadow"
                    id="open-ai-chat-button"
                  >
                    <Bot className="w-4 h-4" />
                    Ask Assistant
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
                onRefreshProfile={handleRefreshProfile}
                isRefreshing={isRefreshing}
              />

              {/* RIGHT MAIN CONTENT AREA */}
              <div className="flex-1 w-full space-y-6">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800/80 overflow-x-auto no-scrollbar shadow-lg">
                  {[
                    { id: 'biography', label: 'Biography', icon: BookOpen },
                    { id: 'films', label: `Films (${(currentCelebrity.films || []).length})`, icon: Clapperboard },
                    { id: 'awards', label: `Awards (${(currentCelebrity.awards || []).filter(a => a.status === 'Won').length})`, icon: Trophy },
                    { id: 'news', label: `Latest News (${(currentCelebrity.latestNews || []).length})`, icon: Newspaper },
                    { id: 'titles', label: `Titles (${(currentCelebrity.titles || []).length})`, icon: Crown },
                    { id: 'social', label: 'Social Posts', icon: Instagram },
                    { id: 'gallery', label: 'Gallery', icon: Camera },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          window.location.hash = `#profile/${currentCelebrity.id}/${tab.id}`;
                        }}
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
                  <FilmographySection films={currentCelebrity.films || []} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'awards' && (
                  <AwardsSection awards={currentCelebrity.awards || []} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'news' && (
                  <NewsArticlesSection
                    celebrity={currentCelebrity}
                    onRefreshNews={handleRefreshProfile}
                    isRefreshing={isRefreshing}
                  />
                )}
                {activeTab === 'titles' && (
                  <TitlesSection titles={currentCelebrity.titles || []} celebrityName={currentCelebrity.knownAs} />
                )}
                {activeTab === 'social' && (
                  <SocialPostsSection posts={currentCelebrity.socialPosts || []} celebrity={currentCelebrity} />
                )}
                {activeTab === 'gallery' && (
                  <PhotoGallerySection gallery={currentCelebrity.gallery || []} celebrity={currentCelebrity} />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Directory Catalog View */
          <DirectoryView
            celebrities={celebrities}
            directoryItems={directoryItems}
            totalCelebrities={totalCelebrities}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => {
              setCurrentPage(p);
              fetchDirectory(p);
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCelebrity={handleSelectCelebrity}
            onOpenBookingForm={(celeb) => {
              setBookingTargetCelebrity(celeb);
              setIsBookingModalOpen(true);
            }}
            onSearchGlobalAI={handleSearchGlobalDiscovery}
            isGeneratingAI={isDiscovering}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-serif font-bold text-zinc-300 text-sm">CELEBVAULT PRO</span>
            <span>— Global Celebrity Information Aggregator</span>
          </div>
          <p>© {new Date().getFullYear()} CelebVault Inc. Aggregating Wikipedia, Wikidata, and Global Journalistic Archives with Zero Hallucinations.</p>
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
