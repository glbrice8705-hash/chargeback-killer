'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Database, 
  BarChart3, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  Lock,
  Plus,
  Download,
  Filter
} from 'lucide-react';

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState<'overview' | 'hud' | 'matrix' | 'forge' | 'vault' | 'ledger' | 'modals'>('overview');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#38BDF8] selection:text-[#050505]">
      
      {/* Header Banner */}
      <div className="bg-[#0A0A0C] border-b border-[#272A33] px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16181D] border border-[#38BDF8]/40 rounded-full font-mono text-xs text-[#38BDF8]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OPERATOR MANUAL v3.4</span>
            </div>
            <h1 className="text-3xl font-bold font-mono tracking-tight text-white">
              CHARGEBACK<span className="text-[#38BDF8]">KILLER</span> Field Operations Manual
            </h1>
            <p className="text-sm text-[#94A3B8] font-mono max-w-2xl">
              Comprehensive reference guide for all terminal modules, telemetry feeds, risk engines, and representment workflows.
            </p>
          </div>

          <div className="p-4 bg-[#16181D] border border-[#272A33] rounded-xl font-mono text-xs text-right hidden lg:block">
            <p className="text-[#94A3B8]">Engine Status</p>
            <p className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CE 3.0 AUTONOMOUS
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sticky Operations Index */}
        <aside className="lg:col-span-1 space-y-2 font-mono text-xs sticky top-8 h-fit">
          <p className="text-[#94A3B8] font-bold uppercase tracking-wider px-3 mb-3 text-[10px]">// Documentation Index</p>
          
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'overview' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>00. System Architecture</span>
          </button>

          <button
            onClick={() => setActiveSection('hud')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'hud' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>01. Command Center HUD</span>
          </button>

          <button
            onClick={() => setActiveSection('matrix')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'matrix' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>02. Threat Matrix</span>
          </button>

          <button
            onClick={() => setActiveSection('forge')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'forge' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>03. Representment Forge</span>
          </button>

          <button
            onClick={() => setActiveSection('vault')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'vault' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>04. Exclusion Vault</span>
          </button>

          <button
            onClick={() => setActiveSection('ledger')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'ledger' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>05. Recovery Ledger</span>
          </button>

          <button
            onClick={() => setActiveSection('modals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === 'modals' 
                ? 'bg-[#16181D] text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] font-bold' 
                : 'text-[#94A3B8] hover:text-white hover:bg-[#16181D]/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>06. Modals & Case Injection</span>
          </button>
        </aside>

        {/* User Guide Body Viewport */}
        <main className="lg:col-span-3 space-y-12">
          
          {/* SECTION 00: Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300 font-sans">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-[#38BDF8]" />
                  00. System Architecture & Core Workflow
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-mono">
                  ChargebackKiller operates as an autonomous financial defense system. It bridges real-time order streams from gateways (Stripe, Shopify, PayPal, custom MIDs) directly into card network representment frameworks (Visa Compelling Evidence 3.0 & Mastercard Rules).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-xl space-y-3 font-mono text-xs">
                  <span className="text-[#38BDF8] font-bold uppercase tracking-wider">// Autonomous Telemetry Loop</span>
                  <p className="text-[#94A3B8] leading-relaxed">
                    1. Incoming webhooks capture transaction IP, device hash, and fulfillment scans.<br />
                    2. Pre-dispute alerts (Visa TC40 / RDR) flag potential chargebacks prior to bank filing.<br />
                    3. Threat Matrix evaluates proxy risk scores to quarantine fraudulent orders before fulfillment.
                  </p>
                </div>

                <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-xl space-y-3 font-mono text-xs">
                  <span className="text-[#38BDF8] font-bold uppercase tracking-wider">// Representment Engine</span>
                  <p className="text-[#94A3B8] leading-relaxed">
                    1. Active disputes trigger automatic assembly of historical order evidence.<br />
                    2. AI Forge synthesizes bank-ready PDF dossiers adhering strictly to reason codes.<br />
                    3. High-risk actors are pushed to the Exclusion Vault to block cross-store recurrence.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 01: Command Center HUD */}
          {activeSection === 'hud' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-[#38BDF8]" />
                  01. Pillar I: Command Center (HUD)
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  The Command Center serves as your primary situation room, displaying live telemetry counters, win rates, and active system feeds.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Total Protected Revenue Barometer</h3>
                  <p className="text-[#94A3B8]">
                    <strong>What it does:</strong> Accumulates the total monetary value of all orders cleared, defended, or successfully recovered.<br />
                    <strong>How to use:</strong> Monitor this metric during promotional sales or high-velocity marketing campaigns to gauge total shielded capital.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Active Dispute Queue Meter</h3>
                  <p className="text-[#94A3B8]">
                    <strong>What it does:</strong> Tracks the number of pending dispute dockets requiring immediate representment action or merchant review.<br />
                    <strong>How to use:</strong> Click on active dockets to jump directly into the <em>Representment Forge</em> for dossier synthesis.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Live Threat Interception Feed</h3>
                  <p className="text-[#94A3B8]">
                    <strong>What it does:</strong> Displays a real-time terminal log of proxy checks, CE 3.0 dossier generations, and automated quarantines.<br />
                    <strong>How to use:</strong> Use this ticker to verify active autosync between your storefront webhooks and ChargebackKiller.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 02: Threat Matrix */}
          {activeSection === 'matrix' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-[#38BDF8]" />
                  02. Pillar II: Threat Matrix
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  Screen incoming transactions in real time before fulfillment. Identify VPNs, proxy networks, location mismatches, and past refund abusers.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Risk Scoring Engine (0-100)</h3>
                  <p className="text-[#94A3B8]">
                    • <strong>0–49 (Low / Cleared):</strong> Standard order, automatically passed to fulfillment.<br />
                    • <strong>50–79 (Moderate / Warning):</strong> Potential proxy or billing discrepancy. Review recommended.<br />
                    • <strong>80–100 (Critical Threat):</strong> High likelihood of friendly fraud or stolen credential abuse.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Forensic Side Drawer</h3>
                  <p className="text-[#94A3B8]">
                    <strong>How to use:</strong> Click any order row in the Threat Matrix table to slide out the investigation drawer. Inspect full IP geolocation, device user agents, and Address Verification System (AVS) responses.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Quarantine & Block Buttons</h3>
                  <p className="text-[#94A3B8]">
                    • <strong>Quarantine:</strong> Temporarily holds order fulfillment in your store platform.<br />
                    • <strong>Add to Vault:</strong> Instantly bans the IP range, email, or device hash across your ecosystem.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 03: Representment Forge */}
          {activeSection === 'forge' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-[#38BDF8]" />
                  03. Pillar III: Representment Forge
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  The automated war room for synthesizing bank-compliant legal rebuttal dossiers tuned for Visa CE 3.0 and Mastercard dispute rules.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Step 1: Telemetry Ingestion</h3>
                  <p className="text-[#94A3B8]">
                    Enter or auto-fill the dispute ID, reason code (e.g., 10.4 Fraud), customer contact details, and transaction total.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Step 2: Evidentiary Attachments</h3>
                  <p className="text-[#94A3B8]">
                    Attach proof artifacts: carrier tracking numbers, delivery GPS scan records, customer chat logs, or terms acceptance timestamps.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Step 3: Synthesis & Export</h3>
                  <p className="text-[#94A3B8]">
                    Click <strong>"Synthesize Legal Rebuttal"</strong>. The AI engine structures the dossier into standard legal format. Use <strong>"Export PDF"</strong> or <strong>"Copy to Clipboard"</strong> to submit directly to your payment processor dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 04: Exclusion Vault */}
          {activeSection === 'vault' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#38BDF8]" />
                  04. Pillar IV: Exclusion Vault
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  Your persistent blocklist network. Prevents habitual fraud perpetrators from making repeated unauthorized purchases.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Rule Identifiers</h3>
                  <p className="text-[#94A3B8]">
                    Block targets using IP/CIDR ranges (e.g. <code>185.220.101.0/24</code>), disposable email domains (e.g. <code>@tempmail.org</code>), device fingerprint hashes, or specific address strings.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Cross-Merchant Network Protection</h3>
                  <p className="text-[#94A3B8]">
                    When an actor is confirmed as fraudulent by one node, anonymous fingerprint indicators participate in herd intelligence to shield all connected ChargebackKiller merchants.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 05: Recovery Ledger */}
          {activeSection === 'ledger' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-[#38BDF8]" />
                  05. Pillar V: Recovery Ledger & MID Health
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  Financial forensics, ROI attribution, and Merchant Identification (MID) health monitoring.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">MID Health Gauge</h3>
                  <p className="text-[#94A3B8]">
                    <strong>What it does:</strong> Tracks your dispute-to-transaction ratio in real time.<br />
                    <strong>Why it matters:</strong> Card networks enforce penalties if your dispute ratio exceeds <strong>0.90%</strong> (Visa Warning Threshold) or <strong>1.50%</strong> (Excessive Monitoring Program). Keep this bar in the green zone.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">Settled Recovery Log & CSV Export</h3>
                  <p className="text-[#94A3B8]">
                    Review every dispute settled in your favor. Click <strong>"Export Ledger CSV"</strong> to download full records for accounting and audit balance sheets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 06: Modals & Case Injection */}
          {activeSection === 'modals' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
                <h2 className="font-mono text-xl font-bold text-white flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />
                  06. Modals & Case Intake Workflows
                </h2>
                <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                  Auxiliary tools for manual case injection, authorization keys, legal terms, and direct client support.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">AddDisputeModal ("Inject New Case")</h3>
                  <p className="text-[#94A3B8]">
                    Located in the terminal sidebar. Use this button to manually enter off-gateway chargeback notices received via physical mail or bank portals.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">AuthModal ("Remember Me")</h3>
                  <p className="text-[#94A3B8]">
                    Handles operator authentication. Toggling <em>"Remember Me"</em> preserves persistent terminal authorization cookies across browser reloads.
                  </p>
                </div>

                <div className="p-5 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                  <h3 className="text-white font-bold text-sm text-[#38BDF8]">SupportModal ("Dispute Desk")</h3>
                  <p className="text-[#94A3B8]">
                    Connects directly with ChargebackKiller dispute strategists for high-value docket consultations or complex processor arbitration cases.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}