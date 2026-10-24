'use client';

import React from 'react';
import { ShieldAlert, Cpu, FileCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Auto-Ingest & Risk Scoring',
      description: 'Connects instantly via Stripe or webhook to monitor live transaction streams, evaluate device/IP fingerprints, and isolate high-risk orders before chargebacks hit.',
      icon: <ShieldAlert className="w-6 h-6 text-[#38BDF8]" />,
    },
    {
      step: '02',
      title: 'AI Representment Forge',
      description: 'When a dispute lands, our proprietary engine cross-references transaction metadata with Visa CE 3.0 rules and compiles verified delivery logs.',
      icon: <Cpu className="w-6 h-6 text-[#38BDF8]" />,
    },
    {
      step: '03',
      title: 'Bank-Ready Dossier & Win',
      description: 'Generates a rigorous, legal-grade rebuttal PDF instantly. Copy, export, or submit straight to your processor to recover your capital.',
      icon: <FileCheck className="w-6 h-6 text-[#38BDF8]" />,
    },
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-[#272A33] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#16181D] px-3 py-1 rounded border border-[#272A33]">
            Operational Protocol
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-4 mb-3">How ChargebackKiller Works</h2>
          <p className="text-[#94A3B8]">Three automated phases designed to intercept fraud, lock down compliance, and defend your revenue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="bg-[#16181D] border border-[#272A33] p-8 rounded-xl relative group hover:border-[#38BDF8]/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-[#0A0A0C] border border-[#272A33] rounded-lg">
                  {item.icon}
                </div>
                <span className="text-2xl font-mono font-bold text-[#272A33] group-hover:text-[#38BDF8]/40 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}