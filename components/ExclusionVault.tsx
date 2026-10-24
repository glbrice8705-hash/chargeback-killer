'use client';

import React, { useState } from 'react';
import { Database, Plus, Trash2, Search, ShieldAlert, Lock, Check } from 'lucide-react';

interface BlockRule {
  id: string;
  type: 'IP Range' | 'Email Domain' | 'Billing Address' | 'Device Fingerprint';
  value: string;
  addedBy: string;
  date: string;
}

export default function ExclusionVault() {
  const [rules, setRules] = useState<BlockRule[]>([
    { id: '1', type: 'IP Range', value: '185.220.101.0/24', addedBy: 'Global Threat Sync', date: '2026-10-20' },
    { id: '2', type: 'Email Domain', value: '@temp-mail-provider.org', addedBy: 'Manual Entry', date: '2026-10-18' },
    { id: '3', type: 'Billing Address', value: '742 Evergreen Terrace, Mismatch City', addedBy: 'Fraud Interceptor', date: '2026-10-15' },
  ]);

  const [newType, setNewType] = useState<BlockRule['type']>('IP Range');
  const [newValue, setNewValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue) return;
    const rule: BlockRule = {
      id: Date.now().toString(),
      type: newType,
      value: newValue,
      addedBy: 'Manual Entry',
      date: new Date().toISOString().split('T')[0]
    };
    setRules([rule, ...rules]);
    setNewValue('');
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Pane: Rule Builder */}
        <div className="bg-[#16181D] border border-[#272A33] p-6 rounded-xl space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#38BDF8]" />
            <h2 className="font-mono text-sm font-bold tracking-wider uppercase">Add Exclusion Rule</h2>
          </div>

          <form onSubmit={handleAdd} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[#94A3B8] mb-1">Target Match Identifier</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg p-2.5 text-white focus:outline-none"
              >
                <option value="IP Range">IP Address / CIDR Range</option>
                <option value="Email Domain">Disposable Email Domain</option>
                <option value="Billing Address">Street Address Keyword</option>
                <option value="Device Fingerprint">Unique Hardware Hash</option>
              </select>
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-1">Rule Value</label>
              <input 
                type="text"
                placeholder="e.g. 192.168.1.0/24 or @throwaway.com"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg p-2.5 text-white focus:outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-lg hover:bg-[#E0F2FE] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Lock Into Exclusion Vault</span>
            </button>
          </form>

          <div className="p-4 bg-[#050505] border border-[#272A33] rounded-xl font-mono text-[11px] space-y-2">
            <span className="text-[#38BDF8] font-bold">// Global Herd Protection</span>
            <p className="text-[#94A3B8]">Cross-store network blocklist automatically synced across 1,200+ connected merchant nodes.</p>
          </div>
        </div>

        {/* Right Pane: Active Registry */}
        <div className="md:col-span-2 bg-[#16181D] border border-[#272A33] p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#272A33] pb-4">
            <h3 className="font-mono text-sm font-bold tracking-wider uppercase">Active Exclusion Registry ({rules.length})</h3>
            <span className="text-xs font-mono text-[#38BDF8] bg-[#050505] px-3 py-1 rounded border border-[#272A33]">Vault Sync: Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#0A0A0C] border-b border-[#272A33] text-[#94A3B8]">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272A33]">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-[#0A0A0C]/40">
                    <td className="p-3">
                      <span className="bg-[#050505] border border-[#272A33] px-2 py-0.5 rounded text-[10px] text-[#38BDF8]">
                        {rule.type}
                      </span>
                    </td>
                    <td className="p-3 text-white font-bold">{rule.value}</td>
                    <td className="p-3 text-[#94A3B8]">{rule.addedBy}</td>
                    <td className="p-3 text-[#94A3B8]">{rule.date}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleDelete(rule.id)}
                        className="p-1 text-[#94A3B8] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}