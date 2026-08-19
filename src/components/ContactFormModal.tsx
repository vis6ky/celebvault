import React, { useState } from 'react';
import { 
  X, Send, Sparkles, Building2, Calendar, MapPin, DollarSign, 
  Mail, Phone, User, CheckCircle2, ShieldCheck, Briefcase, PartyPopper, Ticket, Megaphone, Clapperboard
} from 'lucide-react';
import { Celebrity, InquiryFormData } from '../types';
import { saveStoredInquiry } from '../utils/storage';

interface ContactFormModalProps {
  celebrity: Celebrity;
  isOpen: boolean;
  onClose: () => void;
  onInquirySubmitted: (inquiry: InquiryFormData) => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  celebrity,
  isOpen,
  onClose,
  onInquirySubmitted,
}) => {
  const [inquiryType, setInquiryType] = useState<'brand' | 'event' | 'party' | 'speaking' | 'film'>('brand');
  const [senderName, setSenderName] = useState('');
  const [senderOrganization, setSenderOrganization] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [proposedBudget, setProposedBudget] = useState('$50,000 - $100,000');
  const [projectDescription, setProjectDescription] = useState('');

  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryFormData | null>(null);

  if (!isOpen) return null;

  const handleGenerateAIPitch = async () => {
    setIsGeneratingPitch(true);
    try {
      const res = await fetch('/api/ai/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          celebrityName: celebrity.knownAs,
          inquiryType,
          eventDetails: projectDescription || `Engagement for ${inquiryType} in ${eventLocation || 'TBD'}`,
          companyName: senderOrganization || senderName || 'Our Organization',
        }),
      });
      const data = await res.json();
      if (data.pitch) {
        setProjectDescription(data.pitch);
      }
    } catch (err) {
      console.error('Failed to generate pitch', err);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !projectDescription) {
      alert('Please fill out your name, email, and project message.');
      return;
    }

    const saved = saveStoredInquiry({
      celebrityId: celebrity.id,
      celebrityName: celebrity.knownAs,
      inquiryType,
      senderName,
      senderOrganization,
      senderEmail,
      senderPhone,
      eventDate,
      eventLocation,
      proposedBudget,
      projectDescription,
    });

    setSubmittedInquiry(saved);
    onInquirySubmitted(saved);
  };

  const inquiryCategories = [
    { id: 'brand', label: 'Brand Collaboration', icon: Megaphone, desc: 'Commercials, endorsements & social campaigns' },
    { id: 'event', label: 'Grand Opening & VIP Event', icon: Ticket, desc: 'Ribbon cutting, festival openings & galas' },
    { id: 'party', label: 'Party & Private Celebration', icon: PartyPopper, desc: 'Private birthdays, weddings & luxury celebrations' },
    { id: 'speaking', label: 'Keynote & Public Speaking', icon: Briefcase, desc: 'Corporate summits & masterclasses' },
    { id: 'film', label: 'Film / Casting Call', icon: Clapperboard, desc: 'Movie, TV show, or music production' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 text-zinc-100 relative">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={celebrity.avatarPhoto}
              alt={celebrity.knownAs}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-serif font-bold text-white">Hire / Invite {celebrity.knownAs}</h2>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-zinc-400">
                Official Agency Inquiry Form • {celebrity.agencyDetails.agencyName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            id="close-booking-modal-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If submitted show confirmation card */}
        {submittedInquiry ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                Inquiry Successfully Dispatched
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">Thank You, {submittedInquiry.senderName}!</h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Your proposal for <strong className="text-zinc-200">{celebrity.knownAs}</strong> has been routed directly to <strong className="text-amber-400">{celebrity.agencyDetails.agencyName}</strong>.
              </p>
            </div>

            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-mono">Reference Code:</span>
                <span className="font-bold font-mono text-amber-400">{submittedInquiry.referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-mono">Agency Contact:</span>
                <span className="text-zinc-200">{celebrity.agencyDetails.agentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-mono">Status:</span>
                <span className="text-emerald-400 font-semibold">{submittedInquiry.status}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedInquiry(null);
                onClose();
              }}
              className="px-6 py-2.5 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Agency Info Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs flex items-center justify-between text-amber-200">
              <div>
                <span className="font-bold text-amber-400 block">Agency Representation:</span>
                <span>{celebrity.agencyDetails.agentName} ({celebrity.agencyDetails.agencyName})</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono">Est. Fee Range</span>
                <span className="font-bold text-emerald-400">{celebrity.agencyDetails.bookingFeeRange}</span>
              </div>
            </div>

            {/* 1. Inquiry Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                Select Purpose of Inquiry *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {inquiryCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = inquiryType === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setInquiryType(cat.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-zinc-200">{cat.label}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{cat.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sender Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Company / Brand / Host *</label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Vogue Events / Nike Global"
                    value={senderOrganization}
                    onChange={(e) => setSenderOrganization(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Work Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="s.jenkins@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Event Date, Location, Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Proposed Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">City / Venue Location</label>
                <input
                  type="text"
                  placeholder="e.g. Paris, France / Beverly Hills Hotel"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Budget Allocation</label>
                <select
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                  <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                  <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                  <option value="$500,000 - $1,000,000+">$500,000 - $1,000,000+</option>
                </select>
              </div>
            </div>

            {/* Project Details & Gemini Pitch Generator */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Project Description & Proposal Message *
                </label>

                <button
                  type="button"
                  onClick={handleGenerateAIPitch}
                  disabled={isGeneratingPitch}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-all"
                  id="generate-ai-pitch-button"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isGeneratingPitch ? 'Drafting with AI...' : '✨ Auto-Draft Proposal with AI'}
                </button>
              </div>

              <textarea
                rows={4}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your project, brand vision, duration of appearance, and key expectations..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            {/* Form Action */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-900">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 flex items-center gap-2"
                id="submit-booking-inquiry-button"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Agency Proposal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
