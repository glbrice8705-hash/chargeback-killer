'use client';

import React, { useState } from 'react';
import { LifeBuoy, X, Send, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSubject('');
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-white font-sans">
      <div className="w-full max-w-lg bg-[#16181D] border border-[#272A33] rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0C] border-b border-[#272A33]">
          <div className="flex items-center gap-3">
            <LifeBuoy className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">Client Success & Dispute Desk</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#94A3B8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-12 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-white font-bold text-base">Inquiry Dispatched</h4>
            <p className="text-xs text-[#94A3B8]">An assigned dispute strategist will respond via encrypted channel within 15 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[#94A3B8] mb-1">Inquiry Subject / MID Reference</label>
              <input
                type="text"
                required
                placeholder="e.g. Visa CE 3.0 documentation query for Order #882..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg p-2.5 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-1">Detailed Description</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your gateway telemetry or representment challenge..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg p-2.5 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-xl hover:bg-[#E0F2FE] transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Secure Support Ticket</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}