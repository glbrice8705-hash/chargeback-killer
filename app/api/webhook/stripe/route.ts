import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { runRepresentmentEngine } from '@/lib/aiEngine';
import type Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const {
      orderId,
      merchantName,
      customerEmail,
      disputeAmount,
      reasonCode,
      deliveryProof,
    } = metadata;

    try {
      // 1. Trigger Gemini 3.8 Flash Representment Forge
      const dossier = await runRepresentmentEngine({
        orderId: orderId || 'ORD-9824',
        merchantName: merchantName || 'Merchant',
        customerName: session.customer_details?.name || 'Cardholder',
        customerEmail: customerEmail || session.customer_email || 'client@example.com',
        disputeAmount: parseFloat(disputeAmount || '450'),
        reasonCode: reasonCode || 'Visa 10.4 Other Fraud',
        deliveryProof: deliveryProof || 'Verified delivery logs and active user session timestamps.',
      });

      // 2. Persist to Supabase
      const { data, error } = await supabaseAdmin
        .from('chargeback_dossiers')
        .insert({
          stripe_session_id: session.id,
          customer_email: session.customer_email || customerEmail,
          merchant_name: merchantName,
          dispute_amount: parseFloat(disputeAmount || '0'),
          win_probability_score: dossier.winProbabilityScore,
          dossier_json: dossier,
          status: 'completed',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase write error:', error);
      }

      return NextResponse.json({ received: true, dossierId: data?.id });
    } catch (err: any) {
      console.error('Fulfillment error:', err);
      return NextResponse.json({ error: 'Fulfillment failed', details: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
