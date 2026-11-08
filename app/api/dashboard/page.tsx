'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Fetch session / call dashboard API
        const res = await fetch('/api/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-zinc-400">Loading Kinetic Extropy telemetry...</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Kinetic Extropy // Operations</h1>
          <div className="text-sm text-zinc-400">{data?.email || 'Operator'}</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dispute Credits Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-2">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Available Dispute Credits</h3>
            <div className="text-4xl font-extrabold text-emerald-400">{data?.credits ?? 0}</div>
            <p className="text-xs text-zinc-500">Ready for Visa CE3.0 / Mastercard representment generation.</p>
          </div>

          {/* Subscription Status Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-2">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Subscription Tier</h3>
            <div className="text-2xl font-bold capitalize text-amber-400">
              {data?.subscription?.subscription_status === 'active' ? 'Active Operator' : 'Pay-As-You-Go / Free'}
            </div>
            <p className="text-xs text-zinc-500">
              {data?.subscription?.price_id ? `Price ID: ${data.subscription.price_id}` : 'No active monthly plan'}
            </p>
          </div>

          {/* Quick Checkout Actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Acquire Tokens</h3>
            <div className="flex gap-2">
              <a href="/api/checkout?tier=single" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-center py-2 rounded font-medium text-sm transition">
                +1 Pass ($19.99)
              </a>
              <a href="/api/checkout?tier=bundle" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-center py-2 rounded font-medium text-sm transition">
                +5 Bundle ($59.99)
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}