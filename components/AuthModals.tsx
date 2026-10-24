'use client';

import React, { useState } from 'react';
import { Shield, Mail, KeyRound, ArrowRight, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccessMsg('Terminal authorized successfully.');
        setTimeout(() => {
          setLoading(false);
          onClose();
          window.location.reload();
        }, 1000);
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        setSuccessMsg('Operator node registered! Check email for confirmation.');
        setLoading(false);
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccessMsg('Password reset instructions dispatched to email.');
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 text-white font-sans">
      <div className="w-full max-w-md bg-[#16181D] border border-[#272A33] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#94A3B8] hover:text-white bg-[#050505] border border-[#272A33] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-[#272A33] bg-[#0A0A0C]">
          <div className="inline-flex p-3 bg-[#16181D] border border-[#38BDF8]/40 rounded-xl mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <Shield className="w-6 h-6 text-[#38BDF8]" />
          </div>
          <h2 className="font-mono text-lg font-bold tracking-wider uppercase">
            {mode === 'signin' && 'Terminal Authorization'}
            {mode === 'signup' && 'Initialize Operator Account'}
            {mode === 'reset' && 'Reset Access Key'}
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 font-mono">
            {mode === 'signin' && 'Authenticate against secure Supabase telemetry node'}
            {mode === 'signup' && 'Deploy your institutional defense suite'}
            {mode === 'reset' && 'Enter operator email to generate secure reset link'}
          </p>
        </div>

        {/* Error / Success Banners */}
        {errorMsg && (
          <div className="mx-8 mt-6 p-3 bg-red-950/50 border border-red-500/50 rounded-lg flex items-center gap-2 text-xs font-mono text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-8 mt-6 p-3 bg-emerald-950/50 border border-emerald-500/50 rounded-lg flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[#94A3B8] mb-1">Secure Operator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="operator@enterprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg pl-10 pr-3 py-2.5 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-[#94A3B8] mb-1">Access Key / Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg pl-10 pr-3 py-2.5 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Remember Me & Reset Link */}
          {mode === 'signin' && (
            <div className="flex items-center justify-between text-[11px] pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#94A3B8] hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#272A33] bg-[#050505] text-[#38BDF8] focus:ring-0"
                />
                <span>Remember Me (Persistent Session)</span>
              </label>
              <button 
                type="button" 
                onClick={() => setMode('reset')} 
                className="text-[#38BDF8] hover:underline cursor-pointer bg-transparent border-none p-0 text-[11px]"
              >
                Reset Key?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[#38BDF8] text-[#050505] font-mono text-xs font-bold rounded-xl hover:bg-[#E0F2FE] transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-50 cursor-pointer"
          >
            <span>
              {loading ? 'Processing...' : mode === 'signin' ? 'Unlock Terminal' : mode === 'signup' ? 'Register Operator Node' : 'Dispatch Reset Link'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mode Switcher */}
          <div className="text-center pt-4 border-t border-[#272A33] text-[#94A3B8]">
            {mode === 'signin' && (
              <p>New merchant operator? <button type="button" onClick={() => setMode('signup')} className="text-[#38BDF8] hover:underline font-bold cursor-pointer bg-transparent border-none p-0 text-xs">Initialize Node</button></p>
            )}
            {mode === 'signup' && (
              <p>Already authorized? <button type="button" onClick={() => setMode('signin')} className="text-[#38BDF8] hover:underline font-bold cursor-pointer bg-transparent border-none p-0 text-xs">Sign In</button></p>
            )}
            {mode === 'reset' && (
              <p>Remembered key? <button type="button" onClick={() => setMode('signin')} className="text-[#38BDF8] hover:underline font-bold cursor-pointer bg-transparent border-none p-0 text-xs">Sign In</button></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}