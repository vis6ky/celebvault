import React from 'react';
import { X, FileText, CheckCircle2, Clock, MapPin, Calendar, DollarSign, Building2 } from 'lucide-react';
import { InquiryFormData } from '../types';

interface InquiryHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: InquiryFormData[];
}

export const InquiryHistoryModal: React.FC<InquiryHistoryModalProps> = ({
  isOpen,
  onClose,
  inquiries,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-zinc-100 max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-zinc-900 p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">Submitted Agency Inquiries</h2>
              <p className="text-xs text-zinc-400">Track status of your booking & collaboration proposals</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Clock className="w-12 h-12 text-zinc-700 mx-auto" />
              <p className="text-zinc-400 text-sm font-medium">No booking inquiries submitted yet.</p>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                Select any celebrity profile and click "Hire, Invite or Collaborate" to send an official agency inquiry.
              </p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 space-y-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {inq.inquiryType.toUpperCase()} INQUIRY
                    </span>
                    <h3 className="text-base font-bold font-serif text-white mt-1">
                      {inq.celebrityName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {inq.status}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                      Ref: {inq.referenceCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500 text-[10px] block font-mono">From</span>
                    <span className="font-medium text-zinc-100">{inq.senderName} ({inq.senderOrganization || 'Individual'})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block font-mono">Contact Email</span>
                    <span className="font-medium text-zinc-100">{inq.senderEmail}</span>
                  </div>
                  {inq.eventLocation && (
                    <div>
                      <span className="text-zinc-500 text-[10px] block font-mono">Location</span>
                      <span className="font-medium text-zinc-100">{inq.eventLocation}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-zinc-500 text-[10px] block font-mono">Budget</span>
                    <span className="font-semibold text-emerald-400">{inq.proposedBudget}</span>
                  </div>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 text-xs text-zinc-300">
                  <span className="text-zinc-500 font-mono block text-[10px] uppercase mb-1">Message Detail</span>
                  <p className="line-clamp-3 leading-relaxed text-zinc-400">{inq.projectDescription}</p>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono block text-right">
                  Submitted on {inq.submittedAt}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
