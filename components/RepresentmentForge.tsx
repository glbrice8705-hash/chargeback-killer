'use client';

import React, { useState } from 'react';
import { Cpu, Terminal, Copy, Send } from 'lucide-react';

interface ForgeProps {
  onGenerate?: (payload: any) => void;
  loading?: boolean;
  dossier?: string | null;
}

export default function RepresentmentForge({ onGenerate, loading, dossier }: ForgeProps) {
  const [formData, setFormData] = useState({
    transactionId: 'TX-99482-B',
    amount: '149.00',
    currency: 'USD',
    reasonCode: '10.4 / Fraud',
    customerEmail: 'client@domain.com',
    ipAddress: '192.0.2.45',
    deviceFingerprint: 'macOS / Safari / 14 prior sessions',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGenerate) {
      onGenerate(formData);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#38BDF8]" />
            Representment Forge & AI Narrative Generator
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            Synthesize raw transaction logs and IP metadata into an airtight Visa CE 3.0 legal dispute dossier.
          </p>
        </div>
      </div>

      {/* Configuration & Telemetry Input Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-2">Transaction Telemetry & Parameters</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#94A3B8] mb-1">Transaction ID</label>
            <input 
              type="text" 
              name="transactionId" 
              value={formData.transactionId} 
              onChange={handleChange}
              className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Amount & Currency</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange}
                className="w-2/3 bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
                required
              />
              <input 
                type="text" 
                name="currency" 
                value={formData.currency} 
                onChange={handleChange}
                className="w-1/3 bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-3 py-2.5 text-white outline-none transition-colors text-center"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Dispute Reason Code</label>
            <input 
              type="text" 
              name="reasonCode" 
              value={formData.reasonCode} 
              onChange={handleChange}
              className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Customer Email</label>
            <input 
              type="text" 
              name="customerEmail" 
              value={formData.customerEmail} 
              onChange={handleChange}
              className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">IP Address</label>
            <input 
              type="text" 
              name="ipAddress" 
              value={formData.ipAddress} 
              onChange={handleChange}
              className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Device Fingerprint / History</label>
            <input 
              type="text" 
              name="deviceFingerprint" 
              value={formData.deviceFingerprint} 
              onChange={handleChange}
              className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#38BDF8] text-[#050505] font-bold text-xs rounded-xl hover:bg-[#E0F2FE] transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Synthesizing Narrative...' : 'Generate Legal Dispute Dossier'}</span>
          </button>
        </div>
      </form>

      {/* Dossier Output Display */}
      {dossier ? (
        <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#272A33]">
            <span className="text-xs text-emerald-400 font-semibold">
              Status: Narrative Evidence Packet Ready
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(dossier)}
              className="flex items-center gap-1.5 text-xs bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] px-3 py-1.5 rounded-lg text-neutral-300 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Markdown
            </button>
          </div>
          <article className="prose prose-invert max-w-none whitespace-pre-wrap font-sans text-sm text-neutral-200 leading-relaxed">
            {dossier}
          </article>
        </div>
      ) : (
        <div className="p-12 text-center border-2 border-dashed border-[#272A33] rounded-2xl">
          <Terminal className="w-8 h-8 text-[#94A3B8] mx-auto mb-3 opacity-50" />
          <p className="text-xs text-[#94A3B8]">Configure transaction parameters above and click "Generate Legal Dispute Dossier" to execute.</p>
        </div>
      )}
    </div>
  );
}