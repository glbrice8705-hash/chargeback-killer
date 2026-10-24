'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
  const testimonials = [
    {
      quote: "We were losing close to $4,000 a month in friendly fraud chargebacks on digital accessories. Hooked up ChargebackKiller and our win rate jumped to 84% in the first two weeks.",
      author: "Marcus V.",
      role: "Founder, Apex Digital Goods",
    },
    {
      quote: "The Threat Matrix caught three high-value proxy attempts before fulfillment even shipped. The automated PDF dossier generation saves hours of manual paperwork.",
      author: "Elena R.",
      role: "Operations Director, Lumina Apparel",
    },
    {
      quote: "Cleanest interface on the market. Feels like a Bloomberg terminal for payment defense. Paid for itself within the first resolved dispute.",
      author: "David K.",
      role: "E-commerce Scale Operator",
    },
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-[#272A33] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#16181D] px-3 py-1 rounded border border-[#272A33]">
            Verified Merchant Feedback
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-4 mb-3">Trusted by High-Volume Operators</h2>
          <p className="text-[#94A3B8]">Real performance metrics from merchants defending their bottom line.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-[#16181D] border border-[#272A33] p-8 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8]" />
                  ))}
                </div>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 italic">"{item.quote}"</p>
              </div>
              <div className="border-t border-[#272A33] pt-4">
                <p className="font-semibold text-white">{item.author}</p>
                <p className="text-xs text-[#94A3B8] font-mono">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}