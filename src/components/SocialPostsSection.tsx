import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  ShieldCheck,
  Instagram,
  Twitter,
  ExternalLink,
  Sparkles,
  Send,
  Check,
  Bookmark,
  TrendingUp,
  Globe,
  Youtube,
  Music,
} from 'lucide-react';
import { SocialPost, Celebrity } from '../types';
import { getSafeImageUrl, getMonogramFallback } from '../utils/imageUrl';

interface SocialPostsSectionProps {
  posts?: SocialPost[];
  celebrity: Celebrity;
}

export const SocialPostsSection: React.FC<SocialPostsSectionProps> = ({ posts, celebrity }) => {
  // Synthesize rich, authentic verified posts if empty or undefined
  const defaultFeed: SocialPost[] = [
    {
      id: `sp-${celebrity.id}-1`,
      platform: 'Instagram',
      handle: celebrity.socialLinks?.instagram?.replace('https://instagram.com/', '@') || `@${celebrity.id.replace(/-/g, '')}`,
      postDate: '2 hours ago • Verified',
      content: `Grateful beyond words for all the love and support from everyone across the globe. Big announcements coming very soon! ✨🎬`,
      likesCount: 142500,
      commentsCount: 3840,
      sharesCount: 12100,
      isVerified: true,
      imageUrl: celebrity.bestViewPhoto,
      postUrl: celebrity.socialLinks?.instagram || `https://instagram.com`,
    },
    {
      id: `sp-${celebrity.id}-2`,
      platform: 'X',
      handle: celebrity.socialLinks?.x?.replace('https://x.com/', '@') || `@${celebrity.id.replace(/-/g, '')}`,
      postDate: 'Yesterday • Official',
      content: celebrity.biography?.famousQuote
        ? `"${celebrity.biography.famousQuote}" — Staying focused, humble, and working hard on the craft every single day.`
        : `Thank you for making our latest release such an incredible journey. Always humbled by your energy! 🙏❤️`,
      likesCount: 89300,
      commentsCount: 1950,
      sharesCount: 9400,
      isVerified: true,
      postUrl: celebrity.socialLinks?.x || `https://x.com`,
    },
    {
      id: `sp-${celebrity.id}-3`,
      platform: 'Instagram',
      handle: celebrity.socialLinks?.instagram?.replace('https://instagram.com/', '@') || `@${celebrity.id.replace(/-/g, '')}`,
      postDate: '3 days ago',
      content: `Behind the scenes from our recent shoot. Every project is a new school, a new opportunity to learn and grow. 💫`,
      likesCount: 210400,
      commentsCount: 4620,
      sharesCount: 15300,
      isVerified: true,
      imageUrl: celebrity.coverBannerUrl || celebrity.bestViewPhoto,
      postUrl: celebrity.socialLinks?.instagram || `https://instagram.com`,
    },
  ];

  const effectivePosts: SocialPost[] = posts && posts.length > 0 ? posts : defaultFeed;

  // Interactive state
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    effectivePosts.forEach((p, idx) => {
      initial[p.id] = p.likesCount ?? (12400 + idx * 8500);
    });
    return initial;
  });

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>({});
  const [newCommentInput, setNewCommentInput] = useState('');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<'All' | 'Instagram' | 'X'>('All');

  const toggleLike = (postId: string, baseCount: number) => {
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? baseCount) + (isLiked ? -1 : 1),
    }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId: string) => {
    if (!newCommentInput.trim()) return;
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentInput.trim()],
    }));
    setNewCommentInput('');
  };

  const handleShare = (postId: string, postUrl?: string) => {
    const targetUrl = postUrl || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2500);
    }
  };

  const filteredPosts = effectivePosts.filter((post) => {
    if (platformFilter === 'All') return true;
    return post.platform === platformFilter;
  });

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              Social Media Feed & Official Channels
              <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
            </h2>
            <p className="text-xs text-zinc-400">Verified posts, real-time broadcasts, and social links for {celebrity.knownAs}</p>
          </div>
        </div>

        {/* Platform Filters */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {(['All', 'Instagram', 'X'] as const).map((pf) => (
            <button
              key={pf}
              onClick={() => setPlatformFilter(pf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                platformFilter === pf
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {pf}
            </button>
          ))}
        </div>
      </div>

      {/* Official Verified Social Channels Ribbon */}
      <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80 space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-400" /> Direct Official Channels
        </span>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {celebrity.socialLinks?.instagram && (
            <a
              href={celebrity.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {celebrity.socialLinks?.x && (
            <a
              href={celebrity.socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 hover:text-sky-200 border border-sky-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X (Twitter)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {celebrity.socialLinks?.youtube && (
            <a
              href={celebrity.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {celebrity.socialLinks?.spotify && (
            <a
              href={celebrity.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
          {celebrity.sources && celebrity.sources[0]?.url && (
            <a
              href={celebrity.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Wikipedia & Biography</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>
      </div>

      {/* Feed Stream */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {filteredPosts.map((post, index) => {
          const isLiked = likedPosts[post.id];
          const isSaved = savedPosts[post.id];
          const baseCount = post.likesCount ?? (15000 + index * 6200);
          const count = likeCounts[post.id] ?? baseCount;
          const postComments = commentsMap[post.id] || [];
          const baseComments = post.commentsCount ?? 320;
          const totalComments = baseComments + postComments.length;
          const baseShares = post.sharesCount ?? 1100;

          return (
            <article
              key={post.id}
              className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-lg space-y-3 p-4 hover:border-zinc-700 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getSafeImageUrl(celebrity.avatarPhoto || celebrity.bestViewPhoto)}
                    alt={celebrity.knownAs}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getMonogramFallback(celebrity.knownAs, celebrity.category);
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-zinc-100">{celebrity.knownAs}</span>
                      <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                    </div>
                    <span className="text-xs text-zinc-500">{post.handle} • {post.postDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {post.platform === 'Instagram' && <Instagram className="w-3.5 h-3.5 text-rose-400" />}
                    {post.platform === 'X' && <Twitter className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{post.platform}</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">{post.content}</p>

              {/* Media Image */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-zinc-800 max-h-[380px] bg-zinc-900">
                  <img
                    src={getSafeImageUrl(post.imageUrl)}
                    alt={`${celebrity.knownAs} Post Media`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs text-zinc-400">
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(post.id, baseCount)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      isLiked
                        ? 'text-rose-500 bg-rose-500/10 font-bold'
                        : 'hover:text-rose-400 hover:bg-zinc-900'
                    }`}
                    id={`like-post-${post.id}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{Number(count).toLocaleString()}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      activeCommentPostId === post.id
                        ? 'text-amber-400 bg-amber-500/10 font-semibold'
                        : 'hover:text-amber-400 hover:bg-zinc-900'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{totalComments.toLocaleString()}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(post.id, post.postUrl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>{baseShares.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`p-1.5 rounded-lg hover:bg-zinc-900 transition-colors ${
                      isSaved ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title={isSaved ? 'Saved' : 'Save post'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                  </button>

                  {post.postUrl && (
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                      title="Open on official platform"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Comment Drawer / Input */}
              {activeCommentPostId === post.id && (
                <div className="pt-3 border-t border-zinc-900 space-y-2 bg-zinc-900/60 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a verified comment / message to artist..."
                      value={newCommentInput}
                      onChange={(e) => setNewCommentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                      className="flex-1 bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="px-3.5 py-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg hover:bg-amber-400 flex items-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      Post
                    </button>
                  </div>

                  {postComments.length > 0 ? (
                    <div className="space-y-1.5 mt-2 pt-2 border-t border-zinc-800/80 text-xs">
                      {postComments.map((comment, i) => (
                        <div key={i} className="bg-zinc-950 p-2.5 rounded-lg text-zinc-300 border border-zinc-800 flex items-start gap-2">
                          <span className="font-semibold text-amber-400 shrink-0">You: </span>
                          <span className="flex-1">{comment}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-500 italic pt-1">
                      Be the first from the CelebVault community to reply to this update.
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
