'use client';

import React, { useState } from 'react';
import { ShieldAlert, X, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface AddDisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: any) => void;
}

export default function AddDisputeModal({ isOpen, onClose, onSubmitSuccess }: AddDisputeModalProps) {
  const [formData, setFormData] = useState({
    orderId: '',
    disputedAmount: '',
    customerName: '',
    processor: 'Stripe',
    cardBrand: 'Visa',
    cardLast4: '',
    reasonCode: '10.4 - Fraud / Unrecognized',
    productDescription: '',
    trackingConfirmed: false,
    avsCvvMatch: false,
    ipMatchBilling: false,
    ce30Qualified: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Plug into your existing Next.js API route or Server Action here
      const res = await fetch('/api/disputes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (onSubmitSuccess) onSubmitSuccess(data);
        onClose();
      }
    } catch (err) {
      console.error('Failed to register dispute docket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#16181D] border border-[#272A33] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0C] border-b border-[#272A33]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#16181D] border border-[#38BDF8]/30 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold tracking-wide uppercase text-white">
                Add Dispute Case to Defense Queue
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Input chargeback details from your payment processor to generate an immediate rebuttal.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#272A33] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto font-sans text-sm">
          
          {/* Section 1: Transaction Metadata */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase">
              // Step 1: Transaction Identifiers
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Order / Transaction ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ch_3M01x2Lkd9..."
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Disputed Amount ($ USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="249.99"
                  value={formData.disputedAmount}
                  onChange={(e) => setFormData({ ...formData, disputedAmount: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Customer Name / Entity *</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Payment Processor *</label>
                <select
                  value={formData.processor}
                  onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Shopify Payments">Shopify Payments</option>
                  <option value="Authorize.Net">Authorize.Net</option>
                  <option value="PayPal Braintree">PayPal Braintree</option>
                  <option value="Custom MID">Custom MID Processor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Card Network & Reason Code */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase">
              // Step 2: Dispute Telemetry
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Card Brand</label>
                <select
                  value={formData.cardBrand}
                  onChange={(e) => setFormData({ ...formData, cardBrand: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Card Last 4</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="4242"
                  value={formData.cardLast4}
                  onChange={(e) => setFormData({ ...formData, cardLast4: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Reason Code *</label>
                <select
                  value={formData.reasonCode}
                  onChange={(e) => setFormData({ ...formData, reasonCode: e.target.value })}
                  className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="10.4 - Fraud / Unrecognized">10.4 - Fraud / Unrecognized (Visa)</option>
                  <option value="13.1 - Merchandise Not Received">13.1 - Goods Not Received</option>
                  <option value="4837 - Fraudulent Transaction">4837 - Fraudulent Transaction (MC)</option>
                  <option value="4853 - Defective / Not as Described">4853 - Not as Described (MC)</option>
                  <option value="C08 - Goods Not Delivered">C08 - Goods Not Delivered (Amex)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Product / Service Description</label>
              <textarea
                rows={2}
                placeholder="High-ticket digital subscription / Physical fulfillment SKU #881..."
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                className="w-full bg-[#050505] border border-[#272A33] focus:border-[#38BDF8] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Evidentiary Checklist */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase">
              // Step 3: Evidentiary Records
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              
              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.trackingConfirmed 
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8]' 
                  : 'bg-[#050505] border-[#272A33] hover:border-[#94A3B8]'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.trackingConfirmed}
                  onChange={(e) => setFormData({ ...formData, trackingConfirmed: e.target.checked })}
                  className="hidden"
                />
                <CheckCircle2 className={`w-4 h-4 ${formData.trackingConfirmed ? 'text-[#38BDF8]' : 'text-[#272A33]'}`} />
                <span className="text-xs font-mono">Carrier Tracking Confirmed</span>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.avsCvvMatch 
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8]' 
                  : 'bg-[#050505] border-[#272A33] hover:border-[#94A3B8]'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.avsCvvMatch}
                  onChange={(e) => setFormData({ ...formData, avsCvvMatch: e.target.checked })}
                  className="hidden"
                />
                <CheckCircle2 className={`w-4 h-4 ${formData.avsCvvMatch ? 'text-[#38BDF8]' : 'text-[#272A33]'}`} />
                <span className="text-xs font-mono">AVS & CVV Match (Y/M)</span>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.ipMatchBilling 
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8]' 
                  : 'bg-[#050505] border-[#272A33] hover:border-[#94A3B8]'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.ipMatchBilling}
                  onChange={(e) => setFormData({ ...formData, ipMatchBilling: e.target.checked })}
                  className="hidden"
                />
                <CheckCircle2 className={`w-4 h-4 ${formData.ipMatchBilling ? 'text-[#38BDF8]' : 'text-[#272A33]'}`} />
                <span className="text-xs font-mono">IP Geolocation Matches Billing</span>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.ce30Qualified 
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8]' 
                  : 'bg-[#050505] border-[#272A33] hover:border-[#94A3B8]'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.ce30Qualified}
                  onChange={(e) => setFormData({ ...formData, ce30Qualified: e.target.checked })}
                  className="hidden"
                />
                <CheckCircle2 className={`w-4 h-4 ${formData.ce30Qualified ? 'text-[#38BDF8]' : 'text-[#272A33]'}`} />
                <span className="text-xs font-mono">Compelling Evidence 3.0 (2+ Prior Orders)</span>
              </label>

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#272A33]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[#94A3B8] hover:text-white bg-[#050505] border border-[#272A33] rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold text-[#050505] bg-[#38BDF8] hover:bg-[#E0F2FE] rounded-lg transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? 'Forge Rebuttal...' : 'Inject Case to Forge'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}