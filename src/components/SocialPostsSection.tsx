import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, ShieldCheck, Instagram, Twitter, ExternalLink, Sparkles } from 'lucide-react';
import { SocialPost, Celebrity } from '../types';

interface SocialPostsSectionProps {
  posts: SocialPost[];
  celebrity: Celebrity;
}

export const SocialPostsSection: React.FC<SocialPostsSectionProps> = ({ posts, celebrity }) => {
  // Interactive likes state
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    posts.forEach((p) => {
      initial[p.id] = p.likesCount;
    });
    return initial;
  });

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>({});
  const [newCommentInput, setNewCommentInput] = useState('');

  const toggleLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const addComment = (postId: string) => {
    if (!newCommentInput.trim()) return;
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentInput.trim()],
    }));
    setNewCommentInput('');
  };

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">Latest Social Media Feed</h2>
            <p className="text-xs text-zinc-400">Official real-time updates and posts from {celebrity.knownAs}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {posts.map((post) => {
          const isLiked = likedPosts[post.id];
          const count = likeCounts[post.id] ?? post.likesCount;
          const postComments = commentsMap[post.id] || [];

          return (
            <article
              key={post.id}
              className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-lg space-y-3 p-4 hover:border-zinc-700 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={celebrity.avatarPhoto}
                    alt={celebrity.knownAs}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`;
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

                <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {post.platform === 'Instagram' && <Instagram className="w-3.5 h-3.5 text-rose-400" />}
                  {post.platform === 'X' && <Twitter className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{post.platform}</span>
                </div>
              </div>

              {/* Text Content */}
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">{post.content}</p>

              {/* Media Image */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-zinc-800 max-h-[380px] bg-zinc-900">
                  <img
                    src={post.imageUrl}
                    alt="Social Post Media"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80`;
                    }}
                  />
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs text-zinc-400">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isLiked
                      ? 'text-rose-500 bg-rose-500/10 font-bold'
                      : 'hover:text-rose-400 hover:bg-zinc-900'
                  }`}
                  id={`like-post-${post.id}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{count.toLocaleString()}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount + postComments.length}</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Post link copied to clipboard!');
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{post.sharesCount.toLocaleString()}</span>
                </button>
              </div>

              {/* Comment Drawer / Input */}
              {activeCommentPostId === post.id && (
                <div className="pt-3 border-t border-zinc-900 space-y-2 bg-zinc-900/50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment as fan/brand..."
                      value={newCommentInput}
                      onChange={(e) => setNewCommentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                      className="flex-1 bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="px-3 py-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg hover:bg-amber-400"
                    >
                      Post
                    </button>
                  </div>

                  {postComments.length > 0 && (
                    <div className="space-y-1.5 mt-2 pt-2 border-t border-zinc-800 text-xs">
                      {postComments.map((comment, i) => (
                        <div key={i} className="bg-zinc-950 p-2 rounded-lg text-zinc-300 border border-zinc-800">
                          <span className="font-semibold text-amber-400">You: </span>
                          {comment}
                        </div>
                      ))}
                    </div>
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
