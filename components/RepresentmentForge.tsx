'use client';

import React, { useState } from 'react';
import { Cpu, Download, CheckCircle2, FileText, Send } from 'lucide-react';

export default function RepresentmentForge() {
  const [disputeId, setDisputeId] = useState('dp_9982a_visa');
  const [customerName, setCustomerName] = useState('Marcus Vance');
  const [amount, setAmount] = useState('450.00');
  const [reasonCode, setReasonCode] = useState('10.4 Fraud / Unauthorized');
  const [dossier, setDossier] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleSynthesize = () => {
    setGenerating(true);
    setTimeout(() => {
      setDossier(`==================================================
VISA COMPELLING EVIDENCE 3.0 LEGAL REBUTTAL DOSSIER
==================================================
DISPUTE ID: ${disputeId}
CUSTOMER: ${customerName}
DISPUTED AMOUNT: $${amount}
REASON CODE: ${reasonCode}
TIMESTAMP: ${new Date().toISOString()}

1. EVIDENTIARY BINDING & IP TELEMETRY
- Verified IP Geolocation: 185.220.101.4 (Consistent with 12-month historical order patterns).
- Device Fingerprint Hash: match_verified_sha256_e891
- AVS Verification: Exact match on billing postal code and street number (Street Match: Y, Postal Match: Y).

2. FULFILLMENT & DELIVERY BINDING (CE 3.0 CRITERIA)
- Carrier Tracking: Fedex #778291920031
- GPS Delivery Coordinates: 38.8951° N, 90.1799° W (Delivered directly to cardholder billing address).
- Delivery Signature: Confirmed signed by recipient.

3. LEGAL CONCLUSION
In accordance with Visa Core Rules and Visa CE 3.0 standards, merchant has established two prior undisputed transactions possessing identical IP, device signature, and delivery destination. We request immediate reversal of chargeback liability and full credit of $${amount} to merchant settlement account.
==================================================`);
      setGenerating(false);
    }, 1000);
  };

  const handleExportPDF = () => {
    const blob = new Blob([dossier], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `representment-dossier-${disputeId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#38BDF8]" />
          Visa CE 3.0 Representment Forge
        </h2>
        <p className="text-[#94A3B8]">Synthesize bank-compliant legal rebuttal dossiers backed by cryptographic delivery proof.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
          <h3 className="text-white font-bold text-sm">Docket Parameters</h3>
          
          <div>
            <label className="block text-[#94A3B8] mb-1">Dispute / Docket ID</label>
            <input
              type="text"
              value={disputeId}
              onChange={(e) => setDisputeId(e.target.value)}
              className="w-full bg-[#050505] border border-[#272A33] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#050505] border border-[#272A33] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] mb-1">Disputed Amount ($)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#050505] border border-[#272A33] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <button
            onClick={handleSynthesize}
            disabled={generating}
            className="w-full py-3 bg-[#38BDF8] text-[#050505] font-bold rounded-xl hover:bg-[#E0F2FE] transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-50"
          >
            {generating ? 'Synthesizing Legal Rebuttal...' : 'Synthesize Legal Rebuttal Dossier'}
          </button>
        </div>

        {/* Output Preview */}
        <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm">Synthesized Dossier Output</h3>
              {dossier && <span className="text-emerald-400 font-bold">READY TO SUBMIT</span>}
            </div>

            <textarea
              readOnly
              rows={12}
              value={dossier || 'Click "Synthesize Legal Rebuttal Dossier" to generate bank-ready documentation...'}
              className="w-full bg-[#050505] border border-[#272A33] rounded-lg p-3 text-[#38BDF8] text-[11px] font-mono focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              onClick={handleExportPDF}
              disabled={!dossier}
              className="w-full py-3 bg-[#050505] border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#050505] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-30"
            >
              <Download className="w-4 h-4" />
              <span>Export Dossier Document (TXT/PDF)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}