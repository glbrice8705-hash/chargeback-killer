// ==========================================
// FULL FILE: app/api/webhooks/stripe/route.ts
// ==========================================

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || ''
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret.' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email || session.metadata?.email;
        const priceId = session.metadata?.priceId;
        const amountTotal = session.amount_total;

        if (!customerEmail) {
          console.error('Webhook Error: Missing customer email in checkout session.');
          break;
        }

        const priceSingle = process.env.STRIPE_PRICE_SINGLE;
        const priceBundle5 = process.env.STRIPE_PRICE_BUNDLE_5;

        if (priceId === priceBundle5 || amountTotal === 5999) {
          const { error } = await supabaseAdmin.rpc('increment_dispute_credits', {
            target_email: customerEmail,
            credit_increment: 5,
          });
          if (error) console.error('Failed to credit volume pack:', error);
        } else if (priceId === priceSingle || amountTotal === 1999) {
          const { error } = await supabaseAdmin.rpc('increment_dispute_credits', {
            target_email: customerEmail,
            credit_increment: 1,
          });
          if (error) console.error('Failed to credit single pass:', error);
        } else {
          const { error } = await supabaseAdmin
            .from('operator_subscriptions')
            .upsert({
              email: customerEmail,
              stripe_customer_id: session.customer as string,
              subscription_status: 'active',
              price_id: priceId,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'email' });

          if (error) console.error('Failed to update subscription status:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (!('deleted' in customer) && customer.email) {
          await supabaseAdmin
            .from('operator_subscriptions')
            .update({ subscription_status: 'canceled', updated_at: new Date().toISOString() })
            .eq('email', customer.email);
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error processing webhook.' }, { status: 500 });
  }
}