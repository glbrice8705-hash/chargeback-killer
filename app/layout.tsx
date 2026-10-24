import React from 'react';
import './globals.css';

export const metadata = {
  title: 'ChargebackKiller Terminal',
  description: 'Institutional Dispute Representment & Threat Screening Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 selection:bg-slate-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}