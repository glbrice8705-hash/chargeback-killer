'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [dossier, setDossier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch generated dossier or trigger Gemini SDK generation here
    const timer = setTimeout(() => {
      setDossier(`[VISA COMPELLED EVIDENCE 3.0 DOSSIER]\nSession ID: ${sessionId || 'MOCK_SESSION'}\nStatus: REBUTTAL GENERATED & VERIFIED\nConfidence Score: 98.4%\n\nEvidence Summary:\n- IP Match Confirmed\n- Device Fingerprint Verified\n- Prior Undisputed Transaction Matched`);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-white text-slate-900 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-xl font-bold text-slate-900">REPRESENTMENT DOSSIER GENERATED</h1>
          <p className="text-xs text-slate-600 font-mono mt-1">SESSION: {sessionId}</p>
        </header>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12 space-x-2 text-slate-600 font-mono text-sm animate-pulse">
              <span>SYNTHESIZING GEMINI INTELLIGENCE & PDF REBUTTAL...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <pre className="bg-white border border-slate-200 p-4 rounded text-xs font-mono text-slate-800 whitespace-pre-wrap overflow-x-auto">
                {dossier}
              </pre>
              <button
                onClick={() => window.print()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded text-sm transition-colors"
              >
                DOWNLOAD / PRINT PDF DOSSIER
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}