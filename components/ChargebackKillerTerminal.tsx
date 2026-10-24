'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Cpu, 
  Database, 
  BarChart3, 
  AlertTriangle, 
  ArrowUpRight, 
  Terminal, 
  Plus
} from 'lucide-react';

import AddDisputeModals from './AddDisputeModals';
import ThreatMatrix from './ThreatMatrix';
import RepresentmentForge from './RepresentmentForge';
import ExclusionVault from './ExclusionVault';
import RecoveryLedger from './RecoveryLedger';

export default function ChargebackKillerTerminal() {
  const [activeTab, setActiveTab] = useState<'command' | 'threats' | 'forge' | 'vault' | 'ledger'>('command');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden select-none">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-[#0A0A0C] border-r border-[#272A33] flex flex-col justify-between p-6">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-[#16181D] border border-[#38BDF8]/40 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Shield className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-base tracking-wider text-white">CHARGEBACK<span className="text-[#38BDF8]">KILLER</span></h1>
              <p className="text-[10px] font-mono text-[#94A3B8]">SECURE TELEMETRY v3.4</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveTab('command')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'command' 
                  ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>01. Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab('threats')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'threats' 
                  ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>02. Threat Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('forge')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'forge' 
                  ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>03. Representment Forge</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'vault' 
                  ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>04. Exclusion Vault</span>
            </button>

            <button
              onClick={() => setActiveTab('ledger')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'ledger' 
                  ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>05. Recovery Ledger</span>
            </button>
          </nav>
        </div>

        {/* Quick Action & System Status */}
        <div className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-xl hover:bg-[#E0F2FE] transition-all shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          >
            <Plus className="w-4 h-4" />
            <span>Inject New Case</span>
          </button>

          <div className="p-4 bg-[#16181D] border border-[#272A33] rounded-xl font-mono text-[11px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#94A3B8]">MID Status</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SECURE
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#94A3B8]">CE 3.0 Engine</span>
              <span className="text-[#38BDF8]">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT VIEWPORT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
        
        {/* Top Telemetry Header */}
        <header className="h-20 border-b border-[#272A33] bg-[#0A0A0C]/80 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#16181D] border border-[#272A33] rounded-md font-mono text-xs text-[#38BDF8]">
              TERMINAL MODE: ACTIVE
            </span>
            <span className="text-sm font-mono text-[#94A3B8]">
              Gateway: <strong className="text-white">Stripe Live / Shopify Production</strong>
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="text-right">
              <p className="text-[#94A3B8]">Protected Ratio</p>
              <p className="text-emerald-400 font-bold">99.4%</p>
            </div>
            <div className="h-8 w-[1px] bg-[#272A33]" />
            <div className="text-right">
              <p className="text-[#94A3B8]">Active Latency</p>
              <p className="text-[#38BDF8] font-bold">14ms</p>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport Body */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'command' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl">
                  <p className="text-xs font-mono text-[#94A3B8] mb-2">Total Protected Revenue</p>
                  <p className="text-3xl font-mono font-bold text-white">$142,890.00</p>
                  <p className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +18.4% this month
                  </p>
                </div>

                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl">
                  <p className="text-xs font-mono text-[#94A3B8] mb-2">Active Dispute Queue</p>
                  <p className="text-3xl font-mono font-bold text-[#38BDF8]">7 Dockets</p>
                  <p className="text-[10px] font-mono text-[#94A3B8] mt-2">Requires representment</p>
                </div>

                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl">
                  <p className="text-xs font-mono text-[#94A3B8] mb-2">AI Defense Win Rate</p>
                  <p className="text-3xl font-mono font-bold text-emerald-400">88.2%</p>
                  <p className="text-[10px] font-mono text-[#94A3B8] mt-2">Visa CE 3.0 optimized</p>
                </div>

                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl">
                  <p className="text-xs font-mono text-[#94A3B8] mb-2">Net Recovered Capital</p>
                  <p className="text-3xl font-mono font-bold text-white">$31,450.00</p>
                  <p className="text-[10px] font-mono text-emerald-400 mt-2">Fully settled to bank</p>
                </div>
              </div>
              
                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl overflow-hidden">
                   <p className="text-xs font-mono text-[#94A3B8] mb-2 truncate">Total Protected Revenue</p>
                   <p className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight truncate">$142,890.00</p>
                   <p className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
                   <ArrowUpRight className="w-3 h-3 shrink-0" /> +18.4% this month</p>
              </div>

              {/* Terminal Feed Placeholder */}
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-sm font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#38BDF8]" />
                    Live Threat Interception Feed
                  </h3>
                  <span className="text-xs font-mono text-[#94A3B8]">Autosync active</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#050505] border border-[#272A33] rounded-lg flex items-center justify-between">
                    <span className="text-[#94A3B8]">[12:24:02 UTC]</span>
                    <span className="text-white">Order #CH-9921 quarantined: IP mismatch & proxy detected.</span>
                    <span className="text-emerald-400 font-bold">DEFENDED</span>
                  </div>
                  <div className="p-3 bg-[#050505] border border-[#272A33] rounded-lg flex items-center justify-between">
                    <span className="text-[#94A3B8]">[12:22:45 UTC]</span>
                    <span className="text-white">Visa CE 3.0 Dossier generated for Dispute ID: dp_881a.</span>
                    <span className="text-[#38BDF8] font-bold">READY TO SUBMIT</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'threats' && <ThreatMatrix />}
          {activeTab === 'forge' && <RepresentmentForge />}
          {activeTab === 'vault' && <ExclusionVault />}
          {activeTab === 'ledger' && <RecoveryLedger />}
        </div>
      </main>

      {/* Add Dispute Modal */}
      <AddDisputeModals 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmitSuccess={(data) => console.log('Docket injected:', data)}
      />
    </div>
  );
}