// ==========================================
// FULL FILE: app/api/checkout/route.ts
// ==========================================

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { priceId, tier, customerEmail, email, tierType } = body;
    
    const userEmail = customerEmail || email || 'operator@enterprise.com';

    // Map tier names coming from components (e.g. Pricing.tsx) to actual Stripe Price IDs
    if (!priceId && tier) {
      switch (tier) {
        case 'Single Dispute Pass':
          priceId = process.env.STRIPE_PRICE_SINGLE;
          tierType = 'payment';
          break;
        case '5-Dispute Bundle':
        case '5-Dispute Pack':
          priceId = process.env.STRIPE_PRICE_BUNDLE_5;
          tierType = 'payment';
          break;
        case 'Growth Operator':
        case 'Growth Tier':
          priceId = process.env.STRIPE_PRICE_GROWTH;
          tierType = 'subscription';
          break;
        case 'Professional Operator':
        case 'Pro Tier':
          priceId = process.env.STRIPE_PRICE_PRO;
          tierType = 'subscription';
          break;
        default:
          priceId = tier; // Fallback if direct ID was passed
      }
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Stripe Price ID or Tier is required.' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const mode: Stripe.Checkout.Session.Mode = (tierType === 'subscription') ? 'subscription' : 'payment';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode,
      customer_email: userEmail !== 'operator@enterprise.com' ? userEmail : undefined,
      metadata: {
        email: userEmail,
        priceId,
        tierType: tierType || 'one_time',
      },
      success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${appUrl}/?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}