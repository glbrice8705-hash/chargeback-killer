import Stripe from 'stripe';

let cachedStripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    if (!cachedStripe) {
      const secretKey = process.env.STRIPE_SECRET_KEY;

      if (!secretKey) {
        throw new Error('FATAL: STRIPE_SECRET_KEY environment variable is missing.');
      }

      cachedStripe = new Stripe(secretKey, {
        typescript: true,
      });
    }
    return (cachedStripe as any)[prop];
  },
});