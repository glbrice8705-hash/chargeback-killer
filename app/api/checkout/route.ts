import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-02-28.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { tier, email } = await req.json();

    let priceId = '';
    let mode: 'payment' | 'subscription' = 'subscription';

    if (tier === 'Single Dispute Pass') {
      priceId = process.env.STRIPE_PRICE_SINGLE || 'price_single_mock';
      mode = 'payment';
    } else if (tier === 'Growth Operator') {
      priceId = process.env.STRIPE_PRICE_GROWTH || 'price_growth_mock';
      mode = 'subscription';
    } else if (tier === 'Professional Operator') {
      priceId = process.env.STRIPE_PRICE_PRO || 'price_pro_mock';
      mode = 'subscription';
    } else {
      return NextResponse.json({ error: 'Invalid tier selected' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}