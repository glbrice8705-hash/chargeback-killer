// ==========================================
// FULL FILE: components/Pricing.tsx
// ==========================================

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

        {/* 4-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* TIER 1: Single Dispute Pass ($19.99) */}
          <div className="bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#272A33] rounded-xl text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 bg-[#050505] border border-[#272A33] rounded-md">
                  Single
                </span>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">Single Pass</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">1 complete bank-grade chargeback defense package.</p>
              </div>

              <div className="font-mono">
                <span className="text-3xl font-bold text-white">$19.99</span>
                <span className="text-xs text-[#94A3B8]"> / flat</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>1 AI Representment Dossier</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Visa CE 3.0 & Mastercard Check</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Instant PDF & Export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Single Dispute Pass')}
              disabled={loadingTier === 'Single Dispute Pass'}
              className="mt-8 w-full py-3 bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#16181D] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Single Dispute Pass' ? 'Connecting...' : 'Buy Single Pass'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

          {/* TIER 2: 5-Dispute Volume Pack ($59.99) */}
          <div className="bg-[#16181D] border border-[#38BDF8]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group shadow-xl shadow-[#38BDF8]/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#38BDF8] text-[#050505] text-[10px] font-mono font-bold rounded-full uppercase">
              Most Popular
            </div>
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#38BDF8]/40 rounded-xl text-[#38BDF8]">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] px-2.5 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-md">
                  5-Pack
                </span>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">5-Dispute Bundle</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">Pay-as-you-go bundle. Save ~40% for sporadic spikes.</p>
              </div>

              <div className="font-mono">
                <span className="text-3xl font-bold text-white">$59.99</span>
                <span className="text-xs text-[#94A3B8]"> / bundle</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white font-bold">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>5 Dispute Credits Included</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Real-Time Threat Screening</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Automated Representment Forge</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('5-Dispute Bundle')}
              disabled={loadingTier === '5-Dispute Bundle'}
              className="mt-8 w-full py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-xl hover:bg-[#E0F2FE] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.2)] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === '5-Dispute Bundle' ? 'Connecting...' : 'Get 5-Dispute Pack'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TIER 3: Growth Operator ($149 / mo) */}
          <div className="bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#272A33] rounded-xl text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 bg-[#050505] border border-[#272A33] rounded-md">
                  Growth
                </span>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">Growth Tier</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">Automated continuous monitoring and volume defense capacity.</p>
              </div>

              <div className="font-mono">
                <span className="text-3xl font-bold text-white">$149</span>
                <span className="text-xs text-[#94A3B8]"> / mo</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Continuous Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Advanced Threat Intelligence</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Priority Dossier Queue</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Growth Tier')}
              disabled={loadingTier === 'Growth Tier'}
              className="mt-8 w-full py-3 bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#16181D] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Growth Tier' ? 'Connecting...' : 'Subscribe Growth'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

          {/* TIER 4: Pro Subscription ($399 / mo) */}
          <div className="bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#050505] border border-[#272A33] rounded-xl text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 bg-[#050505] border border-[#272A33] rounded-md">
                  Pro
                </span>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">Pro Tier</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">Enterprise-grade full-stack automation and webhooks.</p>
              </div>

              <div className="font-mono">
                <span className="text-3xl font-bold text-white">$399</span>
                <span className="text-xs text-[#94A3B8]"> / mo</span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-[#94A3B8] pt-4 border-t border-[#272A33]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Unlimited Enterprise Disputes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Custom Webhook Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Dedicated Support & SLA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('Pro Tier')}
              disabled={loadingTier === 'Pro Tier'}
              className="mt-8 w-full py-3 bg-[#050505] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#16181D] cursor-pointer disabled:opacity-50"
            >
              <span>{loadingTier === 'Pro Tier' ? 'Connecting...' : 'Subscribe Pro'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}