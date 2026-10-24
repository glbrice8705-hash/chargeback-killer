'use client';

import React, { useState } from 'react';
import { Shield, Terminal, LifeBuoy, ArrowRight } from 'lucide-react';

import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Reviews from '../components/Reviews';
import ChargebackKillerTerminal from '../components/ChargebackKillerTerminal';
import AuthModal from '../components/AuthModals';
import LegalModal from '../components/LegalModals';
import SupportModal from '../components/SupportModals';
import UserGuide from '../components/UserGuide';

export default function Home() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'tos' | 'privacy'>('tos');
  const [supportOpen, setSupportOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // If terminal mode is active, render the full institutional dashboard
  if (isTerminalMode) {
    return (
      <div className="relative w-full h-screen bg-[#050505]">
        <button 
          onClick={() => setIsTerminalMode(false)}
          className="absolute top-3 right-6 z-50 px-3 py-1.5 bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8] text-[#94A3B8] hover:text-white font-mono text-xs rounded-lg transition-colors shadow-lg"
        >
          Exit Terminal / Return to Hub
        </button>
        <ChargebackKillerTerminal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#38BDF8] selection:text-[#050505]">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-[#272A33] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#16181D] border border-[#38BDF8]/40 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Shield className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <span className="font-mono font-bold text-sm tracking-wider">CHARGEBACK<span className="text-[#38BDF8]">KILLER</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-[#94A3B8]">
          <a href="#protocol" className="hover:text-white transition-colors">Protocol</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#reviews" className="hover:text-white transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button 
            onClick={() => { setAuthMode('signin'); setAuthOpen(true); }}
            className="px-4 py-2 bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8] text-white rounded-lg transition-all"
          >
            Operator Sign In
          </button>
          <button 
            onClick={() => setIsTerminalMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8] text-[#050505] font-bold rounded-lg hover:bg-[#E0F2FE] transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Terminal</span>
          </button>
        </div>
      </nav>
           <button 
              onClick={() => setShowGuide(!showGuide)} className="hover:text-white transition-colors cursor-pointer">
            Operator Manual
          </button>

      {/* HERO SECTION */}
      <section className="relative py-28 px-6 text-center overflow-hidden border-b border-[#272A33]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#38BDF8]/10 via-[#050505] to-[#050505] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181D] border border-[#272A33] rounded-full font-mono text-xs text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>INSTITUTIONAL PAYMENT DEFENSE & REPRESENTMENT ENGINE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Annihilate Friendly Fraud. <br />
            <span className="text-[#38BDF8]">Reclaim 100% of Your Disputed Capital.</span>
          </h1>

          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Automate Visa CE 3.0 compliance, intercept high-risk proxies before fulfillment, and generate legal-grade representment dossiers in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setIsTerminalMode(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#38BDF8] text-[#050505] font-mono text-sm font-bold rounded-xl hover:bg-[#E0F2FE] transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)] cursor-pointer"
            >
              <span>Initialize Live Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { setAuthMode('signup'); setAuthOpen(true); }}
              className="w-full sm:w-auto px-8 py-4 bg-[#16181D] border border-[#272A33] hover:border-[#38BDF8] text-white font-mono text-sm rounded-xl transition-all cursor-pointer"
            >
              Register Operator Node
            </button>
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <div id="protocol">
        <HowItWorks />
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <div id="reviews">
        <Reviews />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0C] border-t border-[#272A33] py-12 px-6 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#38BDF8]" />
            <span className="font-bold">CHARGEBACKKILLER SECURE TELEMETRY</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#94A3B8]">
            <button onClick={() => { setLegalType('tos'); setLegalOpen(true); }} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => { setLegalType('privacy'); setLegalOpen(true); }} className="hover:text-white transition-colors cursor-pointer">Privacy Notice</button>
            <button onClick={() => setSupportOpen(true)} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              <LifeBuoy className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Dispute Desk</span>
            </button>
          </div>

          <p className="text-[#94A3B8]">© 2026 ChargebackKiller Systems. All rights reserved.</p>
        </div>
      </footer>

      {/* GLOBAL MODALS */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultMode={authMode} />
      <LegalModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} type={legalType} />
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />

    </div>
  );
}