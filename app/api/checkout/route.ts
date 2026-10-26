import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { tier } = await req.json();

    const tierConfig: Record<string, { name: string; amount: number; interval?: 'month' }> = {
      single: { name: 'Single Dispute Pass', amount: 1999 },
      growth: { name: 'Growth Operator (25/mo)', amount: 4999, interval: 'month' },
      pro: { name: 'Professional Unlimited', amount: 14900, interval: 'month' },
    };

    const selectedTier = tierConfig[tier] || tierConfig.single;

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: `ChargebackKiller - ${selectedTier.name}`,
        },
        unit_amount: selectedTier.amount,
        ...(selectedTier.interval && {
          recurring: { interval: selectedTier.interval },
        }),
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: selectedTier.interval ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}