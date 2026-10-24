'use client';

import React, { useState } from 'react';
import { BarChart3, Download, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface LedgerRecord {
  id: string;
  order: string;
  recoveredAmount: string;
  reason: string;
  date: string;
  status: string;
}

const INITIAL_RECORDS: LedgerRecord[] = [
  { id: '1', order: '#CH-8821', recoveredAmount: '$1,250.00', reason: 'Visa CE 3.0 Delivery Proof', date: '2026-10-22', status: 'SETTLED' },
  { id: '2', order: '#CH-8819', recoveredAmount: '$450.00', reason: 'AVS Match & Device Fingerprint', date: '2026-10-20', status: 'SETTLED' },
  { id: '3', order: '#CH-8812', recoveredAmount: '$890.00', reason: 'Customer Chat Acknowledgment', date: '2026-10-18', status: 'SETTLED' },
];

export default function RecoveryLedger() {
  const [records, setRecords] = useState<LedgerRecord[]>(INITIAL_RECORDS);

  const handleExportCSV = () => {
    const headers = 'ID,Order Reference,Recovered Amount,Defense Reason,Date,Status\n';
    const rows = records.map(r => `${r.id},${r.order},${r.recoveredAmount},"${r.reason}",${r.date},${r.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chargeback-killer-recovery-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      
      {/* Header & Export */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Recovery Ledger & MID Health</h2>
          <p className="text-[#94A3B8]">Auditable settlement logs and Merchant Identification Risk metrics.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#38BDF8] text-[#050505] font-bold rounded-xl hover:bg-[#E0F2FE] transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.2)]"
        >
          <Download className="w-4 h-4" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* MID Health Bar */}
      <div className="p-6 bg-[#16181D] border border-[#272A33] rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold">MID Dispute-to-Sales Ratio</span>
          <span className="text-emerald-400 font-bold">0.34% (SAFE ZONE &lt; 0.90%)</span>
        </div>
        <div className="w-full bg-[#050505] h-3 rounded-full overflow-hidden border border-[#272A33]">
          <div className="bg-emerald-400 h-full w-[34%]" />
        </div>
        <p className="text-[11px] text-[#94A3B8]">Visa & Mastercard warning threshold starts at 0.90%. Your account is in pristine standing.</p>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#16181D] border border-[#272A33] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0A0A0C] border-b border-[#272A33] text-[#94A3B8] text-[11px]">
              <th className="p-4">Order Ref</th>
              <th className="p-4">Recovered Capital</th>
              <th className="p-4">Defense Strategy</th>
              <th className="p-4">Settlement Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#272A33]">
            {records.map((rec) => (
              <tr key={rec.id} className="hover:bg-[#050505]/50 transition-colors">
                <td className="p-4 text-white font-bold">{rec.order}</td>
                <td className="p-4 text-emerald-400 font-bold">{rec.recoveredAmount}</td>
                <td className="p-4 text-[#94A3B8]">{rec.reason}</td>
                <td className="p-4 text-[#94A3B8]">{rec.date}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}