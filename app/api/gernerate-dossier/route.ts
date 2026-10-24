import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Verify payment status with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment incomplete' }, { status: 402 });
    }

    const metadata = session.metadata || {};

    const prompt = `
You are an expert merchant payment dispute attorney specializing in Visa CE 3.0 and Mastercard chargeback representments.
Synthesize an aggressive, formal, bank-adjudicated dispute rebuttal dossier for the following case:

- Merchant Name: ${metadata.merchantName}
- Cardholder Email: ${metadata.customerEmail}
- Disputed Amount: $${metadata.disputeAmount} USD
- Reason Code: ${metadata.reasonCode}
- Telemetry & Fulfillment Proof: ${metadata.deliveryProof}

Requirements:
1. Format as a formal legal representment letter addressed to the Issuing Bank Dispute Adjudication Department.
2. Cite specific card network rules (e.g., Visa Compelling Evidence 3.0 provisions, AVS/CVV verification match standards).
3. Include explicit sections: Executive Summary, Transaction Telemetry & AVS Ledger, Fulfillment & Delivery GPS Evidence, Cardholder Usage Logs, and Closing Legal Demand for Reversal.
4. Keep the tone authoritative, concise, and uncompromising.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      dossierText: response.text,
      metadata,
    });
  } catch (error: any) {
    console.error('AI Dossier Forge Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}