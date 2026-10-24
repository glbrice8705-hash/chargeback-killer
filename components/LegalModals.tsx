'use client';

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'tos' | 'privacy' | 'disclaimer';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 text-white font-sans">
      <div className="w-full max-w-3xl bg-[#16181D] border border-[#272A33] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0C] border-b border-[#272A33]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
              {type === 'tos' && 'Terms of Service & Master Operational Agreement'}
              {type === 'privacy' && 'Privacy Notice & Data Security Protocol'}
              {type === 'disclaimer' && 'Legal & Professional Service Disclaimer'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#94A3B8] hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs font-mono text-[#94A3B8] leading-relaxed">
          {type === 'tos' && (
            <>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">1. Scope of Agreement & Software License</p>
                <p>ChargebackKiller ("Software") is an automated risk telemetry, forensic auditing, and representment generation platform. By connecting your payment gateway (Stripe, Shopify, or custom MIDs), you are granted a non-exclusive, revocable license to utilize our telemetry tools.</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">2. Merchant Responsibilities & Submission Deadlines</p>
                <p>While ChargebackKiller automates the assembly of Visa Compelling Evidence (CE) 3.0 rebuttal dossiers and evidence binders, the Merchant retains sole responsibility for submitting these dockets to issuing banks within strict card network timeframes (typically 7 to 30 days).</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">3. Limitation of Liability</p>
                <p>In no event shall ChargebackKiller, its operators, or developers be liable for any lost profits, unrecovered chargeback funds, gateway suspensions, or merchant account terminations (MID loss). Our maximum aggregate liability is strictly limited to the fees paid by the merchant in the preceding 30 days.</p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">1. Data Ingestion & Telemetry Processing</p>
                <p>We process transaction metadata, IP addresses, device fingerprint hashes, billing addresses, and fulfillment logs strictly for fraud mitigation, risk scoring, and representment defense.</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">2. Zero-Knowledge Sharing & Herd Intelligence</p>
                <p>Merchant transaction records are encrypted at rest (AES-256) and in transit (TLS 1.3). Exclusion Vault blocklist indicators participate solely in anonymous, aggregated cross-merchant threat intelligence to block repeat bad actors across the network.</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-sm">3. PCI-DSS Level 1 Compliance</p>
                <p>ChargebackKiller does not store raw primary account numbers (PANs) or card security codes (CVV). All payment tokenization is handled directly by PCI-DSS Level 1 certified processors (Stripe/Shopify).</p>
              </div>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="p-4 bg-[#050505] border border-amber-500/30 rounded-xl space-y-3 text-amber-400">
                <p className="font-bold uppercase tracking-wider text-sm">// CRITICAL LEGAL NOTICE: NOT A LAW FIRM OR LEGAL SERVICE</p>
                <p className="text-[#94A3B8] leading-relaxed">
                  1. <strong>Not Legal Advice:</strong> ChargebackKiller is a software development and financial telemetry tool. We are NOT a law firm, collection agency, or legal counsel. Nothing contained in this software, generated rebuttal dossiers, or documentation constitutes formal legal advice.
                </p>
                <p className="text-[#94A3B8] leading-relaxed">
                  2. <strong>No Outcome Guarantees:</strong> While our AI engines optimize dossiers for Visa CE 3.0 and Mastercard guidelines, card networks and issuing banks retain absolute discretion over dispute outcomes. We explicitly disclaim any guarantee of win rates or funds recovery.
                </p>
                <p className="text-[#94A3B8] leading-relaxed">
                  3. <strong>Independent Review:</strong> Merchants are strongly advised to review all generated representment documents independently or with qualified legal counsel prior to submission to card acquirers.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A0A0C] border-t border-[#272A33] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-lg hover:bg-[#E0F2FE] transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}