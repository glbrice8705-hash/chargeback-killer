'use client';

import React, { useState } from 'react';
import { Shield, Zap, Cpu, Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectTier?: (tier: string) => void;
}

export default function Pricing({ onSelectTier }: PricingProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (tierName: string) => {
    setLoadingTier(tierName);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierName, email: 'operator@enterprise.com' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout initialization failed.');
      }
    } catch (err) {
      alert('Network error connecting to Stripe checkout.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#050505] text-white font-sans border-b border-[#272A33]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181D] border border-[#272A33] rounded-full font-mono text-xs text-[#38BDF8]">
            <Zap className="w-3.5 h-3.5" />
            <span>TRANSPARENT INSTITUTIONAL ACCESS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Institutional Defense. <br />
            <span className="text-[#38BDF8]">Predictable Licensing.</span>
          </h2>
          <p className="text-sm md:text-base text-[#94A3B8] font-mono">
            Select pay-per-dispute flexibility or deploy scaled threat defense.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1: Single Dispute Pass ($19.99) */}
          <div className="bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8]/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#272A33] rounded-xl text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 bg-[#050505] border border-[#272A33] rounded-md">
                  Pay-As-You-Go
                </span>
              </div>

              <div>
                <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider">Single Dispute Pass</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">One-time rebuttal dossier forge for a single active chargeback docket.</p>
              </div>

              <div className="font-mono">
                <span className="text-4xl font-bold text-white">$19.99</span>
                <span className="text-xs text-[#94A3B8]"> / flat single charge</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>1 AI Representment Dossier Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Visa CE 3.0 & Mastercard Evidence Check</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Instant PDF & Plaintext Rebuttal Export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Single Dispute Pass')}
              disabled={loadingTier === 'Single Dispute Pass'}
              className="mt-8 w-full py-3 bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#16181D] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Single Dispute Pass' ? 'Connecting to Stripe...' : 'Forge Single Dossier'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

          {/* TIER 2: Growth Operator ($49.99 / up to 25 disputes) */}
          <div className="bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8]/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#272A33] rounded-xl text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 bg-[#050505] border border-[#272A33] rounded-md">
                  Volume Capped
                </span>
              </div>

              <div>
                <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider">Growth Operator</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">Ideal protection for mid-sized merchants and boutique storefronts.</p>
              </div>

              <div className="font-mono">
                <span className="text-4xl font-bold text-white">$49.99</span>
                <span className="text-xs text-[#94A3B8]"> / month</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white font-bold">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Up to 25 Disputes Included / Month</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Real-Time Threat Matrix Screening</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Automated Representment Forge</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Growth Operator')}
              disabled={loadingTier === 'Growth Operator'}
              className="mt-8 w-full py-3 bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#16181D] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Growth Operator' ? 'Connecting to Stripe...' : 'Deploy Growth Pass'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

          {/* TIER 3: Professional Terminal ($149 / Unlimited) */}
          <div className="bg-[#16181D] border-2 border-[#38BDF8] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative shadow-[0_0_30px_rgba(56,189,248,0.15)] md:scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#050505] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular Operating Mode
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#38BDF8]/40 rounded-xl text-[#38BDF8]">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] px-2.5 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-md">
                  Unlimited Defense
                </span>
              </div>

              <div>
                <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider">Professional Operator</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">Uncapped terminal access for scaling digital commerce brands.</p>
              </div>

              <div className="font-mono">
                <span className="text-4xl font-bold text-white">$149</span>
                <span className="text-xs text-[#94A3B8]"> / month</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white font-bold">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Unlimited Monthly Disputes</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Full Threat Matrix & Forensic Drawer</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>AI Representment Forge & PDF Suite</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Professional Operator')}
              disabled={loadingTier === 'Professional Operator'}
              className="mt-8 w-full py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-xl hover:bg-[#E0F2FE] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.25)] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Professional Operator' ? 'Connecting to Stripe...' : 'Activate Terminal Pass'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}