'use client';

import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, ShieldCheck, Ban, Lock, X, ExternalLink } from 'lucide-react';

interface ThreatItem {
  id: string;
  orderRef: string;
  customer: string;
  amount: string;
  riskScore: number;
  ip: string;
  country: string;
  status: 'CLEARED' | 'WARNING' | 'QUARANTINED' | 'BLOCKED';
  date: string;
}

const INITIAL_THREATS: ThreatItem[] = [
  { id: '1', orderRef: '#CH-9921', customer: 'marcus.v@proton.me', amount: '$450.00', riskScore: 92, ip: '185.220.101.4', country: 'RU', status: 'QUARANTINED', date: '2026-10-24 14:22' },
  { id: '2', orderRef: '#CH-9922', customer: 'sarah.connor@gmail.com', amount: '$120.50', riskScore: 14, ip: '172.56.21.9', country: 'US', status: 'CLEARED', date: '2026-10-24 14:18' },
  { id: '3', orderRef: '#CH-9923', customer: 'anon.proxy@tor.net', amount: '$1,250.00', riskScore: 98, ip: '45.154.255.88', country: 'SC', status: 'BLOCKED', date: '2026-10-24 13:55' },
  { id: '4', orderRef: '#CH-9924', customer: 'david.miller88@yahoo.com', amount: '$89.00', riskScore: 64, ip: '104.28.19.2', country: 'CA', status: 'WARNING', date: '2026-10-24 13:40' },
];

export default function ThreatMatrix() {
  const [threats, setThreats] = useState<ThreatItem[]>(INITIAL_THREATS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedThreat, setSelectedThreat] = useState<ThreatItem | null>(null);

  // Filter logic
  const filteredThreats = threats.filter((item) => {
    const matchesSearch = item.orderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ip.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleQuarantine = (id: string) => {
    setThreats(threats.map(t => t.id === id ? { ...t, status: 'QUARANTINED' } : t));
    if (selectedThreat?.id === id) {
      setSelectedThreat({ ...selectedThreat, status: 'QUARANTINED' });
    }
  };

  const handleAddToVault = (item: ThreatItem) => {
    setThreats(threats.map(t => t.id === item.id ? { ...t, status: 'BLOCKED' } : t));
    if (selectedThreat?.id === item.id) {
      setSelectedThreat({ ...selectedThreat, status: 'BLOCKED' });
    }
    alert(`Added IP ${item.ip} and Email ${item.customer} to Exclusion Vault blocklist.`);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ref, customer email, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16181D] border border-[#272A33] focus:border-[#38BDF8] rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#16181D] border border-[#272A33] px-3 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-[#38BDF8]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-[#16181D]">All Statuses</option>
              <option value="CLEARED" className="bg-[#16181D]">Cleared</option>
              <option value="WARNING" className="bg-[#16181D]">Warning</option>
              <option value="QUARANTINED" className="bg-[#16181D]">Quarantined</option>
              <option value="BLOCKED" className="bg-[#16181D]">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Threat Table */}
      <div className="bg-[#16181D] border border-[#272A33] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0A0A0C] border-b border-[#272A33] text-[#94A3B8] text-[11px]">
              <th className="p-4">Order Ref</th>
              <th className="p-4">Customer Telemetry</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Risk Score</th>
              <th className="p-4">IP / Geo</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#272A33]">
            {filteredThreats.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#94A3B8]">No threat telemetry matches current filter criteria.</td>
              </tr>
            ) : (
              filteredThreats.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedThreat(item)}
                  className="hover:bg-[#050505]/50 transition-colors cursor-pointer"
                >
                  <td className="p-4 text-white font-bold">{item.orderRef}</td>
                  <td className="p-4 text-[#94A3B8]">{item.customer}</td>
                  <td className="p-4 text-white">{item.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded font-bold ${
                      item.riskScore >= 80 ? 'bg-red-950 text-red-400 border border-red-500/30' :
                      item.riskScore >= 50 ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.riskScore} / 100
                    </span>
                  </td>
                  <td className="p-4 text-[#94A3B8]">{item.ip} ({item.country})</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'BLOCKED' ? 'bg-red-950 text-red-400 border border-red-500/30' :
                      item.status === 'QUARANTINED' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                      item.status === 'WARNING' ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/30' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleQuarantine(item.id); }}
                      className="px-3 py-1 bg-[#050505] border border-[#272A33] hover:border-amber-400 text-amber-400 rounded-lg cursor-pointer"
                    >
                      Quarantine
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Forensic Side Drawer */}
      {selectedThreat && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0A0A0C] border-l border-[#272A33] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#272A33] pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="text-white font-bold text-sm">Forensic Inspection: {selectedThreat.orderRef}</h3>
              </div>
              <button onClick={() => setSelectedThreat(null)} className="p-1 text-[#94A3B8] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                <p className="text-[#94A3B8]">Customer Account</p>
                <p className="text-white font-bold">{selectedThreat.customer}</p>
              </div>

              <div className="p-4 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                <p className="text-[#94A3B8]">Network Geolocation & IP</p>
                <p className="text-white font-bold">{selectedThreat.ip} ({selectedThreat.country})</p>
                <p className="text-[11px] text-amber-400">⚠️ VPN / Datacenter exit node detected</p>
              </div>

              <div className="p-4 bg-[#16181D] border border-[#272A33] rounded-xl space-y-2">
                <p className="text-[#94A3B8]">Risk Assessment Score</p>
                <p className="text-2xl font-bold text-red-400">{selectedThreat.riskScore} / 100</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#272A33]">
            <button
              onClick={() => handleAddToVault(selectedThreat)}
              className="w-full py-3 bg-red-950 border border-red-500/50 hover:bg-red-900 text-red-300 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ban className="w-4 h-4" />
              <span>Add to Exclusion Vault (Ban IP & Email)</span>
            </button>
            <button
              onClick={() => setSelectedThreat(null)}
              className="w-full py-3 bg-[#16181D] border border-[#272A33] text-white rounded-xl hover:bg-[#272A33] cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}