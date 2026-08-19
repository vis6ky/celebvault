import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { Celebrity } from '../types';

interface AIChatModalProps {
  celebrity: Celebrity;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ celebrity, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am your AI Concierge for ${celebrity.knownAs}. Ask me anything about their filmography, awards, family background, or career milestones!`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          celebrityId: celebrity.id,
          question: userText,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer || `Here is trivia regarding ${celebrity.knownAs}: ${celebrity.biography.summary}`,
        },
      ]);
    } catch (err) {
      console.error('Failed to ask AI', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I had trouble connecting, but here is what I know: ${celebrity.biography.summary}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] text-zinc-100">
        {/* Header */}
        <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">
                Ask AI about {celebrity.knownAs}
              </h3>
              <p className="text-xs text-zinc-400">Powered by Gemini AI Concierge</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-zinc-500 italic text-xs">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Consulting celebrity archive...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask a question about ${celebrity.knownAs}...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-zinc-950 text-xs text-zinc-100 placeholder-zinc-500 px-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputQuery.trim()}
            className="p-2.5 bg-amber-500 text-zinc-950 font-bold rounded-xl hover:bg-amber-400 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
