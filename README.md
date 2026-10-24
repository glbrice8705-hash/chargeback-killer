# ChargebackKiller — Institutional Dispute Defense & Risk Terminal

Institutional-grade chargeback representment engine, AI defense letter generator, automated fraud screening, and processor health recovery platform for high-volume merchants.

## Features
- **Command Center:** Real-time metrics, live transaction screening feed, and dispute volume vs. recovery trends.
- **Threat Matrix:** Automated risk queue with behavioral screening, quarantine controls, and exclusion vault.
- **Representment Forge:** 3-step AI representment wizard powered by Gemini 3.8 Flash, generating bank-grade rebuttal letters.
- **Exclusion Vault:** Global threat intelligence, IP/BIN blocklists, and cross-store fraud defense network.
- **Recovery Ledger:** Win rates by reason code, payment processor health monitoring, and CSV export.

## Deploy in < 2 Hours

1. `npm install`
2. Configure `.env.local` with Stripe, Supabase, and Gemini API keys.
3. Run `schema/db.sql` in Supabase SQL editor.
4. Deploy to Vercel and connect Stripe webhook endpoint to `/api/webhook/stripe`.
