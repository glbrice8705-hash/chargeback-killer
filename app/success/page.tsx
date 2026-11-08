export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';

function SuccessContent() {
  // Put your actual page code here (the parts that use useSearchParams)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-4 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-400">Payment Successful!</h1>
        <p className="text-slate-400 text-sm">
          Your subscription has been activated and your account is ready.
        </p>
        <a
          href="/dashboard"
          className="inline-block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-white transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
        Loading payment details...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}